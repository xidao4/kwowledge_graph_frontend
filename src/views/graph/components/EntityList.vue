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
              :validate-status="name.validateStatus"
              :help="name.errorMsg || nameTips"
              
      >
        <a-input
                v-model="name.value"
                :maxLength="10"
                @change="handleNameChange"
                
        />
      </a-form-item>
      <a-form-item
              label="实体类型："
              :validate-status="type.validateStatus"
              :help="type.errorMsg || typeTips"
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
        "showGraphNodes",
        "picId",
        "addEntityVisible",
        "currentGraph",
        "currentGraphData",
        "nodeId",
        "currentShowGraphData",
        "nodesTypes",
        'checkList',
        'boardTypes',
    ]),
  },
  methods: {
    ...mapMutations(["add_showGraphNodes","set_addEntityVisible","set_nodeId",'set_currentShowGraphData',
      'set_currentShowGraphData_typesetting',
      'set_currentGraphData','set_currentShowBoard']),
    ...mapActions(["addEntity"]),
    handleAdd() {
      this.name = {
        ...validateEntityName(this.name.value, null, this.showGraphNodes),
        value: this.name.value,
      };
      this.type = {
        ...validateEntityType(this.type.value),
        value: this.type.value,
      };



      if (this.name.errorMsg === null && this.type.errorMsg === null) {

        let model = {
          id:  `node-${this.nodeId}`,
          label: this.name.value,
          oriLabel: this.name.value,
          address: 'cq',
          x: 200+Math.random()*100,
          y: 150+Math.random()*100,
          style:{
            fill:'#E65D6E'
          }
        };
        console.log('myModel',model)
        this.currentGraph.addItem('node',model)
        this.currentGraph.refresh()
        this.currentGraphData.nodes.push({
          id:  `node-${this.nodeId}`,
          class: this.type.value,
          label: this.name.value,
          oriLabel: this.name.value,
        })
        let temp=this.currentGraph.save()
        this.set_currentShowGraphData_typesetting(temp)
        this.set_currentGraphData(temp)
        console.log('添加完后的Data',this.currentGraphData)
        this.set_nodeId();
        console.log('after update',this.currentGraphData)
        this.set_addEntityVisible(false)
        //类型筛选相关
        if(this.nodesTypes.indexOf(this.type.value)===-1){
          this.nodesTypes.push(this.type.value);
        }
        console.log('4444 新增节点有新类型 this.nodesTypes',this.nodesTypes);
        this.checkList.push(true);

        this.name.value = "";
        this.type.value= "";
        this.set_currentShowBoard(this.boardTypes.none)
      }
    },
    handleNameChange() {
      this.name = {
        ...validateEntityName(this.name.value, null, this.showGraphNodes),
        value: this.name.value,
      };
    },
    handleTypeChange() {
      this.type = {
        ...validateEntityType(this.type.value),
        value: this.type.value,
      };
    },
    onClose() {
      this.set_addEntityVisible(false)
    },
  },
  components: {
    // ColorPicker2
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
