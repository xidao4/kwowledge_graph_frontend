<template>
  <div class="editEntity">
    <h3 style="margin-left:39%;padding-top:2%;padding-bottom:1%;">编辑实体</h3>
    <a-button type="primary" style="float:right;margin-bottom:2%;margin-right:2%" @click="showModal">
      自定义图元
    </a-button>
    <a-modal
      title="自定义图元"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture-card"
      :file-list="fileList"
      @change="handleChange"
      >
        <div v-if="fileList.length < 1">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <div style="float:right;margin-right:20%">
        <div>
          <span>裁剪类型：</span>
          <a-select style="width: 120px" @change="handleChangeShape">
            <a-select-option value="circle">
              圆形
            </a-select-option>
            <a-select-option value="rect">
              方形
            </a-select-option>
            <a-select-option value="ellipse">
              椭圆
            </a-select-option>
          </a-select>
        </div>
        <div style="margin-top:13%">
          <span>图元名称：</span>
          <a-input :value="entityName" style="width: 120px"></a-input>
        </div>
      </div>
    </a-modal>
    <a-divider />
    <span class="spanItem">实体</span>
    <a-divider />
    <a-form
            :form="editEntityForm1"
            :label-col="{ lg: {span: 10}, xl: {span: 9} }"
            :wrapper-col="{ lg: {span: 14}, xl: {span: 15} }"
            style="margin-right:24%;margin-top:2%"
    >
      <a-form-item label="大小：">
        <a-input
            v-decorator="['size', { rules: [{ required: false, message: '请输入实体大小!' }] }]"
            :maxLength="2"
        />
      </a-form-item>
      <a-form-item label="形状：">
        <a-select
            v-decorator="[
            'shape',
            { rules: [{ required: false, message: '请选择实体的形状!' }] },
            ]"
            @change="handleSelectChangeShape"
        >
            <a-select-option  v-for="item in this.shapeList" :key="item" :value="item">
            {{item}}
            </a-select-option>  
        </a-select>
      </a-form-item>
      <div @click="colorInputClick1"> 
      <a-form-item label="边框色:">
        <a-input
            :value="colors1"
            disabled
        />
      </a-form-item>
      </div>
      <div v-show="isShowColors1" class="color-select-layer"> 
        <sketch-picker :value="colors1" @input="colorValueChange1"></sketch-picker>
      </div> 
      <div @click="colorInputClick2"> 
      <a-form-item label="填充色:">
        <a-input
            :value="colors2"
            disabled
        />
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
                v-decorator="['size', { rules: [{ required: false, message: '请输入字体大小!' }] }]"
                :maxLength="2"
                suffix="px"
            />
        </a-form-item>
        <div @click="colorInputClick3"> 
        <a-form-item label="颜色:">
            <a-input
                :value="colors3"
                disabled
            />
        </a-form-item>
        </div>
    </a-form>
    <div v-show="isShowColors3" class="color-select-layer"> 
        <sketch-picker :value="colors3" @input="colorValueChange3"></sketch-picker>
    </div> 

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

import {mapMutations} from 'vuex'
import {Sketch} from 'vue-color'
export default {
  name: "EditEntity",
  components: {
      'sketch-picker': Sketch
  },
  data(){
      return{
          shapeList:['圆形','矩形','菱形','三角形','椭圆','自定义'],
          colors1: '#333333',
          colors2: '#ffffff',
          colors3: '#000000',
          isShowColors1: false,
          isShowColors2: false,
          isShowColors3: false,
          editEntityForm1: this.$form.createForm(this, { name: "editEntityForm1" }),
          editEntityForm2: this.$form.createForm(this, { name: "editEntityForm2" }),
          visible: false,
          fileList:[],
          cropShape: '',
          entityName: ''
      }
  },
  methods:{
    ...mapMutations([
    ]),
    handleSelectChangeShape(value) {
      console.log(value);
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
    colorInputClick3 () {
        this.isShowColors1=false
        this.isShowColors2=false
        this.isShowColors3 = !this.isShowColors3
    },
    colorValueChange3 (val) {
        // 取颜色对象的十六进制值
        this.colors3 = val.hex
    },
    handleChangeEntity(){
        var that=this
        let data={
            lineWidth: that.editEntityForm1.getFieldValue('size'),
            type: that.editEntityForm1.getFieldValue('shape'),
            stroke: that.colors1,
            fill1: that.colors2,
            fontSize: that.editEntityForm2.getFieldValue('size'),
            fill2: that.colors3
        }
        console.log(data)
    },
    handleDeleteEntity(){

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
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleChangeShape(value){
      this.cropShape=value
    }
  }
};
</script>

<style scoped>
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
    margin-top: 26%;
}
.ant-upload-picture-card-wrapper {
    zoom: 1;
    display: inline-block;
    width: 0;
}
</style>
