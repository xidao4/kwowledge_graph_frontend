<template>
  <div class="editEntity">
    <h3 style="margin-left:39%;padding-top:2%;padding-bottom:1%;">编辑实体</h3>
    <a-divider />
<!--    <span class="spanItem">自定义图元</span>-->
<!--    <a-divider />-->
<!--    <a-upload-->
<!--      name="mFile"-->
<!--      :multiple="false"-->
<!--      :headers="headers"-->
<!--      action="http://118.182.96.49:8001/api/graph/picElement"-->
<!--      :customRequest="uploadImage"-->
<!--      list-type="picture-card"-->
<!--      :file-list="fileList"-->
<!--      @change="handleChange"-->
<!--      style="margin-left: 5%;margin-top: 3%"-->
<!--    >-->
<!--      <div v-if="fileList.length < 1">-->
<!--        <a-icon type="plus" />-->
<!--        <div class="ant-upload-text">-->
<!--          Upload-->
<!--        </div>-->
<!--      </div>-->
<!--    </a-upload>-->
<!--    <a-modal :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">-->
<!--      <img alt="example" style="width: 100%" :src="previewImage" />-->
<!--    </a-modal>-->
<!--    <div style="float:right;margin-top: 3%;margin-right: 0%;width:50%">-->
<!--      <div style="margin-top:3%">-->
<!--        <span>图元名称：</span>-->
<!--        <a-input v-model="entityName" style="width: 40%"></a-input>-->
<!--      </div>-->
<!--      <div style="margin-top:6%;margin-right: -20%">-->
<!--        <a-button @click="handleAddPicElement">添加图元</a-button>-->
<!--      </div>-->
<!--    </div>-->
<!--    <a-divider />-->
    <span class="spanItem">实体</span>
    <a-divider />
    <a-form
            :form="editEntityForm1"
            :label-col="{ lg: {span: 10}, xl: {span: 9} }"
            :wrapper-col="{ lg: {span: 14}, xl: {span: 15} }"
            style="margin-right:24%;margin-top:2%"
    >
      <a-form-item label="大小：">
        <a-select
          v-model="this.size"
          @change="handleSelectChangeSize"
        >
          <a-select-option value="big">
            大
          </a-select-option>
          <a-select-option value="medium">
          中
          </a-select-option>
          <a-select-option value="small">
          小
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="形状：">
        <a-select
            @change="handleSelectChangeShape"
            v-model="this.shape"
        >
            <a-select-option  v-for="item in this.customizeElement" :key="item.key" :value="item.value">
            {{item.key}}
            </a-select-option>  
        </a-select>
      </a-form-item>
<!--      <div @click="colorInputClick1"> -->
<!--      <a-form-item label="边框色:">-->
<!--&lt;!&ndash;        <a-input&ndash;&gt;-->
<!--&lt;!&ndash;            :value="colors1"&ndash;&gt;-->
<!--&lt;!&ndash;            disabled&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--        <div class="colorBlock" :style="'background-color: ' + colors1">-->
<!--        </div>-->
<!--      </a-form-item>-->
<!--      </div>-->
      <div v-show="isShowColors1" class="color-select-layer"> 
        <sketch-picker :value="colors1" @input="colorValueChange1"></sketch-picker>
      </div> 
      <div @click="colorInputClick2"> 
      <a-form-item label="填充色:">
<!--        <a-input-->
<!--            :value="colors2"-->
<!--            disabled-->
<!--        />-->
        <div class="colorBlock" :style="'background-color: ' + colors2+';border: 1px solid #ffe5e5'">
        </div>
      </a-form-item>
      </div>
    </a-form>
    <div v-show="isShowColors2" class="color-select-layer"> 
        <sketch-picker :value="colors2" @input="colorValueChange2"></sketch-picker>
    </div> 

    <a-divider />
    <span class="spanItem">文本</span>
    <a-divider />

    <a-form
        :form="editEntityForm2"
        :label-col="{ lg: {span: 10}, xl: {span: 9} }"
        :wrapper-col="{ lg: {span: 14}, xl: {span: 15} }"
        style="margin-right:24%;margin-top:2%"
    >
      <a-form-item label="大小：">
        <a-input
          v-model="myFontSize"
        />
      </a-form-item>
        <a-form-item label="实体值：">
          <a-input
            v-model="content"
          />
        </a-form-item>
        <a-form-item label="实体类型：">
          <a-input
            v-model="entityType"
          />
        </a-form-item>
