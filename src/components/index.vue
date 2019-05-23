<template>
<div>
    <mu-container style="width:100%;position: fixed;bottom: 0;left: 0;padding: 0;z-index: 9999;">
        <mu-bottom-nav :value="bottomNav" color="#2196f3">
          <mu-bottom-nav-item title="主页" icon="home" to="home" exact></mu-bottom-nav-item>
          <mu-bottom-nav-item title="待处理" icon="books"  to="more"></mu-bottom-nav-item>
        </mu-bottom-nav>
    </mu-container>

</div>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'home',
      LoginBottom: false,
      PhoneNumber: '',
      toast: false,
      indexToast: '',
      shift: 'movies'
    }
  },
  computed: {
      PhoneValue () {
          return this.$store.state.UserPhone;
      }
  },

  created() {
  },
  methods: {
    handleChange (val) {
        if(val === 'user'){
            this.GoUser();
        }else{
            this.bottomNav = val
        }
    },
 
  }
}
</script>

<style scoped lang="less">
.mu-bottom-nav-shift-wrapper{

}
    .Bottom-Nav-Class{
        position:fixed;
        width: 100%;
        bottom: 0;
        table-layout: fixed;
        z-index: 9999;
        background: #2196f3 !important;
    }
    .mu-bottom-nav{
      background: #fff ;;
    }

    .mu-buttom-item{
      /*   color: #fff; */
    }

    .mu-sub-header{
        line-height: 1.5em !important;
        padding: 1em 0 1em 0;
    }
    .mu-bottom-item-active{
        color:#2196f3;
    }
</style>