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
            v-model="lineWidth"
            suffix="px"
        />
      </a-form-item>
      <a-form-item label="形状：">
        <a-select
            @change="handleSelectChangeShape"
        >
            <a-select-option value="line">
            直线
            </a-select-option>
            <a-select-option value="quadratic">
            曲线
            </a-select-option>
            <a-select-option value="polyline">
            折线
            </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="虚实">
        <a-select
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
        <div class="colorBlock" :style="'background-color: ' + colors1">
        </div>
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
            v-model="fontSize"
          />
        </a-form-item>
        <a-form-item label="关系值：">
          <a-input
            v-model="content"
          />
        </a-form-item>
        <a-form-item label="关系类型">
          <a-input
            v-model="relationType"
            placeholder="请输入关系类型"
          >
          </a-input>
        </a-form-item>
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
  import {mapActions, mapGetters, mapMutations} from 'vuex'
import {Sketch} from 'vue-color'
  import G6 from "@antv/g6";
export default {
  name: "EditRelation",
  components: {
      'sketch-picker': Sketch
  },
  computed: {
    ...mapGetters([
      "currentGraph",
      "currentGraphData",
      "currentShowGraphData",
      "currentItem",
      'boardTypes',
    ]),
  },
  mounted() {
    console.log('editRelation!')
    console.log(this.currentItem)
    this.colors1=this.currentItem._cfg.styles.selected.fill
    this.fontSize=this.currentItem._cfg.model.labelCfg.style.fontSize
    this.content=this.currentItem._cfg.model.oriLabel
    this.relationType=this.currentItem._cfg.model.class
    if(this.currentItem._cfg.model.style.lineWidth===undefined) {
      this.lineWidth = this.currentItem._cfg.model.style.active.lineWidth
    }
    else{
      this.lineWidth = this.currentItem._cfg.model.style.lineWidth
    }
  },
  watch:{
    currentItem:{
      immediate:true,
      handler(){
        this.colors1=this.currentItem._cfg.styles.selected.fill
        this.fontSize=this.currentItem._cfg.model.labelCfg.style.fontSize
        this.content=this.currentItem._cfg.model.oriLabel
        this.relationType=this.currentItem._cfg.model.class
        if(this.currentItem._cfg.model.style.lineWidth===undefined) {
          this.lineWidth = this.currentItem._cfg.model.style.active.lineWidth
        }
        else{
          this.lineWidth = this.currentItem._cfg.model.style.lineWidth
        }
      }
    }
  },
  data(){
      return{
          colors1: '#E65D6E',
          colors2: '#ffffff',
          isShowColors1: false,
          isShowColors2: false,
          editRelationForm1: this.$form.createForm(this, { name: "editRelationForm1" }),
          editRelationForm2: this.$form.createForm(this, { name: "editRelationForm2" }),
          lineWidth:'',
          shape:"",
          virtual:'',
          fontSize:'',
          content:'',
          relationType:''
      }
  },
  methods:{
    ...mapMutations([
      'set_currentShowGraphData',
      'set_currentShowGraphData_typesetting',
      'set_currentGraphData',
      'set_currentShowBoard'
    ]),
    ...mapActions([
      "save"
    ]),
    handleSelectChangeShape(value) {
      this.shape=value
    },
    handleSelectChangeVirtual(value) {
      this.virtual=value
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
        console.log('两个data差异',this.currentShowGraphData,this.currentGraphData)
        var that=this
        console.log(this.editRelationForm1.getFieldValue('virtual'))
        let data={
            lineWidth: that.lineWidth,
            type: that.shape,
            lineDash: that.virtual==='dashed'?[1,2]:0,
            stroke: that.colors1,
            fontSize: that.fontSize,
            labelContent: that.content,
            fill: that.colors2,
            relationType: that.relationType,
        }
        console.log('确保表单数据无误',data)
        console.log('之前currentItem',this.currentItem)
        this.currentGraph.clearItemStates(this.currentItem,'selected')
        this.currentGraph.updateItem(this.currentItem,{
          type: data.type,
          label: data.labelContent,
          class: data.relationType,
          style:{
            lineWidth: data.lineWidth,
            lineDash: data.lineDash,
            stroke: data.stroke,
            endArrow: {
              path: G6.Arrow.triangle(),
              fill: data.stroke
            },
          },
          // labelCfg:{
          //   fill: that.colors2,
          //   fontSize: that.editRelationForm2.getFieldValue('size'),
          // },
          labelCfg: {
            style: {
              fontSize: data.fontSize
            },
          },
          stateStyles:{
            selected: {
              shadowColor: data.stroke,
              fill: data.stroke,
              shadowBlur: 5,
              stroke: data.stroke
            },
            noneLabel: {
              fill: '#fff',
              stroke: '#fff'
            },
            highlight:{
              stroke:'#ff0',
              lineWidth: 2,
            }
          }
        })
      console.log('之后currentItem',this.currentItem)
      let temp=this.currentGraph.save()
      this.set_currentShowGraphData_typesetting(temp)
      this.set_currentGraphData(temp)
      // this.currentGraph.refreshItem(this.currentItem)
      this.set_currentShowBoard(this.boardTypes.none)
      this.save()
    },
    handleDeleteRelation(){
      //假设关系值已经传过来
      this.currentGraph.removeItem(this.currentItem)
      let temp=this.currentGraph.save()
      this.set_currentShowGraphData_typesetting(temp)
      this.set_currentGraphData(temp)
      this.set_currentShowBoard(this.boardTypes.none)
      this.save()
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
  z-index:9999
}
.editRelation{
    position: relative;
}
.tagList{
    display: flex;
    justify-content: center;
    margin-top: 26%;
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
