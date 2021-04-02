<template>
    <div style="padding-bottom: 20px; background-color: #EEEFF0">
        <Header></Header>
<!--        <div class="spin">-->
<!--            <a-spin size="large" tip="初始化编辑空间"/>-->
<!--        </div>-->
        <TmpToolBar></TmpToolBar>
        <a-row class="row">
            <a-col :xs="15" :sm="15" :md="13" :lg="15" :xl="18">
                <div class="block"></div>
            </a-col>
            <a-col :xs="9" :sm="9" :md="11" :lg="9" :xl="6">
                <LayoutBlock class="block"></LayoutBlock>
            </a-col>
        </a-row>
        <a-row class="row">
            <a-col :md="24" :lg="15" :xl="18">
                <div class="block" style="overflow: hidden;">
                    <TypesettingGraph v-show="currentGraphId === graphIds.typesetting"></TypesettingGraph>
                    <ForceGraph v-if="currentGraphId === graphIds.force"></ForceGraph>
                </div>
            </a-col>
            <a-col :md="0" :lg="9" :xl="6">
                <div class="block"></div>
            </a-col>
        </a-row>
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
    import TmpToolBar from "./components/TmpToolBar";
    export default {
        name: "Editor",
        components: {
            TmpToolBar,
            ACol,
            ARow,
            LayoutBlock,
            TypesettingGraph,
            ForceGraph,
            Header,
        },
        computed: {
            ...mapGetters([
                'currentGraphId',
                'graphIds'
            ]),
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
</style>
