
import axios from 'axios'
import $ from 'jquery'

/*
// http request 拦截器
axios.interceptors.request.use((config) => {
  //打开loading
 
     $('.demo-circular-progress').show();
      return config;
  }, (err) => {
          return Promise.reject(err);
  });
  //响应拦截器
  axios.interceptors.response.use((response) => {
    setTimeout(function(){
       $('.demo-circular-progress').hide();
      
    },500);
    if(response.status!=200){
      $('.demo-circular-progress').hide();
    }else{
      if(response.data.code==200){
           $('.demo-circular-progress').hide();
        setTimeout(function(){
           $('.demo-circular-progress').hide();
        
        return response.data;
      }else{
        if(response.data){
  
        }else{       
         $('.demo-circular-progress').hide();
        }
        
      }
    }    
     // return response;     
         
  }, (err) => {
      Toast('网络异常');
       return Promise.reject(err);

  });*/

import {Toast} from 'vant'

 $.ajaxSetup({
    beforeSend: function () {
 $('.demo-circular-progress').show();
    },
    complete: function (XMLHttpRequest,textStatus) {


  $('.demo-circular-progress').hide();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      Toast('网络异常');
    $('.demo-circular-progress').hide();
    //ajax请求失败
    },
    success:function(data, textStatus){
      console.log(data)
      console.log(textStatus)
    }

});
export default axios