<!--        <a-form-item label="大小：">-->
<!--            <a-input-->
<!--                v-decorator="['size', { rules: [{ required: false, message: '请输入字体大小!' }] }]"-->
<!--                :maxLength="2"-->
<!--                suffix="px"-->
<!--            />-->
<!--        </a-form-item>-->
    </a-form>

    <div class="tagList">
        <a-tag
                style="cursor: pointer; border-style: solid;"
                @click="handleChangeEntity"
                class="tag-item"
        >
        确认修改
        </a-tag>
        <a-tag
                style="cursor: pointer; border-style: solid;"
                @click="handleDeleteEntity"
                class="tag-item"
        >
        删除
        </a-tag>
    </div>
  </div>
</template>


<script>
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import {Sketch} from 'vue-color'
  import { getToken } from '@/utils/auth'
  import axios from "axios";
export default {
  name: "EditEntity",
  components: {
      'sketch-picker': Sketch
  },
  data(){
      return{
          colors1: '#333333',
          colors2: '#E65D6E',
          // colors2:  this.currentItem._cfg.styles.active.fill,
          isShowColors1: false,
          isShowColors2: false,
          editEntityForm1: this.$form.createForm(this, { name: "editEntityForm1" }),
          editEntityForm2: this.$form.createForm(this, { name: "editEntityForm2" }),
          visible: false,
          fileList:[],
          cropShape: '',
          entityName: '',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "authorization": 'authorization-text',
            "token": getToken()
          },
          previewVisible: false,
          previewImage: '',
          customizeImgUrl: '',
          size:'',
          shape:'',
          myFontSize: '',
          content: '',
          entityType: '',
          defaultShape: '',
      }
  },
  computed: {
    ...mapGetters([
      "picId",
      "userId",
      "currentGraph",
      "currentGraphData",
      "currentItem",
      'boardTypes',
      'customizeElement',
      'nodesTypes',
      'checkList',
    ]),
  },
  mounted() {
    console.log('看看mounted时是否取到picId',this.picId)
    console.log('看看mounted时的customizeElement',this.customizeElement)
    this.getPicCustomizeElements({
      picId:this.picId}
      )
    if(this.currentItem._cfg.currentShape==='rect'){
      if(this.currentItem._cfg.model.size[0]===30){this.size='small'}
      else if(this.currentItem._cfg.model.size[0]===40){this.size='medium'}
      else if(this.currentItem._cfg.model.size[0]===60){this.size='big'}
    }
    else if(this.currentItem._cfg.currentShape==='circle'){
      if(this.currentItem._cfg.model.size===25){this.size='small'}
      else if(this.currentItem._cfg.model.size===40){this.size='medium'}
      else if(this.currentItem._cfg.model.size===60){this.size='big'}
    }
    else if(this.currentItem._cfg.currentShape==='ellipse'){
      if(this.currentItem._cfg.model.size[0]===50){this.size='small'}
      else if(this.currentItem._cfg.model.size[0]===60){this.size='medium'}
      else if(this.currentItem._cfg.model.size[0]===80){this.size='big'}
    }
    else if(this.currentItem._cfg.currentShape==='diamond'){
      if(this.currentItem._cfg.model.size[0]===50){this.size='small'}
      else if(this.currentItem._cfg.model.size[0]===80){this.size='medium'}
      else if(this.currentItem._cfg.model.size[0]===90){this.size='big'}
    }
    console.log('看看传进来的参数',this.currentItem)
    console.log(this.currentItem._cfg.styles.active.fill)
    console.log('看看mounted时能不能拿到data里面的数据',this.colors2)
    this.colors2=this.currentItem._cfg.styles.selected.fill
    this.myFontSize=this.currentItem._cfg.model.labelCfg.style.fontSize
    this.content=this.currentItem._cfg.model.oriLabel
    this.entityType=this.currentItem._cfg.model.class
    this.shape=this.currentItem._cfg.currentShape
  },
  watch:{
    currentItem:{
      immediate:true,
      handler(){
        if(this.currentItem._cfg.currentShape==='rect'){
          if(this.currentItem._cfg.model.size[0]===30){this.size='small'}
          else if(this.currentItem._cfg.model.size[0]===40){this.size='medium'}
          else if(this.currentItem._cfg.model.size[0]===60){this.size='big'}
        }
        else if(this.currentItem._cfg.currentShape==='circle'){
          if(this.currentItem._cfg.model.size===25){this.size='small'}
          else if(this.currentItem._cfg.model.size===40){this.size='medium'}
          else if(this.currentItem._cfg.model.size===60){this.size='big'}
        }
        else if(this.currentItem._cfg.currentShape==='ellipse'){
          if(this.currentItem._cfg.model.size[0]===50){this.size='small'}
          else if(this.currentItem._cfg.model.size[0]===60){this.size='medium'}
          else if(this.currentItem._cfg.model.size[0]===80){this.size='big'}
        }
        else if(this.currentItem._cfg.currentShape==='diamond'){
          if(this.currentItem._cfg.model.size[0]===50){this.size='small'}
          else if(this.currentItem._cfg.model.size[0]===80){this.size='medium'}
          else if(this.currentItem._cfg.model.size[0]===90){this.size='big'}
        }
        console.log('看看传进来的参数',this.currentItem)
        this.colors2=this.currentItem._cfg.styles.selected.fill
        this.myFontSize=this.currentItem._cfg.model.labelCfg.style.fontSize
        this.content=this.currentItem._cfg.model.oriLabel
        this.entityType=this.currentItem._cfg.model.class
        this.shape=this.currentItem._cfg.currentShape
        console.log('为啥不变呢',this.defaultShape)
      }
    }
  },
  methods:{
    ...mapMutations([
      'set_currentShowGraphData',
      'set_currentShowGraphData_typesetting',
      'set_currentGraphData',
      'set_currentShowBoard',
    ]),
    ...mapActions([
      'bindUrlToPic',
      'getPicCustomizeElements',
      "save"
    ]),
    handleSelectChangeShape(value) {
      this.shape=value
    },
    handleSelectChangeSize(value){
      this.size=value
      console.log('我选择了：',this.size)
    },
    // 颜色输入框点击事件处理
    colorInputClick1 () {
        this.isShowColors3=false
        this.isShowColors2=false
        this.isShowColors1 = !this.isShowColors1
        console.log(this.isShowColors1)
    },
    // 颜色值改变事件处理
    colorValueChange1 (val) {
        console.log(val)
        // 取颜色对象的十六进制值
        this.colors1 = val.hex
        console.log('after select:',this.colors1)
    },
    colorInputClick2 () {
        this.isShowColors1=false
        this.isShowColors3=false
        this.isShowColors2 = !this.isShowColors2
        console.log(this.isShowColors2)
    },
    colorValueChange2 (val) {
        console.log(val)
        // 取颜色对象的十六进制值
        this.colors2 = val.hex
        console.log('after select:',this.colors2)
    },
    handleChangeEntity(){
        console.log('看看click时的customizeElement',this.customizeElement)
        let that=this
        let data={
            lineWidth: that.size,
            type: that.shape,
            entityType: that.entityType,
            stroke: that.colors1,
            fill1: that.colors2,
            fontSize: that.myFontSize,
            label: that.content,
        }
        if(data.lineWidth===''){
          this.$message.error('实体大小必填！')
          return;
        }
        console.log('看看能不能活的数据',data)
        let tempSize='';
        if(data.type==='circle'){
          if(data.lineWidth==='big'){tempSize=60}
          else if(data.lineWidth==='medium'){tempSize=40}
          else if(data.lineWidth==='small'){tempSize=25}
        }
        else if(data.type==='rect'){
          if(data.lineWidth==='big'){tempSize=[60,60]}
          else if(data.lineWidth==='medium'){tempSize=[40,40]}
          else if(data.lineWidth==='small'){tempSize=[30,30]}
        }
        else if(data.type==='ellipse'){
          if(data.lineWidth==='big'){tempSize=[80,70]}
          else if(data.lineWidth==='medium'){tempSize=[60,40]}
          else if(data.lineWidth==='small'){tempSize=[50,30]}
        }
        else if(data.type==='diamond'){
          if(data.lineWidth==='big'){tempSize=[90,70]}
          else if(data.lineWidth==='medium'){tempSize=[80,60]}
          else if(data.lineWidth==='small'){tempSize=[50,30]}
        }
        else{
          if(data.lineWidth==='big'){tempSize=60}
          else if(data.lineWidth==='medium'){tempSize=40}
          else if(data.lineWidth==='small'){tempSize=30}
        }
        this.currentGraph.clearItemStates(this.currentItem,'selected')
        let cfg={
          type: data.type,
          label: data.label,
          oriLabel:data.label,
          class: data.entityType,
          size: tempSize,
          style:{
            fill: data.fill1,
            stroke: data.fill1,
            lineWidth: 1
          },
          labelCfg: {
            style: {
              fontSize: data.fontSize
            },
          },
          stateStyles:{
            selected: {
              shadowColor: data.fill1,
              lineWidth: 0,
              fill: data.fill1,
              stroke: data.stroke,
              shadowBlur: 15,
            },
            highlight: {
              fill: 'rgb(223, 234, 255)',
              // stroke: '#4572d9',
              stroke:'#ff0',
              lineWidth: 2,
              // text-shape: {
              //     fontWeight: 500
              // }
            },
          }
        }
        if(data.type.length>9){
          cfg.img=data.type
          cfg.type='image'
          // delete cfg.style
          // delete cfg.stateStyles
        }
        this.currentGraph.updateItem(this.currentItem,cfg)
        this.currentGraph.setItemState(this.currentItem,'selected',true)
        let temp=this.currentGraph.save()
        this.set_currentShowGraphData_typesetting(temp)
        this.set_currentGraphData(temp)
        this.set_currentShowBoard(this.boardTypes.none)
        this.save()

        //类型筛选相关
        if(this.nodesTypes.indexOf(data.entityType)===-1){
          this.nodesTypes.push(data.entityType);
        }
        console.log('4444 新增节点有新类型 this.nodesTypes',this.nodesTypes);
        this.checkList.push(true);
    },
    handleDeleteEntity(){
      //假设实体值已经传过来
      this.currentGraph.removeItem(this.currentItem)
      let temp=this.currentGraph.save()
      this.set_currentShowGraphData_typesetting(temp)
      this.set_currentGraphData(temp)
      this.set_currentShowBoard(this.boardTypes.none)
      this.save()
    },
    showModal(){
        this.visible=true
    },
    handleOk(){
        this.visible=false
    },
    handleCancel(){
        this.visible=false
    },
    // handleChange(info) {
    //   console.log(info)
    //   let fileList = [...info.fileList];
    //   if (info.file.status === 'done') {
    //     if(info.file.response.code >= 0){
    //       let resData = info.file.response.data;
    //       console.log('upload res', resData);
    //     } else {
    //       this.$message.error(`图片上传失败.`);
    //     }
    //   } else if (info.file.status === 'error') {
    //     this.$message.error(`图片上传失败.`);
    //   }
    // },
    handleChangeShape(value){
      this.cropShape=value
    },
    async handleAddPicElement(){
      this.fileList=[]
      let data={
        picId:this.picId,
        customizeImgUrl:this.customizeImgUrl,
        customizeEntityName: this.entityName
      }
      console.log('customizeEntityName:',this.entityName)
      console.log('绑定的data',data)
      console.log('前')
      await this.bindUrlToPic(data)
      console.log('后')
      await this.getPicCustomizeElements({
        picId: this.picId
      })
      this.entityName=''
    },
    uploadImage(file) {
      console.log('调用上传图片')
      let formData = new FormData()
      formData.append('mFile', file.file)
      console.log('myFormData',formData.get('mFile'))
      let that=this
      let config = {
        headers: that.headers
      }
      console.log('超长picId',this.picId)
      console.log('userId很长？',this.userId)
      axios.post(`http://118.182.96.49:8001/api/graph/uploadCustomizeImg/${this.picId}/0/0`,formData,config)
        .then(response => {
        // handle success
        console.log('success!!',response.data.data)
        this.customizeImgUrl=response.data.data
        if(this.customizeImgUrl!=='') {
          console.log('强行改变状态')
          this.fileList[0].status = 'done'
        }
      }).catch(error => {
        // handle error
        this.$message.error(`图片上传失败.`);
      }).then(() => {
        // always executed
      });
    },
    handlePreviewCancel(){
      this.previewVisible = false;
    },
    async handlePreview(file) {
      console.log('图片url',file)
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      console.log('上传图片状态改变')
      this.fileList = fileList;
      console.log(this.fileList)
    },
  }
};
</script>

<style scoped>
.editEntity{
  overflow-y:scroll  /*只是y方向*/
}
.spanItem{
    margin-left: 5%;
    z-index: 0;

}
.ant-divider-horizontal{
    margin: 0px;
}
.color-select-layer {
  position: absolute;
  margin-left: 25%;
  margin-top: -7%;
  z-index:1999
}
.editRelation{
    position: relative;
}
.tagList{
    display: flex;
    justify-content: center;
    margin-top: 20%;
}
.ant-upload-picture-card-wrapper {
    zoom: 1;
    display: inline-block;
    width: 0;
}
.colorBlock{
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
}
.colorBlock:hover {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
}

</style>
