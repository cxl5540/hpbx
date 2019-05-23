<template>
  <div class="detail" style="margin-bottom: 56px;">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click='back'>
          <mu-icon value="arrow_back" ></mu-icon>
      </mu-button>
     处理工单
        <mu-button icon slot="right" >
          <mu-icon  ></mu-icon>
      </mu-button>
    </mu-appbar>
   <mu-container style='overflow:hidden' > 
    <mu-form ref="form" style="margin-top:74px;" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
      <mu-form-item  label="提出人"  prop="name"   >
        <mu-text-field v-model="form.name" prop="name" disabled  ></mu-text-field>
      </mu-form-item>
      <mu-form-item label="提出单位"  prop="company">
        <mu-text-field v-model="form.company"  prop="company" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="phone" label="联系电话" >
        <mu-text-field v-model="form.phone" prop="phone" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="shijian" label="事件分类" >
          <mu-text-field v-model="form.shijian"  prop="shijian" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="jinji" label="紧急程度" >
        <mu-text-field v-model="form.jinji" prop="jinji" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item  label="登记日期">
          <mu-date-input v-model="form.date1" disabled></mu-date-input> 
      </mu-form-item>
       <mu-form-item prop="dutyname" label="板块责任人" >
        <mu-text-field v-model="form.dutyname" prop="dutyname" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="accpname" label="问题受理人" >
        <mu-text-field v-model="form.accpname" prop="accpname" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="muname" label="菜单名称" >
        <mu-text-field v-model="form.muname" prop="muname" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="yingyong" label="应用名称" >
        <mu-text-field v-model="form.yingyong" prop="yingyong" disabled></mu-text-field>
      </mu-form-item>
     <mu-form-item prop="jindu" label="工作进度"  v-show='isdealipt'>
        <mu-select v-model="form.jindu" placeholder='请选择'>
          <mu-option prop="jingdu" v-for="option,index in options" :key="option" :label="option" :value="option"></mu-option>
        </mu-select>
      </mu-form-item>
      <mu-form-item prop="gzjd" label="工作进度" v-show='isdeal'>
        <mu-text-field v-model="form.gzjd" prop="gzjd" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="date2" label="希望解决日期">
           <mu-date-input v-model="form.date2" disabled></mu-date-input>
      </mu-form-item>
       <div  class="img_content">
        <div  v-for="(item,index) of pics" :key='index'>
          <div @click='seeimgs(index)' class="img_item">
            <img :src=item alt="">
          </div>
        </div>
      </div>
      <mu-form-item  label="问题内容" label-position='top' >
         <p style='color: rgba(0,0,0,.87);font-size: 16px;text-align: left; border-bottom:2px dotted rgba(0,0,0,.38);width: 100%'> {{resp.wtlr}}</p>
      </mu-form-item>
     
      <mu-form-item prop="jjbf" label-position='top' :rules='contentRules' v-show='isSelf'>
            <mu-text-field prop="jjbf" v-model="form.jjbf" multi-line :rows="4" full-width placeholder='请输入您的解决办法'></mu-text-field>
      </mu-form-item>
      <div style="margin: 30px 0;display: flex;justify-content: space-around;" v-show='isSelf' >
         <mu-button  color="primary" @click="submit" :disabled="isDisable">提交</mu-button>
         <div style='margin: 0'>
            <mu-flex justify-content="center">
              <mu-button @click="openBotttomSheet">指派他人处理</mu-button>
            </mu-flex>
            <mu-bottom-sheet :open.sync="open" >
               <!-- <mu-sub-header>选择指定人员</mu-sub-header> -->
              <mu-list  v-for="item,index in ry" :key='index'  @item-click="closeBottomSheet(index,item)">
                <mu-list-item button>
                  <mu-list-item-title ref='aa'>{{item.name}}</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-bottom-sheet>
          </div>
      </div>
  </mu-form>  
</mu-container>
  </div>
</template>

<script>
  import $ from 'jquery';
  import { Toast,Dialog ,ImagePreview} from 'vant';
