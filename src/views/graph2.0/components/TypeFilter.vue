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
import { hideItem,showItem } from '../../../components/g6/Graph.js';

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
            'picId',
            'nodesTypes',
            'currentGraph',
        ])
    },
    async mounted(){
        await this.getNodeTypes({
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
            'getNodeTypes',
        ]),
        handleChange(tag, checked) {
            const { selectedTags } = this;
            const nextSelectedTags = checked
                ? [...selectedTags, tag]
                : selectedTags.filter(t => t !== tag);
            console.log('你选择的节点类型有: ', nextSelectedTags);
            this.selectedTags = nextSelectedTags;

            if(checked){
                showItem(this.currentGraph,tag);
            }else{
                hideItem(this.currentGraph,tag);
            }
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