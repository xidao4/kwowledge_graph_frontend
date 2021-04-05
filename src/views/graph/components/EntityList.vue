<template>
  <div id="addEntity" >
    <div
    :style="{
        borderRadius: '0',
        textAlign: 'right',
        overflow: 'hidden',
        position: 'relative',
        height: height
    }">
    <a-drawer
      title="添加实体"
      placement="right"
      :closable="true"
      :visible="addEntityVisible"
      :mask="false"
      :get-container="false"
      :wrap-style="{ position: 'absolute', boxShadow: 'none' }"
      :body-style="{ padding: '20px', overflow: 'hidden'}"
      :header-style="{ textAlign: 'left', paddingLeft: '8vw'}"
      @close="onClose"
      width="33vw"
    >

      <a-form
        :form="addForm"
        :label-col="{ lg: {span: 10}, xl: {span: 9} }"
        :wrapper-col="{ lg: {span: 14}, xl: {span: 15} }"
        style="margin-top:20px"
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
    </a-drawer>
  </div>
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
      height: (window.screen.height * 0.8 + 5) + 'px'
    };
  },
  props: ["triggerGraphDraw"],
  computed: {
    ...mapGetters(["colorList", "showGraphNodes", "picId","addEntityVisible"]),
  },
  methods: {
    ...mapMutations(["add_showGraphNodes","set_addEntityVisible"]),
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
      this.set_addEntityVisible(false)
      if (this.name.errorMsg === null && this.type.errorMsg === null) {
        // this.add_showGraphNodes({
        //   name: this.name.value,
        //   color: this.colorValue,
        // });
        // this.addEntity({
        //   picId: this.picId,
        //   name: this.name.value,
        //   type: this.type.value
        // });
        // this.triggerGraphDraw();

        this.name.value = "";
        this.type.value= "";
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
#addEntity {
  /*width: 360px;*/
  /*float: right;*/
  /*height: 600px;*/
}
.tag-item {
  line-height: 28px;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 120px;
}
.ant-drawer-right.ant-drawer-open {
  box-shadow: none !important;
}

</style>
