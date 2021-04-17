<template>
  <div>
    <h3 style="margin-left:40%;padding-top:6%">添加关系</h3>
    <a-divider />
    <a-form
      :form="addRelationForm"
      :label-col="{ lg: {span: 10}, xl: {span: 9} }"
      :wrapper-col="{ lg: {span: 14}, xl: {span: 15} }"
      style="margin-right:10%"
    >
      <a-form-item label="定义域" has-feedback>
        <a-select
                v-decorator="[
                'selectSourceNode',
              ]"
                placeholder="请选择实体"
                style="width: 85%;"
                @change="handleSelectChange1"
        >
          <a-select-option
                  v-for="(node, index) in this.labelList"
                  :key="index"
          >
            {{ node }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="值域" has-feedback>
        <a-select
                v-decorator="[
                'selectTargetNode',
              ]"
                placeholder="请选择实体"
                style="width: 85%;"
                @change="handleSelectChange2"
        >
          <a-select-option
                  v-for="(node, index) in this.labelList"
                  :key="index"
          >
            {{ node }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="关系值">
        <a-input
                v-decorator="[
                'relationValue',
              ]"
                placeholder="请输入关系值"
                style="width: 85%;"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="关系类型">
        <a-input
          v-decorator="[
                'relationType',
              ]"
          placeholder="请输入关系类型"
          style="width: 85%;"
        >
        </a-input>
      </a-form-item>
      <a-tag
              style="cursor: pointer; border-style: solid;"
              @click="confirmAddRelation"
              class="tag-item"
              id="addEntityButton"
      >
        <a-icon type="plus" /> 确认增加
      </a-tag>
    </a-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { message } from "ant-design-vue";
import G6 from "@antv/g6";

export default {
  name: "RelationList",
  data() {
    return {
      addRelationForm: this.$form.createForm(this, { name: "addRelationForm" }),
      height: (window.screen.height * 0.8 + 5) + 'px',
      relationValueTips:'请输入关系值',
    };
  },
  props: ["triggerGraphDraw"],
  computed: {
    ...mapGetters([
      "showGraphNodes",
      "relationTypeSet",
      "picId",
      "showGraphEdges",
      "addRelationVisible",
      "currentGraph",
      "currentGraphData",
      "labelList",
      "relationId",
      "currentShowGraphData",
      'boardTypes',
    ]),
  },
  mounted() {
    console.log('我的选择列表呢',this.labelList)
  },
  methods: {
    ...mapActions(["addRelation","save"]),
    ...mapMutations(["add_showGraphEdges", "set_addRelationVisible","set_relationId",'set_currentShowGraphData',
      'set_currentShowGraphData_typesetting',
      'set_currentGraphData','set_currentShowBoard']),
    async confirmAddRelation() {
      var that=this
      console.log(this.addRelationForm.getFieldValue('relationValue'))
      let newData = {
        node1: this.labelList[that.addRelationForm.getFieldValue('selectSourceNode')],
        node2: this.labelList[that.addRelationForm.getFieldValue('selectTargetNode')],
        name: that.addRelationForm.getFieldValue('relationValue'),
        relationType:that.addRelationForm.getFieldValue('relationType'),
        color: "#000",
      };
      console.log('newData',newData)
      if (newData.node1 ==='' || newData.node2 ==='' || newData.name ==='' || newData.relationType==='') {
        message.error("增加关系失败，任一字段不能为空");
        return;
      }
      for (let i = 0; i < this.showGraphEdges.length; i++) {
        if (
          this.showGraphEdges[i].node1 === newData.node1 &&
          this.showGraphEdges[i].node2 === newData.node2 &&
          this.showGraphEdges[i].name === newData.name &&
          this.showGraphEdges[i].type === newData.type
        ) {
          message.error("增加关系失败，该关系已存在");
          return;
        }
      }
      this.set_addRelationVisible(false);
      this.addRelationForm.resetFields();
      let tempSource=''
      let tempTarget=''
      console.log(this.currentGraphData)
      for(let i=0;i<this.currentGraphData.nodes.length;i++){
        if(newData.node1===this.currentGraphData.nodes[i].label){
          tempSource=this.currentGraphData.nodes[i].id
        }
        if(newData.node2===this.currentGraphData.nodes[i].label){
          tempTarget=this.currentGraphData.nodes[i].id
        }
      }
      console.log('model的edge',this.currentGraphData)
      let model={
        id:  `relation-${this.relationId}`,
        class: newData.relationType,
        label: newData.name,
        oriLabel: newData.name,
        type: 'quadratic',
        source: tempSource,
        target: tempTarget,
        style:{
          stroke: '#D99CA8',
          cursor: 'pointer',
          fillOpacity: 1,
          endArrow: {
            path: G6.Arrow.triangle(),
            fill: "#D99CA8"
          },
        },
        selected: {
          shadowColor: "#D99CA8",
          fill: "#D99CA8",
          shadowBlur: 5,
          stroke: "#D99CA8"
        },
        noneLabel: {
          fill: '#fff',
          stroke: '#fff'
        },
        highlight:{
          fill: 'rgb(223, 234, 255)',
          stroke:'#ff0',
          lineWidth: 2,
        }
      }
      console.log('relationModel',model)
      this.currentGraph.addItem('edge',model)
      this.currentGraph.refresh()
      let temp=this.currentGraph.save()
      this.set_currentShowGraphData_typesetting(temp)
      this.set_currentGraphData(temp)
      this.set_relationId();
      this.set_currentShowBoard(this.boardTypes.none)
      this.save()
    },
    onClose() {
      this.set_addRelationVisible(false);
    },
    handleSelectChange1(value){

    },
    handleSelectChange2(value){

    }
  },
};
</script>

<style scoped>
@media screen and (max-width: 992px) {
    .ant-row{
        margin-left: 16%;
    }
}
.tag-item {
  line-height: 28px;
  cursor: pointer;
  margin-left: 44%;
  margin-top: 160px;
}
</style>
