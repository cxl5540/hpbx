<template>
  <div class="additem" style="margin-bottom: 56px;">
      <mu-appbar style="width: 100%;" color="primary">
        <mu-button icon slot="left" @click='back'>
            <mu-icon value="arrow_back" ></mu-icon>
        </mu-button>
          添加报修工单
         <mu-button icon slot="right" >
            <mu-icon  ></mu-icon>
        </mu-button>
    </mu-appbar>
   <mu-container style='overflow:hidden' > 
      <mu-form ref="form" style="margin-top:72px;" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
          <mu-form-item  label="标题"  prop="title" :rules='titleRules'  >
              <mu-text-field v-model="form.title" prop="title" placeholder='请输入'  ></mu-text-field>
          </mu-form-item>
          <mu-form-item  label="报修人"  prop="name"   >
              <mu-text-field v-model="name" prop="name" disabled ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="phone" label="联系电话"  >
              <mu-text-field v-model="phone" prop="phone" disabled></mu-text-field>
          </mu-form-item>
          <mu-form-item label="提出单位"  prop="company" >
             <div style="width: 100%; text-align: left;border-bottom:2px dotted rgba(0,0,0,.38);">
             <p style="word-wrap: break-word;margin: 0;font-size: 16px;color: rgba(0,0,0,.38);">{{company}}</p>
             </div>
          </mu-form-item>
          <mu-form-item  label="登记日期">
            <mu-text-field v-model="date1" prop="date1" disabled></mu-text-field> 
          </mu-form-item>
          <mu-form-item prop="adress" label="地址"  :rules='adressRules'>
            <mu-text-field v-model="form.adress" prop="adress" placeholder='请输入'></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="accpname" label="问题分类" >
            <select class="selct"  placeholder='请选择'  id="slr" >  
              <option value="" selected >请选择</option>
              <option  v-for="option,index in classList" :key="index" :label="option.name" :value="option.id" >{{option.name}}</option> 
            </select>
          </mu-form-item>
           <mu-form-item prop="shijian" label="选择厂家" label-position='top' >
              <mu-select  placeholder='请选择' multiple v-model="value1" full-width>
                <mu-option v-for="option,index in companyList" :key="index" :label="option.username" :value="option.username"></mu-option>
              </mu-select>
          </mu-form-item>
          <mu-form-item prop="content" label-position='top' :rules='contentRules'>
              <mu-text-field prop="content" v-model="form.content" multi-line :rows="4" full-width placeholder='请输入您的问题'></mu-text-field>
          </mu-form-item>
        <div style="margin-top: 10px">
          <Photo v-on:picattr='getpic' v-on:picstrs='picstr'></Photo>
        </div>        
        <div style="margin-top: 20px">
          <mu-button color="primary" @click="submit" :disabled="isDisable" full-width>提交</mu-button>        
        </div>
    </mu-form>
</mu-container>

  </div>
</template>

<script>
  import $ from 'jquery';
  import { Toast } from 'vant';
  import Photo from './Photo.vue'
