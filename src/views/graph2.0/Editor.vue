<template>
    <a-spin size="large" tip="加载编辑空间" :spinning="spinning">
        <div style="padding-bottom: 20px; background-color: #EEEFF0; width: 100%">
            <Header></Header>
            <tool-bar></tool-bar>
            <a-row class="row">
                <a-col :xs="15" :sm="15" :md="15" :lg="17" :xl="17" xxl="20">
                    <div class="block"></div>
                </a-col>
                <a-col :xs="9" :sm="9" :md="9" :lg="7" :xl="7" xxl="4">
                    <LayoutBlock class="block"></LayoutBlock>
                </a-col>
            </a-row>
            <a-row class="row" id="graphRow">
                <a-col :md="24" :lg="17" :xl="17" xxl="20">
                    <div class="block" style="overflow: hidden;">
                        <TypesettingGraph v-if="currentGraphId === graphIds.typesetting" @finished="stopSpinning"></TypesettingGraph>
                        <ForceGraph v-if="currentGraphId === graphIds.force" @finished="stopSpinning"></ForceGraph>
<!--                                            <TypesettingGraph v-show="false"></TypesettingGraph>-->
<!--                                            <ForceGraph v-if="false"></ForceGraph>-->
<!--                        <LargeGraph v-if="true" @finished="stopSpinning"></LargeGraph>-->
                    </div>
                </a-col>
                <a-col :md="0" :lg="7" :xl="7" xxl="4" v-show="!showModal">
                    <div class="block" :style="this.heightStr">
                        <entity-list :class="addEntityVisible?'show':'not-show'"></entity-list>
                        <relation-list :class="addRelationVisible?'show':'not-show'"></relation-list>
                    </div>
                </a-col>

            </a-row>
            <a-modal :visible="showModal && addEntityVisible" :footer="null" @cancel="handleCloseEntityModal">
                <entity-list></entity-list>
            </a-modal>
            <a-modal :visible="showModal && addRelationVisible" :footer="null" @cancel="handleCloseRelationModal">
                <relation-list></relation-list>
            </a-modal>
        </div>
    </a-spin>
</template>

<script>
    import Header from "./components/Header";
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import TypesettingGraph from "./components/TypesettingGraph";
    import ForceGraph from './components/ForceGraph';
    import LayoutBlock from "./components/LayoutBlock";
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    import ToolBar from "./components/ToolBar.vue"
    import EntityList from "@/views/graph/components/EntityList"
    import RelationList from "@/views/graph/components/RelationList"
    import LargeGraph from "./components/LargeGraph";
    export default {
        name: "Editor",
        data(){
            return {
                showModal: false,
                heightStr: "height: "+(window.screen.height * 0.8 + 5)+'px',
                spinning: true,
            }
        },
        components: {
            LargeGraph,
            ACol,
            ARow,
            LayoutBlock,
            TypesettingGraph,
            ForceGraph,
            Header,
            ToolBar,
            EntityList,
            RelationList,
        },
        computed: {
            ...mapGetters([
                'currentGraphId',
                'graphIds',
                'addEntityVisible',
                'addRelationVisible',
                'isNew',
            ]),
        },
        methods:{
            ...mapMutations([
                "set_addRelationVisible",
                "set_addEntityVisible"
            ]),
            ...mapActions([
                'getPicElements'
            ]),
            handleCloseEntityModal(){
                this.set_addEntityVisible(false)
            },
            handleCloseRelationModal(){
                this.set_addRelationVisible(false)
            },
            stopSpinning(){
                this.spinning = false;
            }
        },
        mounted() {
            if(window.innerWidth < 992){
                this.showModal = true;
            } else {
                this.showModal = false;
            }
            window.addEventListener('resize', ()=>{
                if(window.innerWidth < 992){
                    this.showModal = true;
                } else {
                    this.showModal = false;
                }
            })
        }
    }
</script>

<style scoped>

/*.spin{*/
/*    text-align: center;*/
/*    border-radius: 4px;*/
/*    padding: 30px 50px;*/
/*    margin: 20px 0;*/
/*    min-width: 400px;*/
/*}*/
.row {
    margin: 15px;
}
.block {
    margin: 0 8px;
    background-color: white;
    box-shadow:0 0 4px #7f7f7f;
}
.not-show{
    display: none;
}
.modalView{
    width: 80%;
    margin-left: 10%;
}
</style>
