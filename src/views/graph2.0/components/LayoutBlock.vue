<template>
    <div class="block">
        <div class="inline-title" v-if="currentGraphId === graphIds.force">
            <span style="margin-right: 10px">当前布局</span>
            <span class="title">力引导布局</span>
        </div>
        <div class="inline-title" v-if="currentGraphId === graphIds.typesetting">
            <a-select :default-value="currentSetLayout" style="width: 200px" @change="handleLayoutChange">
                <a-select-opt-group label="力引导布局">
                    <a-select-option :value="item.key" v-for="(item, index) in forceLayout" :key="index">
                        {{item.value}}
                    </a-select-option>
                </a-select-opt-group>
                <a-select-opt-group label="一般布局">
                    <a-select-option :value="item.key" v-for="(item, index) in layoutType" :key="index">
                        {{item.value}}
                    </a-select-option>
                </a-select-opt-group>
            </a-select>
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
                'currentSetLayout',
                'forceLayout',
                'layoutType'
            ]),
        },
        methods: {
            handleLayoutChange(value) {
                console.log(`selected ${value}`);
            },
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
