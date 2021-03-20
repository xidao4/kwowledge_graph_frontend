<template>
    <div>
        <div class="margin-tb">
            <upload-file :triggerGraphDraw="triggerGraphDraw"></upload-file>
        </div>

        <h3 class="header">
            实体
        </h3>
        <div>
            <entity-list :triggerGraphDraw="triggerGraphDraw"></entity-list>
        </div>

        <h3 class="header">
            关系
        </h3>
        <div>
            <relation-list :triggerGraphDraw="triggerGraphDraw"></relation-list>
        </div>
        <div class="margin-tb" v-if="showGraphNodes.length > 0">
            <graph ref="graph"></graph>
        </div>
        <div class="padding-tb-xs" v-show="showGraphNodes.length > 0">
            <download-graph :triggerGraphImgDownload="triggerGraphImgDownload"></download-graph>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapActions,mapMutations} from 'vuex';
    import Graph from "./components/Graph";
    import EntityList from "./components/EntityList";
    import RelationList from "./components/RelationList";
    import UploadFile from "./components/UploadFile";
    import DownloadGraph from "./components/DownloadGraph";


    export default {
        name: "UserGraph",
        components:{
            DownloadGraph,
            Graph, EntityList, RelationList,UploadFile
        },
        computed:{
            ...mapGetters([
                'colorList',
                'showGraphNodes'
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
            triggerGraphDraw(){
                this.$refs.graph.draw();
            },
            triggerGraphImgDownload(chosenFileType){
                this.$refs.graph.downloadImage(chosenFileType);
            }
        }
    }
</script>

<style scoped>
.margin-tb {
    margin: 40px 0;
}
.padding-tb-xs {
    padding-bottom: 100px;
}
.header{
    margin-bottom: 10px;
    margin-top: 70px;
}
</style>
