<template>
  <div class="reply">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click='back'>
          <mu-icon value="arrow_back" ></mu-icon>
      </mu-button>
        审批
       <mu-button icon slot="right" >
          <mu-icon></mu-icon>
      </mu-button>
    </mu-appbar>
   <mu-container style='overflow:hidden' > 
    <mu-form ref="form" style="margin-top:74px;" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="80">
      <mu-form-item  label="标题"  prop="title" >
        <mu-text-field v-model="form.title" prop="title"  disabled ></mu-text-field>
      </mu-form-item>
      <mu-form-item  label="报修人"  prop="name"   >
        <mu-text-field v-model="form.name" prop="name" disabled  ></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="phone" label="联系电话" >
        <mu-text-field v-model="form.phone" prop="phone" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item label="提出单位"  prop="company" >
       <div style="width: 100%; text-align: left;border-bottom:2px dotted rgba(0,0,0,.38);">
       <p style="word-wrap: break-word;margin: 0;font-size: 16px;color: rgba(0,0,0,.87);">{{company}}</p>
       </div>
      </mu-form-item>
      <mu-form-item  label="登记日期">
          <mu-date-input v-model="form.date1" disabled></mu-date-input> 
      </mu-form-item>
      <mu-form-item prop="adress" label="分类" style='display: none;'>
        <mu-text-field v-model="form.adress" prop="adress" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="adress" label="地址">
        <mu-text-field v-model="form.adress" prop="adress" disabled></mu-text-field>
      </mu-form-item>
      <div  class="img_content">
        <div  v-for="(item,index) of picList" :key='index'>
          <div @click='seeimgs(index)' class="img_item">
            <img :src=item alt="">
          </div>
        </div>
      </div>
      <mu-form-item  label="问题内容" label-position='top'>
          <p style='color: rgba(0,0,0,.87);font-size: 16px;text-align: left;border-bottom:2px dotted rgba(0,0,0,.38);width: 100%'> {{wtlr}}</p>
      </mu-form-item>
      <mu-form-item  label="报修厂家" label-position='top' style='display: none;'>
          <p style='color: rgba(0,0,0,.87);font-size: 16px;text-align: left;border-bottom:2px dotted rgba(0,0,0,.38);width: 100%'> {{wtlr}}</p>
      </mu-form-item>
       <mu-button color="primary" @click="price" v-show='pricebtn' >查看报价</mu-button>
       <div class="select-control-group" style="margin: 10px 0">
          <mu-flex class="select-control-row" >
            <mu-radio value="agreed" v-model="radio"  label="通过" ></mu-radio>
             <mu-radio value="AUTOMATIONREJECT" v-model="radio"  label="不通过"></mu-radio>
          </mu-flex>
        </div>
       <mu-form-item prop="jjbf" label-position='top' :rules='contentRules'>
            <mu-text-field prop="jjbf" v-model="form.jjbf" multi-line :rows="4" full-width placeholder='请输入您的审批意见'></mu-text-field>
      </mu-form-item>
  </mu-form>
  <mu-button color="primary" @click="submit" :disabled="isDisable" full-width style='margin: 10px 0'>提交</mu-button>
</mu-container>
</div>
</template>

