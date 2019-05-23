<template>
  <div class="hello" style="margin-top: 148px">
  <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left" @click='back'>
            <mu-icon value="arrow_back" ></mu-icon>
        </mu-button>
          我的受理工单
         <mu-button icon slot="right" >
            <mu-icon  ></mu-icon>
        </mu-button>
    </mu-appbar>
<mu-container style='padding: 0'>
  <mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)"  @change='getlist' center style='position: fixed;top: 54px'>
    <mu-tab>未处理</mu-tab>
    <mu-tab>已解决</mu-tab>
    <mu-tab>已终止</mu-tab>
  </mu-tabs>
  <form action="/" style="position: fixed;top:102px;width: 100%;z-index: 999999">
    <van-search
      v-model="searchval"
      placeholder="请输入问题内容关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
  </form>
   <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished"  finished-text="没有更多数据" @load="onLoad" >
        <div class="demo-text" v-if="active1 === 0" v-for='item,index in clzList' :key='item.index'>
            <div class="itemdetail" >
              <p  style="border-bottom: 1px solid #eee">{{item.sjfl}}</p>
              <div class="contentdetail">
                <p>登记日期：{{item.rq}}</p>
                <p>应用名称：{{item.yymc}}</p>
                <p>问题提出人：{{item.tcr}}</p>
                <p style="width: 100%;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">问题简介：{{item.wtlr}}</p>   
              </div>
               <router-link :to="{path:'/detail',query: {id: item.id}}"> 
                <p style="border-top: 1px solid #eee;display: flex;justify-content: space-between;">
                  <span style="color: rgb(33, 150, 243)">查看详情</span>
                  <i class="fa fa-angle-right" style="font-size: 16px;color: #999>"></i>
                </p>
              </router-link>
            </div>
        </div>
        <div class="demo-text" v-if="active1 === 1" v-for='item,index in clzList' :key='item.index'>
            <div class="itemdetail" >
              <p  style="border-bottom: 1px solid #eee">{{item.sjfl}}</p>
              <div class="contentdetail">
                <p>登记日期：{{item.rq}}</p>
                <p>应用名称：{{item.yymc}}</p>
                <p>问题提出人：{{item.tcr}}</p>
                <p style="width: 100%;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">问题简介：{{item.wtlr}}</p>   
              </div>
               <router-link :to="{path:'/accptdealed',query: {id: item.id}}"> 
                <p style="border-top: 1px solid #eee;display: flex;justify-content: space-between;">
                  <span style="color: rgb(33, 150, 243)">查看详情</span>
                  <i class="fa fa-angle-right" style="font-size: 16px;color: #999>"></i>
                </p>
              </router-link>
            </div>
        </div>
        <div class="demo-text" v-if="active1 === 2" v-for='item,index in clzList' :key='item.index'>
           <div class="itemdetail" >
              <p  style="border-bottom: 1px solid #eee">{{item.sjfl}}</p>
              <div class="contentdetail">
                <p>登记日期：{{item.rq}}</p>
                <p>应用名称：{{item.yymc}}</p>
                <p>问题提出人：{{item.tcr}}</p>
                <p style="width: 100%;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">问题简介：{{item.wtlr}}</p>   
              </div>
               <router-link :to="{path:'/accptdealed',query: {id: item.id}}"> 
                <p style="border-top: 1px solid #eee;display: flex;justify-content: space-between;">
                  <span style="color: rgb(33, 150, 243)">查看详情</span>
                  <i class="fa fa-angle-right" style="font-size: 16px;color: #999>"></i>
                </p>
              </router-link>
            </div>
        </div>
      </van-list>
  </van-pull-refresh>
</mu-container>
 
  </div>
</template>

<script>
import $ from 'jquery';
  import { Search,PullRefresh,List } from 'vant';
