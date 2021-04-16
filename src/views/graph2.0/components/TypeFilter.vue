<template>
<div class="block">
    <div class="inner-block">
        <span :style="{ marginRight: 8 }">类型筛选  </span>
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
import {getTokenByKey} from '../../../utils/cache'

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
      // checkList:[],
      selectedTags: [],
    };
  },
    computed: {
        ...mapGetters([
            'picId',
            'nodesTypes',
            'currentGraph',
            'checkList',
        ])
    },
    async mounted(){
        console.log('4444 TypeFilter: picId',this.picId);
        console.log('4444 currentGraph',this.currentGraph);
        await this.getNodeTypes({
            picId:this.picId
            //picId:getTokenByKey('picId'),
        });
        for(let i=0;i<this.nodesTypes.length;i++){
            this.checkList.push(true);
        }
        this.selectedTags=this.nodesTypes;
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
            console.log('4444 你选择的节点类型有: ', nextSelectedTags);
            this.selectedTags = nextSelectedTags;

            if(checked){
                console.log('4444 checked',checked);
                showItem(this.currentGraph,tag);
                //TODO 增加分组的圈
            }else{
                console.log('4444 checked',checked);
                hideItem(this.currentGraph,tag);
                //TODO 去除分组的圈
            }
        },
    }
}
</script>

<style scoped>
.block {
    min-height: 70px;
    padding: 2vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.inner-block{
    width:95%;
    height:80%;
    margin:auto;
    /*text-align: center;!*使元素水平居中 *!*/
    vertical-align: middle;/*使元素垂直居中 */
    overflow-y:auto;
}
</style>