<template>
  <div class="toolBar">
    <a-button type="primary" size="small" @click="handleAddEntity" class="toolItem">
      <a-icon type="plus" />增加节点
    </a-button>
    <a-button size="small" type="primary" @click="confirmAddRelation" class="toolItem" style="margin-left:20px">
      <a-icon type="plus" />增加关系
    </a-button>
  </div>
</template>

<script>
export default {
  name: "ToolBar",
};
</script>

<style scoped>
.toolBar {
  width: 100%;
  margin-top: 10px;
  height: 44px;
  border: 1px solid blue;
  display: flex;
  align-items: center;
}
.toolItem {
  margin-left: 10px;
}
</style>
