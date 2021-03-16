<template>
    <a-layout>
        <a-row>
            <upload-file></upload-file>
        </a-row>
        <a-row>
            <entity-list></entity-list>
        </a-row>
        <a-row>
            <relation-list></relation-list>
        </a-row>
        <a-row>
            <graph></graph>
        </a-row>
    </a-layout>
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
        mounted() {
            console.log(this.colorList)
        },
        methods:{

        }
    }
</script>

<style scoped>
.ant-layout{
    background-color: white;
}
</style>