export default {
  name: 'additem',
  components:{
    Photo,
  },
  data () {
    return {
      wtfl:'',
      value1:[],
      attr:[],
      imgstrs:'',
       isDisable: false,
      classList:'',
      companyList:'',
      ry:[],
       date1: '',
       name: '',
        phone:'',
        company:'',
       labelPosition: 'left',
      form: {
      title:'',          
      date2: '',
      content: '',
      adress:'',   
      },
        pics:'',
      titleRules:[
       { validate: (val) => !!val, message: '标题不能为空'},
       { validate: (val) => val.length<15, message: '标题不能超过10字'},
      ],

     adressRules: [
        { validate: (val) => !!val, message: '地址不能为空'},
      ],
/*      shijianRules: [
        { validate: (val) => !!val, message: '事件不能为空'},
      ],*/
      contentRules: [
        { validate: (val) => !!val, message: '问题内容不能为空'},
      ],
    }
  },
  created(){

  },
  mounted(){
    this.getclasslit();
    this.getcompanylist();
    this.date1=this.getNowFormatDate();
    this.name=_const.userName;
    this.phone=_const.userPhone;
    this.company=_const.usercompany;
    $('.mu-bottom-nav').hide();
  },
   methods: {
    getpic(data){
      this.pics=data;
    },
    picstr(data){
      console.log(data);
      this.imgstrs=data;
    },
    getclasslit(){   //获取分类
      let url=this.baseUrl+'/v1/bpmapibx/getClassList';
        let _this=this;
    _this.$http.post(url)
    .then( (response) => {
        console.log(response);
        _this.classList=response.data.data.info;
     /*  _this.List=JSON.parse(response.data).rows;*/
    })
    .catch( (error) => {
        console.log(error);
    });
    },
    getcompanylist(){
 let url=this.baseUrl+'/v1/bpmapibx/getComapnyList';
        let _this=this;
    _this.$http.post(url)
    .then( (response) => {
        console.log(response);
        _this.companyList=response.data.data.info;
     /*  _this.List=JSON.parse(response.data).rows;*/
    })
    .catch( (error) => {
        console.log(error);
    });
    },
     getbaseinfo(){   //获取基础信息
      this.name=_const.userName;
       this.phone=_const.userPhone;
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
               _this.sjfl=resp.sjfl.split(",");
              _this.yymc=resp.yymc.split(",");
             }
            
          }
      });
     },
    back(){
        $('.mu-bottom-nav').show();
      this.$router.go(-1);
    },

    submit () {      //提交 
    if(this.pics.length<3){
      Toast('图片必须三张以上');
      return;
    }                                
      this.$refs.form.validate().then((result) => {
        if(result==true){
          let data={
  "REQUEST": {
    "HEAD": {
      "ACCOUNT": "string",
      "BIZTRANSACTIONID": "string",
      "COMMENTS": "string",
      "CONSUMER": "string",
      "COUNT": "string",
      "PASSWORD": "string",
      "PAGENUM": "string",
      "PAGESIZE": "string",
      "SRVLEVEL": "string",
      "MODULE": "string"
    },
    "LIST": {
      "COMMENT": "申请",
      "CHILD_TABLE_LIST": [{
        "BXR": this.name,
        "BXDD":  this.form.adress,
        "BXRDH":  this.phone,
        "BXRQ": this.date1,
        "BXNR":  this.form.content,
        "CHILD_TABLE_LIST":this.pics,
      }],
      "PROCESSNAME": "RepairProcess",
      "REQNO": "",
      "SUBJECT": '和平药房_门店报修_'+this.form.title,
      "USERID": _const.EMPUID,
      "POSITIONID": ""
    }
  }
};
        console.log(data);
        console.log(JSON.stringify(data));
         let url=this.baseUrl+"/v1/bpmapibx/CreateBPMRest"; //添加工单
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
                  Toast.success('添加成功');
                  _this.pics='';
                  setTimeout(function(){
                     _this.isDisable=false;
                     _this.$router.go(-1);
                  },2000);
                    let response =JSON.parse(res.data.list);
                    console.log(response);
                    if(response.RESPONSE.HEAD.RESULT=='1'){
                      Toast(response.RESPONSE.HEAD.COMMENTS);
                      return;
                    }
                     let taskid=response.RESPONSE.LIST[0].INSTANCEID;
                      let url =_this.baseUrl+'/v1/bpmapibx/CreateBPMrecord'  //储存
                      let  params = new URLSearchParams();
                      params.append('taskid',taskid);
                      params.append('userid',_const.EMPUID);
                      params.append('baoxiu_type',$("#slr").find("option:selected").val());
                      params.append('baoxiu_content',_this.form.content);
                      params.append('baoxiu_title',_this.form.title);
                       params.append('baoxiu_pic',_this.imgstrs);
                      _this.$http.post(url,params).then(function ( res ){
                        console.log(res);
                      });
                 }
                
              }
          });   
        }
      });
    },
    clear () {
      this.$refs.form.clear();
      this.form = { 
         
      };
       this.pics='';
       console.log( this.pics);
    }
  }

}

</script>

<style scoped>
.mu-appbar{
position: fixed !important;
top: 0;
left: 0;
}
.selct{
  width: 100%;
  border: none;
  border-bottom:1px solid rgba(0, 0, 0, 0.13);
  outline: none;
  background: #fff;
  background-color:transparent;
  height: 30px;
  font-size: 16px;
}

</style>
