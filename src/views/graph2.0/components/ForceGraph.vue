<template>
    <div>
    <tool-bar></tool-bar>
    <entity-list :class="this.addEntityVisible?'show':'not-show'"></entity-list>
    <relation-list :class="this.addRelationVisible?'show':'not-show'"></relation-list>
    </div>
</template>

<script>
    import ToolBar from "./ToolBar.vue"
    import EntityList from "../../graph/components/EntityList"
    import RelationList from "../../graph/components/RelationList"
    import {mapGetters} from 'vuex'
    export default {
        name: "Graph",
        components:{
            ToolBar,
            EntityList,
            RelationList,
        },
        computed:{
            ...mapGetters([
                'addEntityVisible',
                'addRelationVisible'
            ])
        }
    }
</script>

<style scoped>
.not-show{
    display: none;
}
</style>
