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
    import { processNodesEdges, bindListener, cssStr } from '../../../components/g6/Graph.js';
    import insertCss from 'insert-css';
    const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        itemTypes: ['node', 'edge'],
        getContent: (e) => {
            const outDiv = document.createElement('div');
            outDiv.style.width = 'fit-content';
            let model = e.item.getModel();
            outDiv.innerHTML =
                `<ul>
                    <li id='expand'>名称: ${model.oriLabel || model.id}</li>
                    <li id='hide'>类型: ${model.type}</li>
                </ul>`;
            return outDiv;
        },
    });
    const mode = {
        default: [
            'drag-canvas',
            'drag-node',
            'shortcuts-call',
        ],
    };
    export default {
        name: "TypesettingGraph",
        data(){
            return {
            }
        },
        computed: {
            ...mapGetters([
                'typesettingGraph',
                'currentGraphData',
                'currentShowGraphData',
                'isNew',
                'currentSetLayout',
                'typesettingEdgeShowLabel',
            ])
        },
        methods: {
            ...mapMutations([
                'set_typesettingGraph',
                'set_currentSetLayout',
                'set_currentGraph',
                'set_typesettingGraphRatio',
                'set_typesettingEdgeShowLabel',
            ]),
            ...mapActions([
                'getPicElements',
                'save'
            ]),
            draw(data, layout){
                const container = document.getElementById('typesetting');
                const width = container.scrollWidth;
                const height = window.screen.height * 0.8;
                let graph = new G6.Graph({
                    container: container,
                    width,
                    height,
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
                    plugins: [tooltip],
                    minZoom: 0.25,
                    maxZoom: 2
                });
                let tmpData = JSON.parse(JSON.stringify(data));
                const processRes = processNodesEdges(tmpData.nodes, tmpData.edges, width, height, this.typesettingEdgeShowLabel);
                bindListener(graph);
                this.registerBehavior(graph, container);
                graph.data({nodes: processRes.nodes, edges: processRes.edges});
                graph.render();
                this.set_typesettingGraph(graph);
                this.save(false);
            },
            reDraw(data){
                const container = document.getElementById('typesetting');
                const width = container.scrollWidth;
                const height = window.screen.height * 0.8;
                let graph = new G6.Graph({
                    container: container,
                    width,
                    height,
                    modes: mode,
                    plugins: [tooltip],
                    minZoom: 0.25,
                    maxZoom: 2,
                    fitCenter: true,
                    fitViewPadding: 20,
                });
                graph.data(data);
                graph.render();
                // if(data.nodes.length > 0 && data.nodes[0].label.length > 0){
                //     this.set_typesettingEdgeShowLabel(true);
                // } else {
                //     this.set_typesettingEdgeShowLabel(false);
                // }
                bindListener(graph);
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
            insertCss(cssStr);
            if(this.isNew){
                if(!this.currentGraphData.nodes){
                    await this.getPicElements();
                }
                if(!this.currentSetLayout){
                    const { predictLayout, confidence } = await GraphLayoutPredict.predict(this.currentGraphData);
                    this.set_currentSetLayout(predictLayout);
                    message.success('预测布局: ' + predictLayout + ' 可信度: ' + confidence)
                }
                this.draw(this.currentGraphData, this.currentSetLayout);
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
