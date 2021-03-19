<template>
    <div>
        <div class="margin-tb">
            <upload-file :triggerGraphMethod="triggerGraphMethod"></upload-file>
        </div>
        <div class="margin-tb">
            <entity-list :triggerGraphMethod="triggerGraphMethod"></entity-list>
        </div>
        <div class="margin-tb">
            <relation-list :triggerGraphMethod="triggerGraphMethod"></relation-list>
        </div>
        <div class="margin-tb">
            <graph ref="graph"></graph>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapActions,mapMutations} from 'vuex';
    import Graph from "./components/Graph";
    import EntityList from "./components/EntityList";
    import RelationList from "./components/RelationList";
    import UploadFile from "./components/UploadFile";


    export default {
        name: "UserGraph",
        components:{
            Graph, EntityList, RelationList,UploadFile
        },
        computed:{
            ...mapGetters([
                'colorList',
            ])
        },
        async mounted() {
            console.log(this.colorList)
            await this.getAll()
        },
        methods:{
            ...mapActions([
              'getAll'
            ]),
            triggerGraphMethod(){
                this.$refs.graph.draw();
            }
        }
    }
</script>

<style scoped>
.ant-layout {
    background-color: white;
}
.margin-tb {
    margin: 40px 0;
}
</style>
