<template>
  <div class="addEntityForm">
    <h3 style="margin-left:40%;padding-top:6%">添加实体</h3>
    <a-divider />
    <a-form
            :form="addForm"
            :label-col="{ lg: {span: 10}, xl: {span: 9} }"
            :wrapper-col="{ lg: {span: 14}, xl: {span: 15} }"
            style="margin-right:16%"
    >
      <a-form-item
              label="实体值："
      >
        <a-input
                v-model="name.value"
                :maxLength="10"
                @change="handleNameChange"
        />
      </a-form-item>
      <a-form-item
              label="实体类型："
      >
        <a-input
                v-model="type.value"
                :maxLength="10"
                @change="handleTypeChange"
        />
      </a-form-item>
    </a-form>
    <a-tag
            style="cursor: pointer; border-style: solid;"
            @click="handleAdd"
            class="tag-item"
            id="addEntityButton"
    >
      <a-icon type="plus" /> 确认增加
    </a-tag>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
// import ColorPicker2 from './ColorPicker2';
import { validateEntityName,validateEntityType } from "@/utils/validator.js";


export default {
  name: "EntityList",
  data() {
    return {
      addForm: this.$form.createForm(this, { name: "addEntityForm" }),
      name: {
        value: "",
      },
      type:{
          value: "",
      },
      nameTips: "请输入1-10位实体值，与现有实体值不相同",
      typeTips: "请输入1-10位实体类型",
    };
  },
  props: ["triggerGraphDraw"],
  computed: {
    ...mapGetters([
        "colorList",
        "picId",
        "currentGraph",
        "currentGraphData",
        "nodeId",
        "currentShowGraphData",
        // "nodesTypes",
        // 'checkList',
        'boardTypes',
    ]),
  },
  methods: {
    ...mapMutations(["set_nodeId",'set_currentShowGraphData',
      'set_currentShowGraphData_typesetting',
      'set_currentGraphData','set_currentShowBoard']),
    ...mapActions(["addEntity","save"]),
    handleAdd() {
      this.name = {
        value: this.name.value,
      };
      this.type = {
        value: this.type.value,
      };
      if(this.name.value==='' || this.type.value===''){
        this.$message.error('请完善实体信息')
        return ;
      }
      else{
        if(this.name.value.length>=10 || this.type.value>=10){
          this.$message.error('实体值和实体类型长度不能超过10');
          return ;
        }
      }
      //判断是否重复
      let tempNodes=this.currentGraph.save().nodes
      console.log('看看我的nodes',tempNodes)
      for(let i=0;i<tempNodes.length;i++){
        if(tempNodes[i].id===`node-${this.name.value}`){
          this.$message.error('不能添加相同实体值的实体')
          return ;
        }
      }
      let model = {
        id:  `node-${this.name.value}`,
        label: this.name.value,
        oriLabel: this.name.value,
        class: this.type.value,
        address: 'cq',
        size:25,
        x: 200+Math.random()*100,
        y: 150+Math.random()*100,
        style:{
          fill:'#E65D6E',
          stroke: '#D99CA8',
          lineWidth: 1,
        },
        labelCfg:{
          position: 'bottom',
          offset: 5,
          style: {
            fill: '#191b1c',
            fontSize: 12,
            stroke: '#191b1c',
            lineWidth: 0.1,
          },
        },
        stateStyles:{
          selected: {
            shadowColor: '#E65D6E',
            lineWidth: 0,
            fill: '#E65D6E',
            shadowBlur: 15,
          },
          highlight: {
            fill: 'rgb(223, 234, 255)',
            stroke:'#ff0',
            lineWidth: 2,
          },
        }
      };
      console.log('myModel',model)
      this.currentGraph.addItem('node',model)
      let temp=this.currentGraph.save()
      console.log('让我看看有什么数据',temp)
      this.set_currentShowGraphData_typesetting(temp)
      this.set_currentGraphData(temp)
      this.save()
      console.log('添加完后的Data',this.currentGraphData)
      this.set_nodeId();
      console.log('after update',this.currentGraphData)
      //类型筛选相关
      // if(this.nodesTypes.indexOf(this.type.value)===-1){
      //   this.nodesTypes.push(this.type.value);
      // }
      // console.log('4444 新增节点有新类型 this.nodesTypes',this.nodesTypes);
      // this.checkList.push(true);

      this.name.value = "";
      this.type.value= "";
      this.set_currentShowBoard(this.boardTypes.none)

    },
    handleNameChange() {
      this.name = {
        value: this.name.value,
      };
    },
    handleTypeChange() {
      this.type = {
        value: this.type.value,
      };
    },
    onClose() {
      this.set_addEntityVisible(false)
    },
  },
  components: {
  },
};
</script>

<style scoped>
@media screen and (max-width: 992px) {
    .ant-row{
        margin-left: 12%;
    }
}
.tag-item {
  line-height: 28px;
  cursor: pointer;
  margin-left: 40%;
  margin-top: 160px;
}

</style>
