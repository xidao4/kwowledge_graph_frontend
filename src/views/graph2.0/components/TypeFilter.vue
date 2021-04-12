<template>
<div class="block">
  <span :style="{ marginRight: 8 }">类型筛选 :</span>
  <template v-for="(tag,index) in nodesTypes">
    <a-checkable-tag
        :key="tag"
        :checked="selectedTags.indexOf(tag) > -1"
        v-model="checkList[index]"
        @change="checked => handleChange(tag, checked)"
    >
      {{ tag }}
    </a-checkable-tag>
  </template>
</div>
</template>

<script>


import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: "TypeFilter",
    components: {

    },
  data() {
    return {
      // tags: ['Movies', 'Books', 'Music', 'Sports'],
      // checkList:[true,true,true,true],
      checkList:[],
      selectedTags: [],
    };
  },
    computed: {
        ...mapGetters([
            'nodesByTypeMap',
            'picId',
            'nodesTypes',
        ])
    },
    async mounted(){
        await this.getNodesByTypesMap({
            picId:this.picId
        });
        for(let i=0;i<this.nodesTypes.length;i++){
            this.checkList.push(true);
        }
    },
    methods: {
        ...mapMutations([

        ]),
        ...mapActions([
            'getNodesByTypesMap'
        ]),
        handleChange(tag, checked) {
            const { selectedTags } = this;
            const nextSelectedTags = checked
                ? [...selectedTags, tag]
                : selectedTags.filter(t => t !== tag);
            console.log('你选择的节点类型有: ', nextSelectedTags);
            this.selectedTags = nextSelectedTags;

            //获取该类型的所有节点
            let nodesByType=this.nodesByTypeMap.get(tag);
            console.log('nodesByType',nodesByType);
            if(checked){
                //TODO 将该类型所有节点加入showNodes
// 根据node-edges映射，将节点拥有的边加入showEdges，要判断另一头的节点是否也在showNodes中
            }else{
  //TODO 将该类型所有节点从showNodes中删除，将节点拥有的边从showEdges中删除
            }
            //allNodes allEdges showNodes showEdges
            //node-edges映射map
            //active selected highlight inactive disable hover click
        },
    }
}
</script>

<style scoped>
.block {
    min-height: 100px;
    padding: 2vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>