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
                { rules: [{ required: true, message: '请至少选择一个实体!' }] },
              ]"
                placeholder="请选择实体"
                style="width: 85%;"
        >
          <a-select-option
                  :value="node.name"
                  v-for="(node, index) in showGraphNodes"
                  :key="index"
          >
            {{ node.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="值域" has-feedback>
        <a-select
                v-decorator="[
                'selectTargetNode',
                { rules: [{ required: true, message: '请至少选择一个实体!' }] },
              ]"
                placeholder="请选择实体"
                style="width: 85%;"
        >
          <a-select-option
                  :value="node.name"
                  v-for="(node, index) in showGraphNodes"
                  :key="index"
          >
            {{ node.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="关系值">
        <a-input
                v-decorator="[
                'relationValue',
                { rules: [{ required: true, message: '请输入关系值!' }] },
              ]"
                placeholder="请输入关系值"
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

export default {
  name: "RelationList",
  data() {
    return {
      addRelationForm: this.$form.createForm(this, { name: "addRelationForm" }),
      height: (window.screen.height * 0.8 + 5) + 'px',
      relationValueTips:'请输入关系值'
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
    ]),
  },
  methods: {
    ...mapActions(["addRelation"]),
    ...mapMutations(["add_showGraphEdges", "set_addRelationVisible"]),
    async confirmAddRelation() {
      var that=this
      console.log(this.addRelationForm.getFieldValue('relationValue'))
      // let data = {
      //   node1: that.addRelationForm.getFieldValue('selectSourceNode'),
      //   node2: that.addRelationForm.getFieldValue('selectTargetNode'),
      //   picId: this.picId,
      //   name: that.addRelationForm.getFieldValue('relationValue')
      // };
      let newData = {
        node1: that.addRelationForm.getFieldValue('selectSourceNode'),
        node2: that.addRelationForm.getFieldValue('selectTargetNode'),
        name: that.addRelationForm.getFieldValue('relationValue'),
        color: "#000",
      };
      console.log('newData',newData)
      if (newData.node1 == null || newData.node2 == null || newData.name == null) {
        message.error("增加关系失败，实体和关系值不能为空");
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
      // await this.addRelation(data);
      // this.add_showGraphEdges(newData);
    },
    onClose() {
      this.set_addRelationVisible(false);
    },
  },
};
</script>

<style scoped>
.tag-item {
  line-height: 28px;
  cursor: pointer;
  margin-left: 44%;
  margin-top: 160px;
}
</style>
