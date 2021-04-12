<template class="spin">
    <div id="force">
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from 'vuex';
    import G6 from '@antv/g6';
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
    }
    export default {
        name: "ForceGraph",
        data(){
            return {
                largeGraphMode: true,
                edgeLabelVisible: false,
            }
        },
        computed: {
            ...mapGetters([
                'forceGraph',
                'isNew',
                'currentGraphData',
                'currentShowGraphData',
            ])
        },
        methods: {
            ...mapMutations([
                'set_forceGraph',
                'set_forceGraphRatio',
                'set_currentGraph'
            ]),
            ...mapActions([
                'getPicElements'
            ]),
            draw(data){
                const container = document.getElementById('force');
                const width = container.scrollWidth;
                const height = window.screen.height * 0.8;
                const graph = new G6.Graph({
                    container: 'force',
                    width,
                    height,
                    layout: {
                        type: 'force',
                        preventOverlap: true,
                        nodeSize: 12,
                        nodeStrength: 20,
                        linkDistance: 120
                    },
                    modes: mode,
                    defaultNode: {
                        size: 20,
                    },
                    // fitView: true,
                    fitCenter: true,
                    fitViewPadding: [20, 40, 40, 20],
                    plugins: [tooltip],
                    minZoom: 0.25,
                    maxZoom: 5,
                });
                let tmpData = JSON.parse(JSON.stringify(data));
                const processRes = processNodesEdges(tmpData.nodes, tmpData.edges, width, height, false);
                bindListener(graph);
                this.registerBehavior(graph, container);
                graph.data({nodes: processRes.nodes, edges: processRes.edges});
                graph.render();
                this.set_forceGraph(graph);
            },
            reDraw(data){
                const container = document.getElementById('force');
                const width = container.scrollWidth;
                const height = window.screen.height * 0.8;
                const graph = new G6.Graph({
                    container: 'force',
                    width,
                    height,
                    layout: {
                        type: 'force',
                    },
                    modes: mode,
                    // fitView: true,
                    fitCenter: true,
                    fitViewPadding: [20, 40, 40, 20],
                    plugins: [tooltip],
                    minZoom: 0.25,
                    maxZoom: 5,
                });
                graph.data(data);
                graph.render();
                bindListener(graph);
                this.registerBehavior(graph, container);
                this.set_forceGraph(graph);
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
                            that.set_forceGraphRatio(0.5);
                        } else if(window.innerWidth < 800){
                            graph.zoomTo(0.75);
                            that.set_forceGraphRatio(0.75);
                        } else {
                            graph.zoomTo(1);
                            that.set_forceGraphRatio(1);
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
                this.draw(this.currentGraphData);
            } else {
                if(!this.currentShowGraphData.force){
                    await this.getPicElements();
                }
                this.reDraw(this.currentShowGraphData.force);
            }
            this.set_currentGraph(this.forceGraph);
            this.$emit('finished')
        },
    }
</script>

<style scoped>
</style>
