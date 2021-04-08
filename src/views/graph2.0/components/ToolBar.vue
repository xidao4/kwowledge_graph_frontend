<template>
  <div class="toolBar">
    <a-button type="primary" size="small" @click="handleAddEntity" class="toolItem">
      <a-icon type="plus" />增加节点
    </a-button>
    <a-button size="small" type="primary" @click="confirmAddRelation" class="margin-left">
      <a-icon type="plus" />增加关系
    </a-button>
    <Scale class="margin-left"></Scale>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import Scale from './Scale'
export default {
  name: "ToolBar",
  components: {
    Scale
  },
  methods:{
    ...mapMutations([
      'set_addEntityVisible',
      'set_addRelationVisible'
    ]),
    handleAddEntity(){
      this.set_addRelationVisible(false);
      this.set_addEntityVisible(true);
    },
    confirmAddRelation(){
      this.set_addEntityVisible(false);
      this.set_addRelationVisible(true);
    }
  }
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
</style>
