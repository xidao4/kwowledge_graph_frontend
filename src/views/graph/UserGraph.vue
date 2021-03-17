<template>
    <div>
        <div class="margin-tb">
            <upload-file></upload-file>
        </div>
        <div class="margin-tb">
            <entity-list></entity-list>
        </div>
        <div class="margin-tb">
            <relation-list></relation-list>
        </div>
        <div class="margin-tb">
            <graph></graph>
        </div>
    </div>
</template>

<script>
    import Graph from "./components/Graph";
    import EntityList from "./components/EntityList";
    import RelationList from "./components/RelationList";
    import UploadFile from "./components/UploadFile";

    export default {
        name: "UserGraph",
        components:{
            Graph, EntityList, RelationList,UploadFile
        }
    }
</script>

<style scoped>
.ant-layout {
    background-color: white;
}
.margin-tb {
    margin: 50px 0;
}
</style>
