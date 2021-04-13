<template>
<div class="block">
    <div class="inner-block">
        <span :style="{ marginRight: 8 }">类型筛选 :</span>
        <template v-for="(tag,index) in nodesTypes">
<!--        <template v-for="(tag,index) in tags">-->
            <!--      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" xxl="6">-->
            <a-checkable-tag
                :key="tag"
                :checked="selectedTags.indexOf(tag) > -1"
                v-model="checkList[index]"
                @change="checked => handleChange(tag, checked)"
            >
                {{ tag }}
            </a-checkable-tag>
            <!--      </a-col>-->
        </template>
    </div>
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
      tags: ['Movies', 'Books', 'Music', 'Sports','Movies', 'Books', 'Music', 'Sports','Movies', 'Books', 'Music', 'Sports',
          'Movies', 'Books', 'Music', 'Sports','Movies', 'Books', 'Music', 'Sports','Movies', 'Books', 'Music', 'Sports',
          'Movies', 'Books', 'Music', 'Sports','Movies', 'Books', 'Music', 'Sports','Movies', 'Books', 'Music', 'Sports'],
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
    padding: 1vw;
    display: flex;
    justify-content: space-evenly;
    /*align-items: center;*/
}
.inner-block{
    width:95%;
    height:100%;
    margin:auto;
    /*text-align: center;!*使元素水平居中 *!*/
    vertical-align: middle;/*使元素垂直居中 */
    overflow-y:auto;
}
</style>