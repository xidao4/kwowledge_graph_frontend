<template>
<!--<<<<<<< HEAD-->
<!--    <div style="padding-bottom: 20px; background-color: #EEEFF0; width: 100%">-->
<!--        <Header></Header>-->
<!--&lt;!&ndash;        <div class="spin">&ndash;&gt;-->
<!--&lt;!&ndash;            <a-spin size="large" tip="初始化编辑空间"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <tool-bar></tool-bar>-->
<!--        <a-row class="row">-->
<!--            <a-col :xs="15" :sm="15" :md="15" :lg="17" :xl="17" xxl="20">-->
<!--                <TypeFilter class="block" :style="this.upHeightStr"></TypeFilter>-->
<!--            </a-col>-->
<!--            <a-col :xs="9" :sm="9" :md="9" :lg="7" :xl="7" xxl="4">-->
<!--                <LayoutBlock class="block" :style="this.upHeightStr"></LayoutBlock>-->
<!--            </a-col>-->
<!--        </a-row>-->
<!--        <a-row class="row" id="graphRow">-->
<!--&lt;!&ndash;            <entity-list :class="this.addEntityVisible?'show':'not-show'"></entity-list>&ndash;&gt;-->
<!--&lt;!&ndash;            <relation-list :class="this.addRelationVisible?'show':'not-show'"></relation-list>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="block" style="overflow: hidden;">&ndash;&gt;-->
<!--&lt;!&ndash;                <TypesettingGraph v-show="currentGraphId === graphIds.typesetting"></TypesettingGraph>&ndash;&gt;-->
<!--&lt;!&ndash;                <ForceGraph v-if="currentGraphId === graphIds.force"></ForceGraph>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--            <a-col :md="24" :lg="17" :xl="17" xxl="20">-->
<!--                <div class="block" style="overflow: hidden;">-->
<!--                    <TypesettingGraph v-show="currentGraphId === graphIds.typesetting"></TypesettingGraph>-->
<!--                    <ForceGraph v-if="currentGraphId === graphIds.force"></ForceGraph>-->
<!--                </div>-->
<!--            </a-col>-->
<!--            <a-col :md="0" :lg="7" :xl="7" xxl="4" v-show="!showModal">-->
<!--                <div class="block" :style="this.heightStr">-->
<!--                    <entity-list :class="addEntityVisible?'show':'not-show'"></entity-list>-->
<!--                    <relation-list :class="addRelationVisible?'show':'not-show'"></relation-list>-->
<!--                    <pie :class="pieModalVisible?'show':'not-show'"></pie>-->
<!--                </div>-->
<!--            </a-col>-->

<!--        </a-row>-->
<!--        <a-modal :visible="showModal && addEntityVisible" :footer="null" @cancel="handleCloseEntityModal">-->
<!--            <entity-list></entity-list>-->
<!--        </a-modal>-->
<!--        <a-modal :visible="showModal && addRelationVisible" :footer="null" @cancel="handleCloseRelationModal">-->
<!--            <relation-list></relation-list>-->
<!--        </a-modal>-->
<!--&lt;!&ndash;        <a-modal :visible="showModal && pieModalVisible"&ndash;&gt;-->
<!--&lt;!&ndash;                 :footer="null"&ndash;&gt;-->
<!--&lt;!&ndash;                 :forceRender="true"&ndash;&gt;-->
<!--&lt;!&ndash;                 @cancel="handleClosePieModal">&ndash;&gt;-->
<!--&lt;!&ndash;            <pie></pie>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-modal>&ndash;&gt;-->

<!--&lt;!&ndash;        <a-drawer&ndash;&gt;-->
<!--&lt;!&ndash;            title="统计"&ndash;&gt;-->
<!--&lt;!&ndash;            placement="right"&ndash;&gt;-->
<!--&lt;!&ndash;            :closable="false"&ndash;&gt;-->
<!--&lt;!&ndash;            :visible="pieDrawerVisible"&ndash;&gt;-->
<!--&lt;!&ndash;            :after-visible-change="afterVisibleChange"&ndash;&gt;-->
<!--&lt;!&ndash;            @close="onClose"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <pie></pie>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-drawer>&ndash;&gt;-->
<!--    </div>-->
    <a-spin size="large" tip="加载编辑空间" :spinning="spinning">
        <div style="padding-bottom: 20px; background-color: #EEEFF0; width: 100%">
            <Header></Header>
            <tool-bar></tool-bar>
            <a-row class="row">
                <a-col :xs="15" :sm="15" :md="15" :lg="17" :xl="17" xxl="20">
                    <TypeFilter class="block" :style="this.upHeightStr"></TypeFilter>
                </a-col>
                <a-col :xs="9" :sm="9" :md="9" :lg="7" :xl="7" xxl="4">
                    <LayoutBlock class="block" :style="this.upHeightStr"></LayoutBlock>
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
                        <pie :class="pieModalVisible?'show':'not-show'"></pie>
                    </div>
                </a-col>

            </a-row>
            <a-modal :visible="showModal && addEntityVisible" :footer="null" @cancel="handleCloseEntityModal">
                <entity-list></entity-list>
            </a-modal>
            <a-modal :visible="showModal && addRelationVisible" :footer="null" @cancel="handleCloseRelationModal">
                <relation-list></relation-list>
            </a-modal>
            <!--        <a-modal :visible="showModal && pieModalVisible"-->
            <!--                 :footer="null"-->
            <!--                 :forceRender="true"-->
            <!--                 @cancel="handleClosePieModal">-->
            <!--            <pie></pie>-->
            <!--        </a-modal>-->

            <!--        <a-drawer-->
            <!--            title="统计"-->
            <!--            placement="right"-->
            <!--            :closable="false"-->
            <!--            :visible="pieDrawerVisible"-->
            <!--            :after-visible-change="afterVisibleChange"-->
            <!--            @close="onClose"-->
            <!--        >-->
            <!--          <pie></pie>-->
            <!--        </a-drawer>-->
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
    import Pie from "./components/Pie";
    import TypeFilter from "./components/TypeFilter";
    import LargeGraph from "./components/LargeGraph";
    export default {
        name: "Editor",
        data(){
            return {
                showModal: false,
                heightStr: "height: "+(window.screen.height * 0.8 + 5)+'px',
                upHeightStr:"height: "+(window.screen.height * 0.15 )+'px',
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
            Pie,
            TypeFilter,
        },
        computed: {
            ...mapGetters([
                'currentGraphId',
                'graphIds',
                'addEntityVisible',
                'addRelationVisible',
                'pieModalVisible',
                'isNew',
            ]),
        },
        methods:{
            ...mapMutations([
                "set_addRelationVisible",
                "set_addEntityVisible",
                "set_pieModalVisible",
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
            handleClosePieModal(){
                this.set_pieModalVisible(false);
            },
            stopSpinning(){
                this.spinning = false;
            },
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
