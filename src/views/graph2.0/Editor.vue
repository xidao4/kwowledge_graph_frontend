<template>
    <div style="background-color: #EEEFF0">
        <Header></Header>
<!--        <div class="spin">-->
<!--            <a-spin size="large" tip="初始化编辑空间"/>-->
<!--        </div>-->
        <a-row class="row">
            <a-col span="18">
                <div class="block"></div>
            </a-col>
            <a-col span="6">
                <LayoutBlock class="block"></LayoutBlock>
            </a-col>
        </a-row>
        <a-row class="row">
            <a-col span="18">
                <div class="block">
                    <TypesettingGraph v-show="currentGraphId === graphIds.typesetting"></TypesettingGraph>
                    <ForceGraph v-if="currentGraphId === graphIds.force"></ForceGraph>
                </div>
            </a-col>
            <a-col span="6">
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
    export default {
        name: "Editor",
        components: {
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
            ])
        }
    }
</script>

<style scoped>

.spin{
    text-align: center;
    border-radius: 4px;
    padding: 30px 50px;
    margin: 20px 0;
    width: 100%;
    height: 100%;
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
