<template>
  <div class="reply">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click='back'>
          <mu-icon value="arrow_back" ></mu-icon>
      </mu-button>
       终止
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
      <mu-form-item prop="jindu" label="工作进度">
        <mu-text-field v-model="form.jindu" prop="jindu" disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="date2" label="希望解决日期">
           <mu-date-input v-model="form.date2" disabled></mu-date-input>
      </mu-form-item>
      <mu-form-item  label="问题内容"  label-position='top'>
       <p style='color: rgba(0,0,0,.87);font-size: 16px;text-align: left;border-bottom:2px dotted rgba(0,0,0,.38);width: 100%'> {{resp.wtlr}}</p>
      </mu-form-item>
  </mu-form>
  <div @click='abc'>预览图片</div>
</mu-container>

</div>
</template>

<script>
import $ from 'jquery';
import {ImagePreview} from 'vant';
export default {
  name: 'Reply',
  data () {
    return {
      resp:'',
      labelPosition: 'left',
       form: {
        jjbf:'',
        jindu:'',
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
        jinji:''
      },
    }
  },
  mounted(){
    this.getdetail();
  },
   methods: {
    abc(){
      ImagePreview([
        'https://upload-images.jianshu.io/upload_images/2891127-9bd14bc6aae75a44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/863/format/webp',
        'https://img.yzcdn.cn/2.jpg'
      ]);
    },
    back(){
      this.$router.go(-1);
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
         "id": this.$route.query.id
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
                  console.log(resp);
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
                   _this.form.jindu=resp.gzjd;
                 /*  _this.form.content=resp.wtlr;*/

                 }
                
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
</style>
