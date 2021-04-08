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
        this.set_addEntityVisible(false)
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
