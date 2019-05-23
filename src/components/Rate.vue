<template>
  <div class="rate">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click='back'>
          <mu-icon value="arrow_back" ></mu-icon>
      </mu-button>
         报价详情
       <mu-button icon slot="right" >
          <mu-icon></mu-icon>
      </mu-button>
    </mu-appbar> 
      <div style="margin-top: 44px;"> 
            <div v-for="(item,index) in priceList" :key='index' style="margin: 10px; border: 1px solid #eee;border-radius: 4px;">
              <span style="text-align: center; font-size: 16px;margin:6px 0;display: inline-block;width: 100%;">{{item.nickname}}</span>
                <div  v-html='item.content'>{{item.content}}</div>
            </div>
          </div>       
   </div>
 
</template>

<script>
import { Rate } from 'vant';
  import { Toast } from 'vant';
import $ from 'jquery';
export default {
  name: 'Rate',
  data () {
    return {
    priceList:'',   
    }
  },
  mounted() {
     this.getprice()
   },
   methods: {
    back(){
      this.$router.go(-1);
    },
     getprice(){
     let  paramprice = new URLSearchParams(); 
          paramprice.append('taskid',this.$route.query.instid);      
     let urlPrice=this.baseUrl+'/v1/bpmapibx/GetFlowrkPrice';//报价
     let _this=this;
       _this.$http.post(urlPrice,paramprice).then(function ( res ){
            _this.priceList=res.data.data.list;
             console.log(res.data.data.list);  
          });
     },
  }

}

</script>


<style scoped>

</style>
