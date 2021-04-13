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
                    <a-slider v-model="nodeStrength" :min="-10" :max="10" class="slider"/>
                </a-col>
                <a-col :xs="0" :sm="0" :md="10" :lg="8" :xl="8">
                    <a-input-number v-model="nodeStrength" :min="-10" :max="10"/>
                </a-col>
            </a-row>
        </div>
        <div v-show="currentGraphId === graphIds.typesetting" style="width: 100%;">
            <div>
                <span class="margin-right-s label">
                    布局
                </span>
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
            <div class="margin-top">
                <span class="margin-right-s label">
                    分组
                </span>
                <a-switch :checked="currentShowCombos" @change="changeGroup" default-checked>
                    <a-icon slot="checkedChildren" type="check" />
                    <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    export default {
        name: "LayoutBlock",
        components: {ACol, ARow},
        data(){
            return {
                nodeStrength: 1
            }
        },
        computed: {
            ...mapGetters([
                'currentGraphId',
                'graphIds',
                'currentSetLayout',
                'forceLayout',
                'layoutType',
                'currentGraph',
                'forceGraph',
                'typesettingGraph',
                'currentCombos',
                'currentShowCombos',
                'currentShowGraphData'
            ]),
        },
        methods: {
            ...mapMutations([
                'set_currentSetLayout',
                'set_currentCombos',
                'set_currentShowCombos'
            ]),
            handleLayoutChange(value) {
                let that = this;
                setTimeout(() => {
                    that.currentGraph.updateLayout({
                        type: value
                    });
                    that.currentGraph.fitCenter()
                }, 1000);
                this.typesettingGraph.updateLayout({
                    type: value
                });
                this.set_currentSetLayout(value);
            },
            changeGroup(value){
                let data = this.currentShowGraphData.typesetting;
                if(value){
                    console.log('show', {nodes: data.nodes, edges: data.edges, combos: this.currentCombos})
                    this.typesettingGraph.data({nodes: data.nodes, edges: data.edges, combos: this.currentCombos});
                    this.currentGraph.data({nodes: data.nodes, edges: data.edges, combos: this.currentCombos})
                } else {
                    console.log('not show', {nodes: data.nodes, edges: data.edges})
                    this.typesettingGraph.data({nodes: data.nodes, edges: data.edges});
                    this.currentGraph.data({nodes: data.nodes, edges: data.edges})
                }
                this.typesettingGraph.render();
                console.log(`group choose ${value}`)
                this.set_currentShowCombos(value);
            }
        },
        watch: {
            nodeStrength: {
                immediate: true,
                handler(){
                    let that = this;
                    // console.log('g', that.currentGraph);
                    setTimeout(() => {
                        that.currentGraph.updateLayout({
                            nodeStrength: that.nodeStrength * 20
                        });
                    }, 1000);
                    this.forceGraph.updateLayout({
                        nodeStrength: that.nodeStrength * 20
                    });
                }
            }
        },
        mounted() {
            console.log('111??', this.currentShowGraphData.typesetting)
        }
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
.margin-right-s {
    margin-right: 5px;
}
.margin-top {
    margin-top: 10px;
}
</style>
