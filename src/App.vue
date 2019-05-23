<template>
  <div id="app">
 <!--  <index></index> -->
    <!-- <router-view/> -->
    <!-- <keep-alive> 
    <router-view v-if="$route.meta.keepAlive"></router-view> 
    </keep-alive> 
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
 
     <transition :name="transitionName" >
        <router-view class="child-view" ></router-view>
     </transition>

    <van-loading type="spinner" color="#000" style='position: absolute;top: 50%;left: 50%;z-index: 99999;margin-left: -15px;display: none;' />
    <mu-circular-progress class="demo-circular-progress" color="secondary" :stroke-width="3" :size="48" style='position: fixed;top: 50%;left: 50%;z-index: 99999;margin-left: -24px;margin-top: -24px'></mu-circular-progress>
  </div>
</template>

<script>
import index from './components/index.vue'	

export default {
  name: 'App',
  data(){
    return {
       transitionName:'slide-left',
    }
  },
   watch: {
    '$route' (to, from) {
      let isBack = eval(sessionStorage.isBack)
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = '  slide-left'
      }
      sessionStorage.isBack = false
    }
  },
  components:{index}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mu-form-item__label-left, .mu-form-item__label-right{
  margin: 0;
}
.mu-form-item__label-left .mu-form-item-label, .mu-form-item__label-right .mu-form-item-label{
  text-align: left;
}
.mu-form-item-label{
  text-align: left;
}
.mu-form-item{
  margin-bottom: 0px;
}
 .child-view {
    transition:all .4s ease;
    position: absolute;
    width: 100%;

  }
  .slide-left-enter,.slide-right-leave-active {
    opacity:0;
    -webkit-transform:translate(100%,0);
    transform:translate(100%,0);

  }
  .slide-left-leave-active,.slide-right-enter {
    opacity:0;
    -webkit-transform:translate(-100%,0);
    transform:translate(-100%,0);

  }
</style>
