<template>
    <div>
        <Header></Header>
        <TypesettingGraph v-show="currentGraphId === graphIds.typesetting"></TypesettingGraph>
        <ForceGraph v-show="currentGraphId === graphIds.force"></ForceGraph>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import {mapGetters} from 'vuex';
    import TypesettingGraph from "./components/TypesettingGraph";
    import ForceGraph from './components/ForceGraph';
    export default {
        name: "Editor",
        components: {
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

</style>