export default {
  name: 'Detail',
  data () {
    return {
      pics:"",
      isdealipt:false,
      isdeal:false,
      isSelf:false,
      resp:'',
      isDisable: false,
       options: [
 '已解决', '已终止',
      ],
        open: false,
       labelPosition: 'left',
       ry:'',
       contentRules: [
        { validate: (val) => !!val, message: '解决办法不能为空'},
      ],
      form: {
        jjbf:'',
        jindu:'已解决',
        name: '',
        company: '',
        date1: '',
        date2: '',
        content: '',
        yingyong:'',
        muname:'',
        accpname:'',
        shijian:'',
        dutyname:'',
        jinji:'',
        gzjd:'',
        username:''
       
      },
 
    }
  },
  created(){
    this.getUser();
  },
  mounted(){
  this.getdetail()   
  },
   methods: {
   seeimgs(index){
      ImagePreview({images:this.pics,startPosition:index,});
    },
    closeBottomSheet (index,item) {   //转发工单提交
      Dialog.alert({
        showCancelButton:true,
        title: '提示',
        message: '是否指派'+item.name+'为问题处理人?'
      }).then(() => {
           let data={                    //确认
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
                  {
                    "id": this.$route.query.id,
                   "clr": item.name,
                   "clrid": item.resid,
                 }
                ]
              }
            };
         let url=this.baseUrl+'/SOA/WorkOrder/ForwardWordOrder'            
        let _this=this;
            $.ajax({
                type: 'post',
                url: url,
                data:JSON.stringify(data),
                contentType:'application/json',
                datatype:"json",
                beforeSend: function () {
                  $('.demo-circular-progress').show();
                 _this.isDisable=true;
                  },
                success: function (res) { 
                 if(res){
                   Toast.success('指派成功');
                   _this.isDisable=false;
                 }
                
              }
          });
      }).catch(() => {
       this.open = true;
      });
      this.open = false;
    },
    openBotttomSheet () {               //转发人
  
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
          "LIST": [{
           "rq": "11"
          }]
         }
        };
        let url=this.baseUrl+'/SOA/WorkOrder/GetBasicInfo';
        let _this=this;

        $.ajax({
            type: 'post',
            url: url,
            data:JSON.stringify(data),
            contentType:'application/json',
            datatype:"json",
            success: function (res) { 
             console.log(res.RESPONSE.LIST); 
             if(res){
               let resp=res.RESPONSE.LIST[0];
               _this.ry=resp.ry;
              console.log(_this.ry);
               _this.open = true;
             }
            
          }
      });
   
     
    },
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
            params.append('AppId','1023060');
            params.append('AppSecret','baoxiu');
             _this.$http.post(url,params).then(function ( res ){
              console.log(res.data.data.info)
                if(res.data.data.info){
                  _this.username=res.data.data.info.username;
                  if(_this.username){
                    _this.getdetail(); 
                  }                  
                }
                if(res.data.data.info==null){
                  Toast(res.data.data.msg);
                  $('.demo-circular-progress').hide();
                }

          });
      }       

    },
    getdetail(){
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
        "LIST": [{
         "id": this.$route.query.id,type: "0"
        }]
       }
      };
      let url=this.baseUrl+'/SOA/WorkOrder/GetWordOrder';
       let _this=this;
          $.ajax({
                type: 'post',
                url: url,
                data:JSON.stringify(data),
                contentType:'application/json',
                datatype:"json",
                success: function (res) { 
                 if(res){ 
                  let resp=res.RESPONSE.LIST[0];
                  _this.resp=resp;      
                  _this.form.name=resp.tcr;
                  _this.form.company=resp.dw;
                  _this.form.phone=resp.lxdh;
                  _this.form.shijian=resp.sjfl;
                  _this.form.jinji=resp.jjcd;
                  _this.form.dutyname=resp.bkfzr;
                  _this.form.accpname=resp.clr;
                  _this.form.muname=resp.cdmc;
                  _this.form.yingyong=resp.yymc;
                  _this.form.date2=resp.qwjjrq;
                  _this.form.date1=resp.rq;
                  /* _this.form.jindu=resp.gzjd;*/
                  if(resp.clr==_this.username&&resp.gzjd=='处理中'){
                    _this.isSelf=true;
                    _this.isdeal=false;
                    _this.isdealipt=true;
                  }else{
                     _this.isSelf=false;
                     _this.isdeal=true;
                     _this.isdealipt=false;
                     _this.form.gzjd=resp.gzjd;
                  }
                   _this.pics=resp.pics;
                   for(var i=0;i<  _this.pics.length;i++){              
                         _this.pics[i]='http://ph.cq-p.com.cn/gd/gd'+_this.pics[i]
                   }

                 }
                
              }
          }); 
    },
    back(){
      this.$router.go(-1);
    },
    change(){
      alert(1);
    },
    submit () {
     this.$refs.form.validate().then((result) => {
        console.log('form valid: ', result);
         if(result==true){
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
        "LIST": [{
         "id": this.$route.query.id,
         "jjqk": this.form.jjbf,
         "qrsj": "2019-01-14 15:59:36",
         "gzjd":this.form.jindu,
         "updatedate": this.getNowFormatDate(),
         "updateby": _const.userName,
        }]
       }
      };
     let url = this.baseUrl+'/SOA/WorkOrder/HandleWordOrder';
      let _this=this;
          $.ajax({
                type: 'post',
                url: url,
                data:JSON.stringify(data),
                contentType:'application/json',
                datatype:"json",
                 beforeSend: function () {
                  $('.demo-circular-progress').show();
                  _this.isDisable=true;
                  },
                success: function (res) {
                 _this.isDisable=false; 
                 Toast.success('处理成功');
                 setTimeout(function(){
                /* _this.$router.go(-1);*/ 
                _this.$router.push('/more')
                 },2000)
                
              }
          }); 
         }
      });

 
     },

  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.mu-input.disabled .mu-input-content{
  color: #000 !important;
}
.mu-bottom-sheet{
  height: 300px;
  overflow: scroll;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {

}
a {
  color: #42b983;
}
.mu-appbar-title{
  padding-left: 0 !important;
}
.mu-appbar{
  padding-left: 0 !important;
  position: fixed;
}
.gridlist-demo{
  width: 360px;
  height: 450px;
  overflow-y: auto;
}
.mu-demo-form {
  width: 100%;
  max-width: 460px;
}
.van-dialog{
  z-index: 9999999999 !important;
}
.mu-text-field-textarea{
  height: 100% !important;
}
.img_content{
  display: flex;
justify-content: flex-start;
height: 100px;
}
.img_item>img{
    max-width: 100%;
    max-height: 100%;
}
.img_content>div{
  display: flex;
  flex: 1;
}
</style>
