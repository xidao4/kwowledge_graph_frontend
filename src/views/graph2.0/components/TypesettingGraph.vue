<template class="spin">
    <div id="typesetting">
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import G6 from '@antv/g6';
    import { GraphLayoutPredict } from '@antv/vis-predict-engine';
    import { message } from 'ant-design-vue';
    import { processNodesEdges, bindListener, cssStr, processCombos } from '../../../components/g6/Graph.js';
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
                    <li id='hide'>类型: ${model.class}</li>
                </ul>`;
            return outDiv;
        },
    });
    const mode = {
        default: [
            'drag-canvas',
            'drag-node',
            'shortcuts-call',
            'drag-combo',
            'collapse-expand-combo',
            'click-select'
        ],
    };
    const minimap = new G6.Minimap({
        size: [150, 100],
    });
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
                'currentShowCombos',
                'currentCombos',
                'boardTypes',
                'userId'
            ])
        },
        methods: {
            ...mapMutations([
                'set_typesettingGraph',
                'set_currentSetLayout',
                'set_currentGraph',
                'set_typesettingGraphRatio',
                'set_typesettingEdgeShowLabel',
                'set_currentCombos',
                'set_currentShowGraphData',
                'set_currentShowGraphData_typesetting',
                'set_currentShowBoard'
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
                    groupByTypes: false,
                    defaultCombo: {
                        type: 'circle',
                        style: {
                            // fill: '#D99CA8',
                            stroke: '#D99CA8',
                            lineWidth: 2,
                        },
                        labelCfg: {
                            refY: 15,
                            position: 'bottom',
                        },
                    },
                    comboStateStyles: {
                        dragenter: {
                            shadowColor: '#D99CA8',
                            lineWidth: 0,
                            fill: '#fff',
                            shadowBlur: 10,
                            // stroke: '#f00'
                        },
                        selected: {
                            stroke: "#D99CA8",
                            fill: "#fff",
                            shadowBlur: 10,
                            shadowColor: "#D99CA8",
                            textShape:
                                {
                                    fontWeight: 500
                                }
                        },
                        active: {
                            stroke: "#D99CA8",
                            fill: "#fff",
                            shadowBlur: 10,
                            shadowColor: "#D99CA8",
                            textShape:
                                {
                                    fontWeight: 500
                                }
                        },
                    },
                    layout: {
                        type: layout,
                        preventOverlap: true,
                        // nodeSize: 20,
                        linkDistance: 25
                    },
                    modes: mode,
                    fitCenter: true,
                    fitViewPadding: 20,
                    plugins: [tooltip, minimap],
                    minZoom: 0.25,
                    maxZoom: 2
                });
                // 深拷贝
                let tmpData = JSON.parse(JSON.stringify(data));
                const processRes = processNodesEdges(tmpData.nodes, tmpData.edges, width, height, this.typesettingEdgeShowLabel);
                bindListener(graph);
                this.registerBehavior(graph, container);
                this.set_currentCombos(processRes.combos);
                if(this.currentShowCombos){
                    graph.data({nodes: processRes.nodes, edges: processRes.edges, combos: processRes.combos});
                } else {
                    graph.data({nodes: processRes.nodes, edges: processRes.edges});
                }
                graph.render();
                this.set_currentShowGraphData_typesetting(graph.save());
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
                    defaultCombo: {
                        type: 'circle',
                        style: {
                            // fill: '#D99CA8',
                            stroke: '#D99CA8',
                            lineWidth: 2,
                        },
                        labelCfg: {
                            refY: 15,
                            position: 'bottom',
                        },
                    },
                    comboStateStyles: {
                        dragenter: {
                            shadowColor: '#D99CA8',
                            lineWidth: 0,
                            fill: '#fff',
                            shadowBlur: 10,
                            // stroke: '#f00'
                        },
                        selected: {
                            stroke: "#D99CA8",
                            fill: "#fff",
                            shadowBlur: 10,
                            shadowColor: "#D99CA8",
                            textShape:
                                {
                                    fontWeight: 500
                                }
                        },
                        active: {
                            stroke: "#D99CA8",
                            fill: "#fff",
                            shadowBlur: 10,
                            shadowColor: "#D99CA8",
                            textShape:
                                {
                                    fontWeight: 500
                                }
                        },
                    },
                    plugins: [tooltip],
                    minZoom: 0.25,
                    maxZoom: 2,
                    fitCenter: true,
                    fitViewPadding: 20,
                });
                let tmpData = JSON.parse(JSON.stringify(data));
                const processRes = processCombos(tmpData.nodes, this.typesettingEdgeShowLabel);
                this.set_currentCombos(processRes.combos);
                if(this.currentShowCombos){
                    graph.data({nodes: processRes.nodes, edges: data.edges, combos: processRes.combos});
                } else {
                    graph.data({nodes: processRes.nodes, edges: data.edges});
                }
                graph.render();
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
                if(this.currentShowGraphData.typesetting) {
                    this.reDraw(this.currentShowGraphData.typesetting);
                }
            }
            this.set_currentGraph(this.typesettingGraph);
            this.set_currentShowBoard(this.boardTypes.pie);
            this.$emit('finished');
        },
    }
</script>

<style scoped>

</style>
