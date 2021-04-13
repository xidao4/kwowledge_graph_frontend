<template>
  <div class="editRelation">
    <h3 style="margin-left:39%;padding-top:2%;padding-bottom:1%;">编辑关系</h3>
    <a-divider />
    <span class="spanItem">关系</span>
    <a-divider />

    
    <a-form
            :form="editRelationForm1"
            :label-col="{ lg: {span: 10}, xl: {span: 9} }"
            :wrapper-col="{ lg: {span: 14}, xl: {span: 15} }"
            style="margin-right:24%;margin-top:2%"
    >
      <a-form-item label="宽度：">
        <a-input
            v-decorator="['lineWidth', { rules: [{ required: false, message: '请输入宽度!' }] }]"
            :maxLength="2"
            suffix="px"
        />
      </a-form-item>
      <a-form-item label="形状：">
        <a-select
            v-decorator="[
            'shape',
            { rules: [{ required: false, message: '请选择关系的形状!' }] },
            ]"
            @change="handleSelectChangeShape"
        >
            <a-select-option value="line">
            直线
            </a-select-option>
            <a-select-option value="arc">
            曲线
            </a-select-option>
            <a-select-option value="polyline">
            折线
            </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="虚实">
        <a-select
            v-decorator="[
            'virtual',
            { rules: [{ required: false, message: '请选择关系的虚实!' }] },
            ]"
            @change="handleSelectChangeVirtual"
        >
            <a-select-option value="solid">
            实线
            </a-select-option>
            <a-select-option value="dashed">
            虚线
            </a-select-option>
        </a-select>
      </a-form-item>
      <div @click="colorInputClick1"> 
      <a-form-item label="颜色:">
        <a-input
            :value="colors1"
            disabled
        />
      </a-form-item>
      </div>
    </a-form>
    <div v-show="isShowColors1" class="color-select-layer"> 
        <sketch-picker :value="colors1" @input="colorValueChange1"></sketch-picker>
    </div> 

    <a-divider />
    <span class="spanItem">文本</span>
    <a-divider />

    <a-form
        :form="editRelationForm2"
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
        <div @click="colorInputClick2"> 
        <a-form-item label="颜色:">
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

    <div class="tagList">
        <a-tag
                style="cursor: pointer; border-style: solid;"
                @click="handleChangeRelation"
                class="tag-item"
        >
        确认修改
        </a-tag>
        <a-tag
                style="cursor: pointer; border-style: solid;"
                @click="handleDeleteRelation"
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
  name: "EditRelation",
  components: {
      'sketch-picker': Sketch
  },
  data(){
      return{
          colors1: '#333333',
          colors2: '#ffffff',
          isShowColors1: false,
          isShowColors2: false,
          editRelationForm1: this.$form.createForm(this, { name: "editRelationForm1" }),
          editRelationForm2: this.$form.createForm(this, { name: "editRelationForm2" }),
      }
  },
  methods:{
    ...mapMutations([
    ]),
    handleSelectChangeShape(value) {
      console.log(value);
    },
    handleSelectChangeVirtual(value) {
      console.log(value);
    },
    // 颜色输入框点击事件处理
    colorInputClick1 () {
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
        this.isShowColors2 = !this.isShowColors2
        console.log(this.isShowColors2)
    },
    colorValueChange2 (val) {
        console.log(val)
        // 取颜色对象的十六进制值
        this.colors2 = val.hex
        console.log('after select:',this.colors2)
    },
    handleChangeRelation(){
        var that=this
        console.log(this.editRelationForm1.getFieldValue('virtual'))
        let data={
            lineWidth: that.editRelationForm1.getFieldValue('lineWidth'),
            type: that.editRelationForm1.getFieldValue('shape'),
            lineDash: that.editRelationForm1.getFieldValue('virtual')==='dashed'?[5,15]:0,
            stroke: that.colors1,
            fontSize: that.editRelationForm2.getFieldValue('size'),
            fill: that.colors2
        }
        console.log(data)
    },
    handleDeleteRelation(){

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
  margin-left: 28%;
  margin-top: -7%;
  z-index:1
}
.editRelation{
    position: relative;
}
.tagList{
    display: flex;
    justify-content: center;
    margin-top: 26%;
}
</style>
