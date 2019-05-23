import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import More from '@/components/More'
import Additem from '@/components/Additem'
import Detail from '@/components/Detail'
import Reply from '@/components/Reply'
import Dealed from '@/components/Dealed'
import Rate from '@/components/Rate'
import Accptdealed from '@/components/Accptdealed'
import Over from '@/components/Over'

Vue.use(Router)

Router.prototype.go = function (a) {
   sessionStorage.isBack = true
  if(a){
    window.history.go(a)
  }else{
    window.history.go(-1)
  }
}
window.addEventListener("popstate", function(e) {
  sessionStorage.isBack = true
}, false);

export default new Router({
  routes: [
      {
      path:'/',
      redirect:'/home'
    },
    {
       path: '/home',
       name: 'Home',
       component: Home,
       meta: {
      keepAlive: true // 需要被缓存
     }
  
    },
     {
      path: '/more',
      name: 'More',
      component: More,
      meta: {
      keepAlive: true // 需要被缓存
     }
    },
     {
      path: '/additem',
      name: 'Additem',
      component: Additem
    },
     {
      path: '/detail',
      name: 'Detail',
      component: Detail,

    },
     {
      path: '/reply',
      name: 'Reply',
      component: Reply
    },
     {
      path: '/dealed',
      name: 'Dealed',
      component: Dealed,

    },
     {
      path: '/rate',
      name: 'Rate',
      component: Rate
    },
     {
      path: '/accptdealed',
      name: 'Accptdealed',
      component: Accptdealed
    },
     {
      path: '/over',
      name: 'Over',
      component: Over
    }

  ]
})
