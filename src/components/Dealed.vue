<template>
  <div class="reply">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click='back'>
          <mu-icon value="arrow_back" ></mu-icon>
      </mu-button>
         工单详情
       <mu-button icon slot="right" >
          <mu-icon></mu-icon>
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
       <div  class="img_content">
        <div  v-for="(item,index) of pics" :key='index'>
          <div @click='seeimgs(index)' class="img_item">
            <img :src=item alt="">
          </div>
        </div>
      </div>
        <mu-form-item  label="问题内容"  label-position='top'>
       <p style='color: rgba(0,0,0,.87);font-size: 16px;text-align: left;border-bottom:2px dotted rgba(0,0,0,.38);width: 100%'> {{resp.wtlr}}</p>
      </mu-form-item>
        <mu-form-item  label="解决情况"  label-position='top'>
       <p style='color: rgba(0,0,0,.87);font-size: 16px;text-align: left;border-bottom:2px dotted rgba(0,0,0,.38);width: 100%'> {{resp.jjqk}}</p>
      </mu-form-item>
      <mu-form-item  label="服务评价"  label-position='top'>
       <p style='color: rgba(0,0,0,.87);font-size: 16px;text-align: left;border-bottom:2px dotted rgba(0,0,0,.38);width: 100%'> {{resp.tsjy}}</p>
      </mu-form-item>
<!--       <mu-form-item  label="服务评价" label-position='top' v-show='show1'>
   <mu-text-field prop="fwpj" multi-line  v-model="form.fwpj" disabled ></mu-text-field>
 </mu-form-item>  --> 
      <mu-container> 
         <mu-button full-width color="info" @click='rate' style='margin-bottom: 56px' v-show='show'>评价</mu-button>
      </mu-container>
  </mu-form>
</mu-container>
</div>
</template>

<script>
import $ from 'jquery';
import { Rate,ImagePreview } from 'vant';
export default {
  name: 'Reply',
  data () {
    return {
       pics:"",
      resp:"",
      show:true,
      show1:false,
      value:3,
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
        jinji:'',
        jjqk:'',
        fwpj:''
      },
    }
  },
  mounted(){
    this.getdetail();
  },

   methods: {
     seeimgs(index){
      ImagePreview({images:this.pics,startPosition:index,});
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
         "id": this.$route.query.id,
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
                  _this.pics=resp.pics;
                   for(var i=0;i<  _this.pics.length;i++){              
                         _this.pics[i]='http://ph.cq-p.com.cn/gd/gd'+_this.pics[i]
                   }
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
                   /*_this.form.content=resp.wtlr;
                  _this.form.jjqk=resp.jjqk;*/
                  if(resp.tsjy==''){
                    _this.show=true;
                      _this.show1=false;
                    
                  }else {
                  /*  _this.form.fwpj=resp.tsjy;*/
                       _this.show1=true;
                     _this.show=true;
                  }

                 }
                
              }
          }); 
    },
    rate(){
      this.$router.push({path: '/rate',query: {id:  this.$route.query.id}})
    }
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
