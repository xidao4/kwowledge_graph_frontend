<template>
    <div class="block">
        <div v-show="currentGraphId === graphIds.force" style="width: 100%;">
            <a-row type="flex" justify="space-between" align="middle">
                <a-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
                    <span class="label">当前布局</span>
                </a-col>
                <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                    <span class="title">力引导布局</span>
                </a-col>
            </a-row>
            <a-row type="flex" justify="space-between" align="middle">
                <a-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
                    <span class="label">作用力</span>
                </a-col>
                <a-col :xs="24" :sm="24" :md="6" :lg="8" :xl="8">
                    <a-slider v-model="nodeStrength" :min="-50" :max="50" class="slider"/>
                </a-col>
                <a-col :xs="0" :sm="0" :md="10" :lg="8" :xl="8">
                    <a-input-number v-model="nodeStrength" :min="-50" :max="50"/>
                </a-col>
            </a-row>
        </div>
        <div v-show="currentGraphId === graphIds.typesetting" style="width: 100%; text-align: center;">
            <a-select placeholder="自定义布局" style="width: 85%;" @change="handleLayoutChange">
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
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    export default {
        name: "LayoutBlock",
        components: {ACol, ARow},
        data(){
            return {
                nodeStrength: 30
            }
        },
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
        },
    }
</script>

<style scoped>
.block {
    min-height: 100px;
    padding: 2vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.title {
    font-size: 18px;
    font-weight: bold;
    color: #D99CA8;
    width: 75%;
}
.label{
    width: 25%;
    font-size: 13px;
}
</style>
