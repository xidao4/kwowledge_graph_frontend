<template class="spin">
    <div id="force">
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
    import G6 from '@antv/g6';

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
    };
    export default {
        name: "ForceGraph",
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
                const menu = new G6.Menu();
                const graph = new G6.Graph({
                    container: 'force',
                    width,
                    height,
                    layout: {
                        type: 'force',
                        preventOverlap: true,
                        nodeSize: 20,
                        nodeStrength: 20,
                    },
                    modes: mode,
                    defaultNode: {
                        size: 20,
                    },
                    // fitView: true,
                    fitCenter: true,
                    fitViewPadding: [20, 40, 40, 20],
                    plugins: [toolbar, menu],
                    minZoom: 0.25,
                    maxZoom: 5,
                });
                graph.data(data);
                graph.render();
                this.registerBehavior(graph, container);
                this.set_forceGraph(graph);
            },
            reDraw(data){
                const container = document.getElementById('force');
                const width = container.scrollWidth;
                const height = window.screen.height * 0.8;
                const menu = new G6.Menu();
                const graph = new G6.Graph({
                    container: 'force',
                    width,
                    height,
                    layout: {
                        type: 'force',
                    },
                    modes: mode,
                    defaultNode: {
                        size: 20,
                    },
                    // fitView: true,
                    fitCenter: true,
                    fitViewPadding: [20, 40, 40, 20],
                    plugins: [toolbar, menu],
                    minZoom: 0.25,
                    maxZoom: 5,
                });
                console.log('force', data)
                graph.data(data);
                graph.render();
                this.registerBehavior(graph, container);
                this.set_forceGraph(graph);
            },
            registerBehavior(graph, container){
                function refreshDragedNodePosition(e) {
                    const model = e.item.get('model');
                    model.fx = e.x;
                    model.fy = e.y;
                }
                graph.on('node:dragstart', function (e) {
                    graph.layout();
                    refreshDragedNodePosition(e);
                });
                graph.on('node:drag', function (e) {
                    // layout.execute();
                    refreshDragedNodePosition(e);
                });
                graph.on('node:dragend', function (e) {
                    e.item.get('model').fx = null;
                    e.item.get('model').fy = null;
                });
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
