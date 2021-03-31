<template>
    <div class="block">
        <div class="inline-title" v-if="currentGraphId === graphIds.force">
            <span style="margin-right: 10px">当前布局</span>
            <span class="title">力引导布局</span>
        </div>
        <div class="inline-title" v-if="currentGraphId === graphIds.typesetting">

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "LayoutBlock",
        computed: {
            ...mapGetters([
                'currentGraphId',
                'graphIds',
                'currentSetLayout'
            ]),
            layoutType(){
                if(this.currentGraphId === this.graphIds.typesetting){
                    return this.currentSetLayout;
                } else if(this.currentGraphId === this.graphIds.force){
                    return '力引导布局'
                }
                return ''
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
.block {
    min-height: 100px;
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.inline-title {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}
.title {
    font-size: 20px;
    font-weight: bold;
    color: #D99CA8;
}
@media screen and (max-width:800px){
    .inline-title {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
}
</style>
