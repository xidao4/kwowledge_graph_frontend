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
import {mapMutations} from 'vuex'
export default {
  name: "ToolBar",
  computed:{
    ...mapMutations([
      'set_addEntityVisible',
      'set_addRelationVisible'
    ])
  },
  methods:{
    handleAddEntity(){
      console.log('1111111')
      // this.set_addRelationVisible(false)
      
      this.set_addEntityVisible(true)
    },
    confirmAddRelation(){
      console.log('2222222')
      // this.set_addEntityVisible(false)
      console.log('333')
      this.set_addRelationVisible(true)
    }
  }
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
