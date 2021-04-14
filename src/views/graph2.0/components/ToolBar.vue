<template>
  <div class="toolBar-box">
    <div class="left-toolbar" v-show="!showModal">
      <a-button type="primary" size="small" @click="handleAddEntity" class="toolItem">
        <a-icon type="plus" />增加节点
      </a-button>

      <a-button size="small" type="primary" @click="confirmAddRelation" class="margin-left">
        <a-icon type="plus" />增加关系
      </a-button>

      <a-button size="small"
                type="primary"
                @click="showPieModal"
                class="margin-left">
        统计
      </a-button>

      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{labelTip}}</span>
        </template>
        <a-switch class="margin-left"
                  :checked="showLabelBool"
                  @change="changeLabelShow">
          <a-icon slot="checkedChildren" type="eye" />
          <a-icon slot="unCheckedChildren" type="eye-invisible" />
        </a-switch>
      </a-tooltip>

      <Scale class="margin-left"></Scale>
    </div>
    <Search width="300px" v-show="!showModal"></Search>

    <div class="left-toolbar-s" v-show="showModal">
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>增加实体</span>
        </template>
        <a-button type="link" @click="handleAddEntity" style="padding: 0 5px;">
          <a-icon type="plus-circle" />
        </a-button>
      </a-tooltip>

      <a-tooltip placement="bottom">
        <template slot="title">
          <span>增加关系</span>
        </template>
        <a-button type="link" @click="confirmAddRelation" style="padding: 0 5px;">
          <a-icon type="plus" />
        </a-button>
      </a-tooltip>

      <a-tooltip placement="bottom">
        <template slot="title">
          <span>统计</span>
        </template>
        <a-button type="link"
                  @click="showPieModal"
                  style="font-size: 20px; padding: 0 5px;">
          <a-icon v-if="currentShowBoard === boardTypes.pie" type="pie-chart" style="color: #D99CA8;"/>
          <a-icon v-else type="pie-chart" style="color: #aaaaaa;"/>
        </a-button>
      </a-tooltip>

      <a-tooltip placement="bottom">
        <template slot="title">
          <span>关系标签</span>
        </template>
        <a-button type="link"
                  style="font-size: 20px; padding: 0 5px;"
                  @click="changeLabelShow">
          <a-icon v-if="showLabelBool" type="eye" style="color: #D99CA8;"/>
          <a-icon v-else type="eye-invisible" style="color: #aaaaaa;"/>
        </a-button>
      </a-tooltip>

      <Scale type="link"></Scale>
    </div>
    <Search width="150px" v-show="showModal"></Search>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import Scale from './Scale'
import Search from "./Search";
import { formatText } from '../../../components/g6/Graph';
export default {
  name: "ToolBar",
  components: {
      Scale,
      Search,
  },
  data(){
    return{
      showModal: false,
      labelTip: '显示关系名',
      checked: false,
    }
  },
  computed: {
    ...mapGetters([
      'currentGraph',
      'graphIds',
      'currentGraphId',
      'forceGraph',
      'typesettingGraph',
      'typesettingEdgeShowLabel',
      'forceShowEdgeLabel',
      'boardTypes',
      'currentShowBoard'
    ]),
    showLabelBool(){
      return this.currentGraphId === this.graphIds.force?this.forceShowEdgeLabel:this.typesettingEdgeShowLabel;
    }
  },
  mounted(){
      if(window.innerWidth < 992){
          this.showModal = true;
      } else {
          this.showModal = false;
      }
      window.addEventListener('resize', ()=>{
          if(window.innerWidth < 992){
              this.showModal = true;
          } else {
              this.showModal = false;
          }
      })
  },
  methods:{
    ...mapMutations([
      'set_addEntityVisible',
      'set_addRelationVisible',
      'set_pieModalVisible',
      'set_forceShowEdgeLabel',
      'set_typesettingEdgeShowLabel',
      'set_currentShowBoard'
    ]),
    handleAddEntity(){
      this.set_currentShowBoard(this.boardTypes.entityList);
    },
    confirmAddRelation(){
      this.set_currentShowBoard(this.boardTypes.relationList);
    },
    showPieModal(){
      this.set_currentShowBoard(this.boardTypes.pie);
    },
    changeLabelShow(){
      let value = !this.showLabelBool;
      if(value){
        this.labelTip = '隐藏关系名'
      } else {
        this.labelTip = '显示关系名'
      }
      this.showEdgeLabel(value);
    },
    showEdgeLabel(isShow){
      const edgeItems = this.currentGraph.getEdges();
      edgeItems.forEach(item => {
        let model = {
          label: '',
        };
        if(isShow){
          model = {
            label: formatText(item._cfg.model.oriLabel, 10),
          };
        }
        this.currentGraph.updateItem(item, model);
        if(this.currentGraphId === this.graphIds.typesetting){
          this.typesettingGraph.updateItem(item, model);
          this.set_typesettingEdgeShowLabel(isShow);
        } else if(this.currentGraphId === this.graphIds.force){
          this.forceGraph.updateItem(item, model);
          this.set_forceShowEdgeLabel(isShow);
        }
      });
    },
    handleShowLabelChange(checked) {
      console.log('choose==================', checked);
    },
  },
};
</script>

<style scoped>
.toolBar-box{
  width: 100%;
  background-color: white;
  box-shadow:0 0 4px #7f7f7f;
  padding: 15px;
  display: inline-flex;
  justify-content: space-between;
}
.toolBar {
  width: 100%;
  background-color: white;
  box-shadow:0 0 4px #7f7f7f;
  padding: 15px;
}
.left-toolbar{
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.left-toolbar-s{
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
.toolItem {
  margin-left: 10px;
}
.margin-left{
  margin-left: 20px;
}
.margin-right{
    float:right;
    margin-right:10px;
    text-align: right;
    display: inline-block;
}
.margin-left-s{
  margin-left: 7px;
}
.align-center{
  display: inline-flex;
  align-items: center;
}
</style>
