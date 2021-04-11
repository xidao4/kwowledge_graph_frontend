<template class="spin">
    <div id="typesetting">
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
    // import XBackground from '../../../components/g6/XBackground';
    import G6 from '@antv/g6';
    import { GraphLayoutPredict } from '@antv/vis-predict-engine'
    import { message } from 'ant-design-vue'

    const testData = {
        nodes: [
            {
                id: '0',
                label: '0',
            },
            {
                id: '1',
                label: '1',
            },
            {
                id: '2',
                label: '2',
            },
            {
                id: '3',
                label: '3',
            },
            {
                id: '4',
                label: '4',
            },
            {
                id: '5',
                label: '5',
            },
            {
                id: '6',
                label: '6',
            },
            {
                id: '7',
                label: '7',
            },
            {
                id: '8',
                label: '8',
            },
            {
                id: '9',
                label: '9',
            },
        ],
        edges: [
            {
                source: '0',
                target: '1',
            },
            {
                source: '0',
                target: '2',
            },
            {
                source: '0',
                target: '3',
            },
            {
                source: '0',
                target: '4',
            },
            {
                source: '0',
                target: '5',
            },
            {
                source: '0',
                target: '7',
            },
            {
                source: '0',
                target: '8',
            },
            {
                source: '0',
                target: '9',
            },
            {
                source: '2',
                target: '3',
            },
            {
                source: '4',
                target: '5',
            },
            {
                source: '4',
                target: '6',
            },
            {
                source: '5',
                target: '6',
            },
        ],
    };
    const mode = {
        default: [
            'drag-canvas',
            'drag-node',
            'shortcuts-call',
            {
                type: 'tooltip', // 提示框
                formatText(model) {
                    // 提示框文本内容
                    return '实体名: ' + model.label + '<br/> 类别: '
                        + (model.class === undefined ? '无' : model.class);
                },
            },
        ],
    }
    export default {
        name: "TypesettingGraph",
        data(){
            return {
                predictLayout: '',
                confidence: '',
            }
        },
        computed: {
            ...mapGetters([
                'typesettingGraph',
                'currentGraphData',
                'currentShowGraphData',
                'isNew',
                'currentSetLayout',
            ])
        },
        methods: {
            ...mapMutations([
                'set_typesettingGraph',
                'set_currentSetLayout',
                'set_currentGraph',
                'set_typesettingGraphRatio'
            ]),
            ...mapActions([
                'getPicElements'
            ]),
            draw(data, layout){
                const container = document.getElementById('typesetting');
                const menu = new G6.Menu();
                let graph = new G6.Graph({
                    container: container,
                    width: container.scrollWidth,
                    height: window.screen.height * 0.8,
                    layout: {
                        type: layout,
                        preventOverlap: true,
                        nodeSize: 20,
                    },
                    modes: mode,
                    defaultNode: {
                        size: 20,
                    },
                    // fitView: true,
                    fitCenter: true,
                    fitViewPadding: 20,
                    plugins: [toolbar, menu],
                    minZoom: 0.25,
                    maxZoom: 2
                });
                graph.data(data);
                graph.render();
                this.registerBehavior(graph, container);
                this.set_typesettingGraph(graph);
            },
            reDraw(data){
                const container = document.getElementById('typesetting');
                const menu = new G6.Menu();
                let graph = new G6.Graph({
                    container: container,
                    width: container.scrollWidth,
                    height: window.screen.height * 0.8,
                    modes: mode,
                    plugins: [toolbar, menu],
                    minZoom: 0.25,
                    maxZoom: 2,
                    fitCenter: true,
                    fitViewPadding: 20,
                });
                graph.data(data);
                graph.render();
                this.registerBehavior(graph, container);
                this.set_typesettingGraph(graph);
            },
            registerBehavior(graph, container){
                if (typeof window !== 'undefined'){
                    let that = this;
                    window.onresize = () => {
                        if (!graph || graph.get('destroyed')) return;
                        if (!container || !container.scrollWidth || !container.scrollHeight) return;
                        graph.fitCenter()
                        if(window.innerWidth < 650) {
                            graph.zoomTo(0.5);
                            that.set_typesettingGraphRatio(0.5);
                        } else if(window.innerWidth < 800){
                            graph.zoomTo(0.75);
                            that.set_typesettingGraphRatio(0.75);
                        } else {
                            graph.zoomTo(1);
                            that.set_typesettingGraphRatio(1);
                        }
                        graph.changeSize(container.scrollWidth, window.screen.height * 0.8);
                    };
                }
            },
        },
        async mounted() {
            if(this.isNew){
                if(!this.currentGraphData.nodes){
                    await this.getPicElements();
                }
                if(!this.currentSetLayout){
                    const { predictLayout, confidence } = await GraphLayoutPredict.predict(this.currentGraphData);
                    this.predictLayout = predictLayout;
                    this.confidence = confidence;
                }
                this.draw(this.currentGraphData, this.predictLayout);
                this.set_currentSetLayout(this.predictLayout);
                message.success('预测布局: ' + this.predictLayout + ' 可信度: ' + this.confidence)
            } else {
                if(!this.currentShowGraphData.typesetting){
                    await this.getPicElements();
                }
                this.reDraw(this.currentShowGraphData.typesetting);
            }
            this.set_currentGraph(this.typesettingGraph);
            this.$emit('finished');
        },
    }
</script>

<style scoped>

</style>
