<template>
  <div class="toolBar">
    <a-button type="primary" size="small" @click="handleAddEntity" class="toolItem">
      <a-icon type="plus" />增加节点
    </a-button>
    <a-button size="small" type="primary" @click="confirmAddRelation" class="margin-left">
      <a-icon type="plus" />增加关系
    </a-button>
    <Scale class="margin-left"></Scale>

    <a-tooltip placement="bottom">
      <template slot="title">
        <span>{{labelTip}}</span>
      </template>
      <a-switch class="margin-left-s"
                :checked="currentGraphId === graphIds.force?forceShowEdgeLabel:typesettingEdgeShowLabel"
                @change="changeLabelShow">
        <a-icon slot="checkedChildren" type="eye" />
        <a-icon slot="unCheckedChildren" type="eye-invisible" />
      </a-switch>
    </a-tooltip>

    <a-button size="small"
              type="primary"
              @click="showPieModal"
              class="margin-left"
              v-show="!showModal">
      <a-icon type="plus" />统计
    </a-button>
    <Search class="margin-left"></Search>


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
      checked: false
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
    ])
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
      'set_typesettingEdgeShowLabel'
    ]),
    handleAddEntity(){
      this.set_addRelationVisible(false);
      this.set_addEntityVisible(true);
      this.set_pieModalVisible(false);
    },
    confirmAddRelation(){
      this.set_addEntityVisible(false);
      this.set_addRelationVisible(true);
      this.set_pieModalVisible(false);
    },
    showPieModal(){
      this.set_pieModalVisible(true);
      this.set_addEntityVisible(false);
      this.set_addRelationVisible(false);
    },
    changeLabelShow(value){
      console.log(`choose ${value}`)
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
    }
  },
};
</script>

<style scoped>
.toolBar {
  width: 100%;
  /*margin-top: 10px;*/
  height: 44px;
  /*border: 1px solid blue;*/
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow:0 0 4px #7f7f7f;
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
