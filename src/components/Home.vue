<template>
  <div class="hello" style="margin-top: 56px">
      <mu-appbar style="width: 100%;position: fixed;top: 0" color="primary">
              <mu-menu slot="right">
        <mu-button flat to="/additem" >添加</mu-button>
      </mu-menu>
        报修申请列表
        <mu-menu slot="left">
         <mu-button flat>&nbsp;&nbsp;&nbsp;</mu-button>
        </mu-menu>
      </mu-appbar>  
      <mu-container style='padding: 0;'>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list v-model="loading" :finished="finished"   finished-text="没有更多数据" @load="onLoad" :offset="10">   
        <div class="demo-text" v-if="active1 === 0" v-for='item,index in clzList' :key='item.index'>
          <div class="itemdetail" >
              <p  style="border-bottom: 1px solid #eee">{{item.subject}}</p>
              <div class="contentdetail">
                <p>申请日期：{{item.assignedTime}}</p>
                <p>流程名称：{{item.processNameCn}}</p>
                <p style="width: 100%;overflow: hidden;white-space:nowrap; text-overflow: ellipsis;">申请人：{{item.requesterName}}</p>   
              </div>
               <router-link :to="{path:'/accptdealed',query: {instid: item.instanceId,activityName:item.activityName,processName:item.processName,taskId:item.taskId,userId:item.userId,subject:item.subject}}"> 
                <p style="border-top: 1px solid #eee;display: flex;justify-content: space-between;">
                  <span style="color: rgb(33, 150, 243)">审批</span>
                  <span  style="font-size: 16px;color: #999>"><i class="fa fa-angle-right"></i></span>
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
  import { Search,PullRefresh,List,Toast} from 'vant';
 export default {
   name: 'HelloWorld',
   data () {
    return {
       searchval:'',
       active1: 0,
       senderList:[],
       clzList:[],
       ybkfList:'',
       yjjList:'',
       yzzList:'',
       index:1,
      loading: false,//控制上拉加载的加载动画
      finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false,//控制下拉刷新的加载动画
      hasNext:false,
      userName:''

    }
  },

  created(){
      $('.demo-circular-progress').show();
    this.getUser();
     
  },
  mounted(){
 
/*   this.getsendList(); */
  },

  beforeRouteLeave(to, from, next) {
        if(to.path=='/additem'||to.path == "/more"){
          from.meta.keepAlive = false;
           $('.mu-popover.transition-bottom').hide();
        }else{
           from.meta.keepAlive = true;
           $('.mu-popover.transition-bottom').hide();
        }
     next();
   },
    beforeRouteEnter(to, from, next) {
        if(from.path=='/dealed'){
           next(vm=>{
            vm.onRefresh();
         })      
        } 
      next(); 
   },
   methods: {
    getUser(){            //获取用户信息
      let reg = new RegExp("(^|\\?|&)" + 'ticket' + "=([^&]*)(\\s|&|$)","i");
      if(reg.test(window.location.href)){
           let ticket1=unescape(RegExp.$2.replace(/\+/g," "));
           let tmp = ticket1.split("#"); 
           let ticket = tmp[0];
           let  url='http://wxzp.cq-p.com.cn:9500/v1/baseapi/GetUserInfo'; //获取openID
           let _this=this;
           var params = new URLSearchParams();
            params.append('ticket',ticket);
            params.append('AppId','1023192');
            params.append('AppSecret','mytest');
             _this.$http.post(url,params).then(function ( res ){
              console.log(res.data.data.info)
                if(res.data.data.info){
                  _this.userName=res.data.data.info.username;
                  _const.userName=res.data.data.info.username;
                  _const.userPhone=res.data.data.info.mobile;
                  _const.usercompany=res.data.data.info.orgLongName;
                   let attr=res.data.data.info.orgLongName.split("!");
                        attr.shift();
                        let attr1=attr;
                         attr1.shift();
                        let str=attr1.join('/');
                     _const.usercompany=str; 
                  let openid=res.data.data.info.openid;
                 let url2=_this.baseUrl+'/v1/baseapi/GetIdmUserInfo' ; //获取基本信息
                 let  params1 = new URLSearchParams();
                      params1.append('empid',openid);
                      params1.append('sysid','10026');
                      params1.append('TARGETSYSID','10001');
                       _this.$http.post(url2,params1).then(function ( res ){                     
                        let EMPUID=res.data.data.info.RESPONSE.LIST.e.EMPUID;
                         _const.EMPUID=EMPUID;
                           console.log(_const.EMPUID);
                         if(EMPUID){
                           _this.getsendList();
                         }
                       }).catch(function (error) {
                        　Toast('您现在还未权限，请联系管理员');
                          $('.demo-circular-progress').hide();
                        });
  
                }
                if(res.data.data.info==null){
                  Toast(res.data.data.msg);
                  $('.demo-circular-progress').hide();
                }

          },function(){
             $('.demo-circular-progress').hide();
          });
      }       

    },
    getlist(value){       //加载列表
        this.index=1;
      if(value==0){
        this.getsendList('处理中');
        /*this.onRefresh(); */   
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
         _this.getsendList(); 
        }else if (_this.active1==1) {
            _this.getsendList();
        }else if (_this.active1==2) {
            _this.getsendList();
        }         
           _this.isLoading = false;              
　　　　　}, 1500);         
       }, 
    onLoad(){                       //上拉加载 
    let _this=this;
    console.log(_this.hasNext);
      if(_this.hasNext){
          setTimeout(()=>{
             if(_this.hasNext==true){                        
                       _this.getsendList();               
                    _this.loading = false;
             }else{
              
              _this.finished = true;
             }
　　　　　}, 1500);
          /* _this.loading = false;*/
          _this.index=_this.index+1;
          }else{
              _this.loading = false;
              _this.finished = true; 

          }
       },

    onSearch(){ 
    this.index=1; 
      if(this.active1==0){
           this.getsendList();
      }else if (this.active1==1) {
        this.getsendList();
      }else if (this.active1==2) {
        this.getsendList();
      }
    },
    onCancel(){
      this.searchval='';
      if(this.active1==0){          
        this.getsendList();
      }else if (this.active1==1) {
        this.getsendList();
      }else if (this.active1==2) {
         this.getsendList();
      }
    },
    more(){
     this.$router.push('/more');
      $('.mu-popover.transition-bottom').hide();
    },
   getsendList(){   
        let data={
          "pageNo":this.index,
          "pageSize":"10",
          "sign":"97e13531669ebf79036fef457d2e26a5",
          "userId":_const.EMPUID
        };
      let url=this.baseUrl+"/v1/bpmapibx/todolist";
      let _this=this;
        $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) { 
             if(res){
              var resp= JSON.parse(res.data.list); 
                resp.data.taskInfos=resp.data.taskInfos.filter(value=>{
                    return (value.subject.indexOf("和平药房_门店报修_")!=-1)
                  })
                 if(resp.data.taskInfos.length<10){
                      _this.hasNext=false;
                      /*_this.finished=false;*/
                   }else{
                    /*  _this.hasNext=true;*/
                       _this.finished=false;
                        _this.hasNext=true;
                   }    
               if(_this.index==1){
                   _this.clzList=resp.data.taskInfos;

                 }else{                              
                   for(var i=0;i<resp.data.taskInfos.length;i++){
                    _this.clzList.push(resp.data.taskInfos[i]);
                    console.log(_this.clzList)
                   }
               }
               console.log(_this.clzList);
           
             }
            
          },
        },);
 
    },

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.mu-tabs-center{
 /*  justify-content: space-between; */
 text-align: center;
}
.van-search{
  padding: 7px 9px;
}
.mu-list{
  padding: 0;
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
.mu-appbar-left{
  padding: 0 !important;
}
a{
  color: #999;
}
</style>
