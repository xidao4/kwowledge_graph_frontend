<template class="spin">
    <div id="force">
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
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
    export default {
        name: "ForceGraph",
        computed: {
            ...mapGetters([
                'forceGraph'
            ])
        },
        methods: {
            ...mapMutations([
                'set_forceGraph',
            ]),
            draw(data){
                const container = document.getElementById('force');
                const width = container.scrollWidth;
                const height = window.screen.height * 0.8;
                // const minimap = new G6.Minimap({
                //     size: [200, 200],
                //     className: 'minimap',
                //     type: 'delegate',
                // });
                // const toolbar = new G6.ToolBar({
                //     position: { x: 0, y: 130 },
                // });
                const menu = new G6.Menu();
                // const grid = new G6.Grid();
                const graph = new G6.Graph({
                    container: 'force',
                    width,
                    height,
                    layout: {
                        type: 'force',
                        preventOverlap: true,
                        nodeSize: 20,
                    },
                    modes: {
                        default: [
                            'drag-canvas',
                            'drag-node',
                            'shortcuts-call',
                            // 'zoom-canvas',
                            {
                                type: 'tooltip', // 提示框
                                formatText(model) {
                                    // 提示框文本内容
                                    return '实体名: ' + model.label + '<br/> 类别: '
                                        + (model.class === undefined ? '无' : model.class);
                                },
                            },],
                    },
                    defaultNode: {
                        size: 20,
                    },
                    // fitView: true,
                    fitCenter: true,
                    fitViewPadding: [20, 40, 40, 20],
                    plugins: [toolbar, menu],
                    minZoom: 0.5,
                    maxZoom: 5
                });
                graph.data(data);
                graph.render();

                function refreshDragedNodePosition(e) {
                    const model = e.item.get('model');
                    model.fx = e.x;
                    model.fy = e.y;
                }
                graph.on('node:dragstart', (e) => {
                    graph.layout();
                    refreshDragedNodePosition(e);
                });
                graph.on('node:drag', (e) => {
                    refreshDragedNodePosition(e);
                });
                if (typeof window !== 'undefined'){
                    window.onresize = () => {
                        if (!graph || graph.get('destroyed')) return;
                        if (!container || !container.scrollWidth || !container.scrollHeight) return;
                        graph.fitCenter()
                        if(window.innerWidth < 650) {
                            graph.zoomTo(0.6)
                        }
                        graph.changeSize(container.scrollWidth, window.screen.height * 0.8);
                    };
                }
                this.set_forceGraph(graph);
            }
        },
        mounted() {
            this.draw(testData);
            console.log('force')
        },
    }
</script>

<style scoped>

</style>
