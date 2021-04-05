<template>
    <div style="padding-bottom: 20px; background-color: #EEEFF0; width: 100%">
        {{showModal}}
        <Header></Header>
<!--        <div class="spin">-->
<!--            <a-spin size="large" tip="初始化编辑空间"/>-->
<!--        </div>-->
        <tool-bar></tool-bar>
        <a-row class="row">
            <a-col :xs="15" :sm="15" :md="15" :lg="17" :xl="17" xxl="20">
                <div class="block"></div>
            </a-col>
            <a-col :xs="9" :sm="9" :md="9" :lg="7" :xl="7" xxl="4">
                <LayoutBlock class="block"></LayoutBlock>
            </a-col>
        </a-row>
        <a-row class="row">
<!--            <entity-list :class="this.addEntityVisible?'show':'not-show'"></entity-list>-->
<!--            <relation-list :class="this.addRelationVisible?'show':'not-show'"></relation-list>-->
<!--            <div class="block" style="overflow: hidden;">-->
<!--                <TypesettingGraph v-show="currentGraphId === graphIds.typesetting"></TypesettingGraph>-->
<!--                <ForceGraph v-if="currentGraphId === graphIds.force"></ForceGraph>-->
<!--            </div>-->
            <a-col :md="24" :lg="17" :xl="17" xxl="20">
                <div class="block" style="overflow: hidden;">
                    <TypesettingGraph v-show="currentGraphId === graphIds.typesetting"></TypesettingGraph>
                    <ForceGraph v-if="currentGraphId === graphIds.force"></ForceGraph>
                </div>
            </a-col>
            <a-col :md="0" :lg="7" :xl="7" xxl="4" v-show="!showModal">
                <div class="block">
                    <entity-list :class="this.addEntityVisible?'show':'not-show'"></entity-list>
                    <relation-list :class="this.addRelationVisible?'show':'not-show'"></relation-list>
                </div>
            </a-col>

        </a-row>
        <a-modal :visible="showModal">test</a-modal>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import {mapGetters} from 'vuex';
    import TypesettingGraph from "./components/TypesettingGraph";
    import ForceGraph from './components/ForceGraph';
    import LayoutBlock from "./components/LayoutBlock";
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    import ToolBar from "./components/ToolBar.vue"
    import EntityList from "@/views/graph/components/EntityList"
    import RelationList from "@/views/graph/components/RelationList"
    export default {
        name: "Editor",
        data(){
            return {
                showModal: false
            }
        },
        components: {
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
                'addRelationVisible'
            ]),
        },
        mounted() {
            if(window.innerWidth < 650){
                this.showModal = true;
            } else {
                this.showModal = false;
            }
            window.addEventListener('resize', ()=>{
                console.log('hahahhahhah')
                if(window.innerWidth < 650){
                    this.showModal = true;
                } else {
                    this.showModal = false;
                }
            })
        }
    }
</script>

<style scoped>

.spin{
    text-align: center;
    border-radius: 4px;
    padding: 30px 50px;
    margin: 20px 0;
    min-width: 400px;
}
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
</style>
