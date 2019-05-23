<template>
  <div>
   <div class="hello"  style="color:#000">
    <div class="upload">
      <div style="padding-left: 10px">
        <div class="upload_warp_left" @click="fileClick"  style='font-size: 28px'>
            <!-- <button  class="btn btn-success"  >上传图片</button> -->
            <van-icon name="photograph" style='font-size: 28px' />
        </div>
        <div class="upload_warp_text">
            共{{imgList.length}}张,至少上传三张<!-- ;最多上传<span class="text-primary"> 6</span> 张图片！ -->
        </div>
      </div>
      <div class="upload_warp" style="border: 1px solid white;">
           <div class="upload_warp_img" v-show="imgList.length!=0" >
               <div class="upload_warp_img_div" v-for="(item,index) of imgList" :key='index'>
                  <div class="upload_warp_img_div_top"  @click="fileDel(index)">
                      <div  >
                          <!-- {{item.file.name}} --> <i class="fa fa-window-close" ></i>
                      </div>
                      <img class="upload_warp_img_div_del ">
                                         
                  </div> 
                   <img :src="item.file.src">
               </div>
           </div>
       </div> 
  <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/> 
  </div> 
      </div>
</div>
</template> 
<script>
	import $ from 'jquery'
  import { Toast } from 'vant';
 export default {

  components:{
  
  },
    data () {
    return {
            imgList: [],
            size: 0,
            url:[],
            attr:[],
            attr1:[],
            show:true,
            issubumit:false,
        }
  },
  created(){
  },
  mounted(){

   },
   methods:{
     cansle(){
      this.imgList=[];
      _const.attr=[]; 
     },

    fileClick(){
              document.getElementById('upload_file').click();             
            },
    fileChange(el){
        if (!el.target.files[0].size) return;
        let max=1024*1024;
        console.log(el.target.files[0].size/max);

        if(5<el.target.files[0].size/max){
          Toast('图片大小不超过5M');
          return;
        }
      this.fileList(el.target.files);
      let file = el.target.files[0];
      var formData = new FormData();
      formData.append("file",file);
      let _this=this;
       $.ajax({
   /*    url:_const.requestUrl+'/v1/bpmapibx/upload_photo',*/
        url:this.baseUrl+'/v1/bpmapibx/upload_photo',
        type:'POST',
        data:formData,
        cache: false,
        contentType: false,    //不可缺
        processData: false,    //不可缺
        mimeType:"multipart/form-data",
        beforeSend:function(){
           $('.demo-circular-progress').show();       
                },
        success:function(data){
          console.log(JSON.parse(data));
          if(JSON.parse(data).code==200){
            Toast('上传图片成功');
             $('.demo-circular-progress').hide(); 
             
            let re=JSON.parse(data);       
           let res=re.data.photo;  
                if(res){
                 let obj= new Object();
                   obj["src"]=res;
                   _this.attr.push(obj);
                   _this.attr1.push(res);                          
                }
              var pic_str= _this.attr1.join("|");
                _this.$emit('picattr',_this.attr);
                 _this.$emit('picstrs',pic_str);
            
          }else{
             Toast('上传图片过大');
             return;
          }              
        }
      });                                                          
    },

    fileList(files){
        for (let i = 0; i < files.length; i++) {
            this.fileAdd(files[i]);
        }
    },
    fileAdd(file){
        this.size = this.size + file.size;//总大小
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
            file.src = this.result;
            this.vue.imgList.push({
                file
            });
        }
    },
    fileDel(index){      // 删除
    /*  alert(index)*/
        this.size = this.size - this.imgList[index].file.size;//总大小
         this.imgList.splice(index, 1);
         this.attr.splice(index,1);
         this.attr1.splice(index,1);
    },

    bytesToSize(bytes){
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    },
    dragenter(el){
        el.stopPropagation();
        el.preventDefault();
    },
    dragover(el){
        el.stopPropagation();
        el.preventDefault();
    },
    drop(el){
        el.stopPropagation();
        el.preventDefault();
        this.fileList(el.dataTransfer.files);
    }
    }
 
 }
</script>
<style scoped lang="less">
.upload_warp_img_div_del {
    position: absolute;
    top: 3px;
    width: 16px;
    right: 2px;
}

.upload_warp_img_div_top {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.4);
    text-align: left;
    color: #fff;
    font-size: 12px;
    line-height: 0;
}

.upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
}

.upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
}

.upload_warp_img_div {
    position: relative; 
    height: 124px;
     width: 124px; 
    /* border: 1px dashed #eee; */
    padding: 6px; 
    margin: 6px;
   /*  float: left; */
    line-height: 100px;
    display: inline-block;
    float: left;
    text-align: center;
    background-color: #eee;
    outline: 1px dashed #999;
}

.upload_warp_img {
  /*   border-top: 1px solid #D2D2D2; */
    padding: 15px;
   overflow: hidden;
   display: flex;
    flex-wrap: wrap; 
   justify-content: space-between;
   width: 100%;

}

.upload_warp_text {
    text-align: left;
    margin-bottom: 5px;
    padding-top: 5px;
    text-indent: 14px;
    font-size: 14px;
}

.upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
   /*  border: 1px dashed #999; */
    line-height: 130px;
    color: #999;
}

.upload_warp_left button {

    margin: 3px 5px 0px 5px;
    cursor:pointer;


}

.upload_warp_left {
    float: left;

}

.upload {
    background-color: #fff;
    width:100%;
    box-shadow: 0px 1px 0px #ccc;
}

.hello {  
    text-align: center;
}
.btn{
 border: none;
 background: rgb(38, 162, 255);
 color: #fff;
 padding: 4px 4px;
 font-size: 14px;
}


</style>