<template>
    <div class="tagContainer">
        <h3 style="margin-bottom: 16px;margin-bottom: 5px;text-align: center">
            实体
        </h3>
        <div class="tagList">
            <a-tag :color="node.color" v-for="(node, index) in nodes" :key="index" style="margin-bottom: 8px">
                {{node.name}}
            </a-tag>
            <a-tag>
                增加节点
            </a-tag>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    const testNodes = [
        {
            name: '节点1',
            color: "#FFB8C6"
        },
        {
            name: '节点2',
            color: "#FFB8C6"
        },
        {
            name: '节点3',
            color: "#FFB8C6"
        },
    ];
    export default {
        name: "EntityList",
        data(){
            return {
                nodes: testNodes
            }
        },
        computed:{
            ...mapGetters[(
                'colorList'
            )]
        }
    }
</script>

<style scoped>
.tagContainer{
    width: 100%;
}
.tagList{
    width: 65%;
    margin: 0 auto;
}
</style>