export default {
  name: 'more',
  data () {
     return {
       searchval:'',
       active1: 0,
       senderList:[],
       clzList:'',
       ybkfList:'',
       yjjList:'',
       yzzList:'',
        index:1,
      loading: false,//控制上拉加载的加载动画
      finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false,//控制下拉刷新的加载动画
      hasNext:false,

    };
  },
   computed: {
 
  },
  created(){
   $('.mu-popover.transition-bottom').hide();
  },
  mounted(){
    this.getsendList('处理中');
  },
  beforeRouteLeave(to, from, next) {
        if(to.path=='/home'){
          from.meta.keepAlive = false;
        }else{
           from.meta.keepAlive = true;
        }
     next();
   },
   beforeRouteEnter(to, from, next) {
    if(from.path=='/home'){
        $('.mu-popover.transition-bottom').hide();
     }
        if(from.path=='/detail'){
           next(vm=>{
            vm.onRefresh();
         })       
      
        } 
      next(); 
   },
  methods: {

   getlist(value){       //加载列表
    this.index=1;
      if(value==0){
        this.getsendList('处理中');    
      }else if (value==1) {
        this.getsendList('已解决');
      }else if (value==2) {
        this.getsendList('已终止');
      }
    },
    onRefresh(){               //下拉刷新
      let _this=this;
      _this.index=1;
       setTimeout(()=>{
        if(_this.active1==0){
         _this.getsendList('处理中'); 
        }else if (_this.active1==1) {
            _this.getsendList('已解决');
        }else if (_this.active1==2) {
            _this.getsendList('已终止');
        }         
           _this.isLoading = false;              
　　　　　　}, 1500);         
       }, 
    onLoad(){                       //上拉加载   
    let _this=this;
      if(_this.hasNext){
          setTimeout(()=>{
             if(_this.hasNext==true){                
                if(_this.active1==0){
                       _this.getsendList('处理中'); 
                      }else if (_this.active1==1) {
                          _this.getsendList('已解决');
                      }else if (_this.active1==12) {
                          _this.getsendList('已终止');
                      }
                    _this.loading = false;
             }else{
              _this.loading = false;
              _this.finished = true;
             }
　　　　　}, 1500);
          _this.index=_this.index+1;
          }else{
             _this.loading = false; 
          }
       },
   onSearch(){
        this.index=1;
      if(this.active1==0){
           this.getsendList('处理中');
      }else if (this.active1==1) {
        this.getsendList('已解决');
      }else if (this.active1==2) {
        this.getsendList('已终止');
      }
    },
    onCancel(){
      this.searchval='';
      if(this.active1==0){          
        this.getsendList('处理中');
      }else if (this.active1==1) {
        this.getsendList('已解决');
      }else if (this.active1==2) {
         this.getsendList('已终止');
      }
    },
    back(){
    this.$router.go(-1);
    },
   getsendList(aaa){
        let data={
          "REQUEST": {
            "HEAD": {
              "BIZTRANSACTIONID": "string",
              "COUNT": "string",
              "CONSUMER": "string",
              "SRVLEVEL": "string",
              "ACCOUNT": "string",
              "PASSWORD": "string",
              "PAGENUM": "string",
              "PAGESIZE": "string",
              "MODULE": "string"
            },
            "LIST": [
              {"type":"0","cxr":_const.userName,"gzjd":aaa,"index":this.index,"size":"5","wtlr":this.searchval}
            ]
          }
        };
      let url=this.baseUrl+"/SOA/WorkOrder/GetWordOrderList";
      let _this=this;
        $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) { 
             if(res){
              var resp=res.RESPONSE.LIST;
              if(resp.length<5){
                      _this.hasNext=false;
                      _this.finished=true;
                   }else{
                      _this.hasNext=true;
                       _this.finished=false;
                   }
                  for(var i=0;i<resp.length;i++){
                    resp[i].rq= resp[i].rq.substring(0,10);
                  }
                   if(_this.index==1){
                       _this.clzList=res.RESPONSE.LIST;
                       console.log( _this.clzList)                       
                     }else{                                  
                       for(var i=0;i<res.RESPONSE.LIST.length;i++){
                        _this.clzList.push(res.RESPONSE.LIST[i]);
                        console.log(_this.clzList)
                       }
                   }
             }
            
          }
      });  
    },
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'> 
.mu-tabs-center{
  justify-content: space-between;
}
.van-search{
  padding: 7px 9px;
}
.mu-appbar{
position: fixed !important;
top: 0;
left: 0;
}
.itemdetail>p{
  margin: 0;
  padding: 6px 0;
}
.itemdetail>a>p{
  margin: 0;
  padding: 6px 0;
}
.itemdetail{
 margin: 6px 8px ;
 border: 1px solid #eee;
 background: #fff;
 border-radius: 6px;
 text-align: left;
 padding: 0px 8px;
 box-shadow:0px 2px 2px #eee;
}
.itemdetail>div{
  color: #999;
  font-size: 13px;
}
.contentdetail>p{
  margin: 6px 0;
}
a{
  color: #999;
}
</style>
