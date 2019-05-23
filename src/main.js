// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import MuseUI from 'muse-ui';
import $ from 'jquery';
import 'muse-ui/dist/muse-ui.css';
import axio from './axio'
import Vant from 'vant';
import 'vant/lib/index.css';
import  '../static/js/global.js';
import 'url-search-params-polyfill';
Vue.use(Vant);


Vue.config.productionTip = false
Vue.use(MuseUI);
import theme from 'muse-ui/lib/theme';
import * as colors from 'muse-ui/lib/theme/colors';
Vue.prototype.$http = axios;
theme.add('custom-theme', {
  primary: colors.indigo,
  secondary: colors.pinkA200
});

 Vue.prototype.baseUrl = "http://wxzp.cq-p.com.cn:9500" ;
/* eslint-disable no-new */
Vue.prototype.getNowFormatDate = function (){ //获取当前日期
  var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
        strHours = "0" + strHours;
    }
     if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
     if (strSeconds >= 0 && strSeconds <= 9) {
     strSeconds = "0" + strSeconds;
    }
   var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
           
           
    return currentdate;
}

new Vue({
  el: '#app',
  router,
  axio,
  components: { App },
  template: '<App/>'
})