<script>
import $ from 'jquery';
import { Rate,ImagePreview,Toast} from 'vant';
export default {
  name: 'accptdealed',
  data () {
    return {
      company:'',
      pricebtn:true,
      picList:[],
      wtlr:'',
       radio:'agreed',
      isDisable:false,
       pics:"",
      resp:'',
      show:true,
      value:3,
      labelPosition: 'left',
       form: {
        name: '',
        date1: '',
        content: '',
        title:'',
        phone:'',
        resp:'',
        adress:'',
        jjbf:'',
      },
       contentRules: [
        { validate: (val) => !!val, message: '不能为空'},
      ],

    }
  },
  mounted(){
    this.getdetail();
    this.form.title=this.$route.query.subject;
    this.form.name=_const.userName;
    this.form.phone=_const.userPhone;
    this.company=_const.usercompany;
    this.getimgs();
  this.getprice();
  },
   methods: {
    seeimgs(index){
      ImagePreview({images:this.picList,startPosition:index});
    },
    back(){
      this.$router.go(-1);
    },
    getdetail(){                         //获取详情
       let data={
              "activityName":this.$route.query.activityName,
              "grantorId": _const.EMPUID,
              "instid": this.$route.query.instid,
              "processName":this.$route.query.processName,
              "sign": "97e13531669ebf79036fef457d2e26a5",
              "taskId": this.$route.query.taskId,
              "userId":  this.$route.query.userId,
          };
      let url=this.baseUrl+"/v1/bpmapibx/approvalTaskJson";
       let _this=this;
          $.ajax({
                type: 'post',
                url: url,
                data:JSON.stringify(data),
                contentType:'application/json',
                datatype:"json",
                success: function (res) {
                var resp= JSON.parse(res.data.list);
                console.log(resp)
                if(resp.msg=='此任务已处理'){
                   Toast(resp.msg);
                   setTimeout(function(){
                     _this.$router.go(-1);
                   },1500)
                 
                   return;
                }
                _this.form.date1=resp.data.approveRecords[0].approveTime;
                _this.form.adress=resp.data.nodeTabLists[0].nodeTableLists[1].applyvalue;
                 _this.wtlr=resp.data.nodeTabLists[0].nodeTableLists[4].applyvalue;                
              }
          }); 
    },
    getimgs(){                               //获取图片
       let  params = new URLSearchParams();
            params.append('taskid',this.$route.query.instid);
        let picUrl= this.baseUrl+'/v1/bpmapibx/GetFlowrkPic';
        let _this=this;
        _this.$http.post(picUrl,params).then(function ( res ){
                  if(res.data.data.list){
                    _this.picList=res.data.data.list                  
                      for(var i=0;i<_this.picList.length;i++){
                        _this.picList[i]=_this.baseUrl+_this.picList[i];  
                      }
                    }
                      
                });    

    },
    getprice(){                                          //是否报价
          let  paramprice = new URLSearchParams(); 
            paramprice.append('taskid',this.$route.query.instid);      
           let urlPrice=this.baseUrl+'/v1/bpmapibx/GetFlowrkPrice';//报价
           let _this=this;
         _this.$http.post(urlPrice,paramprice).then(function ( res ){
              _this.priceList=res.data.data.list;
               console.log(res.data.data.list);
               if(res.data.data.list.length==0){
                 _this.pricebtn=false;
               }else{
                 _this.pricebtn=true;
               }  
            });
           },
    price(){                                               //查看报价
      this.$router.push({path:'/rate',query:{instid:this.$route.query.instid}})
    },
    submit(){
      this.$refs.form.validate().then((result) => {       //提交审批
        if(result==true){
          let url=this.baseUrl+"/v1/bpmapibx/InstanceApproveServcie";
          let imgstrs=this.picList.join('|')
          let data = {
                       'REQUEST': {
                      'HEAD': {
                        'ACCOUNT': "string",
                        'BIZTRANSACTIONID': "string",
                        'COMMENTS': "string",
                        'CONSUMER': "string",
                        'COUNT': "string",
                        'PASSWORD': "string",
                        'SRVLEVEL': "string"
                      },
                     'LIST': {
                        'INSTID': this.$route.query.instid,
                        'ACTION': this.radio,
                        'BUSINESSDATA': {
                          'BXR': _const.userName,
                          'BXDD': this.form.adress,
                          'BXRDH': _const.userPhone,
                          'BXRQ':  this.form.date1,
                          'BXNR': this.wtlr,
                          'BXTP': imgstrs,
                        },
                        'COMMENT': this.form.jjbf,
                        'USERID': _const.EMPUID
                      }
                    }
              };
         let _this = this;
               $.ajax({
                type:"post",
                url:url,
                data:JSON.stringify(data),
                dataType:'JSON',
                contentType : 'application/json;charset=UTF-8',
                beforeSend:function(){
                  _this.isDisable=true;
                  $('.demo-circular-progress').show();
                },
                }).then(function(res){ 
               _this.isDisable=false;
                Toast.success("提交成功");
                _this.$router.go(-1);                                              
              })

        }
      });
    },
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mu-appbar{
  position: fixed;
  top: 0;
  left: 0;
}
.mu-dialog-title{
  font-size: 14px;
}
.mu-dialog-body{
  font-size: 12px !important;
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
.mu-radio{
  margin-right: 20px;
}
</style>
