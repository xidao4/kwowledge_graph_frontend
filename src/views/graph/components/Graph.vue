<template>
    <div>
        <a-row>
            <div :id="graphId" class="graph-box"></div>
        </a-row>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    export default {
        name: "Graph",
        data(){
            return {
                graphId: 'graphChart'
            }
        },
        computed: {
            ...mapGetters([
                'showGraphEdges',
                'showGraphNodes'
            ])
        },
        mounted() {
            this.draw()
        },
        methods: {
            draw () {
                const chart = this.$echarts.init(document.getElementById(this.graphId));
                let showNodes = this.showGraphNodes.slice(0);
                let showEdges = this.showGraphEdges.slice(0);
                showNodes.forEach(node => {
                    node.itemStyle = {
                        color: node.color
                    };
                });
                showEdges.forEach(link => {
                    link.label = {
                        align: 'center',
                        fontSize: 12
                    };
                    link.lineStyle = {
                        color: link.color
                    }
                });
                const option = {
                    legend: {
                        show: true,
                        // data: showNodes.map(x => x.name),
                        textStyle: {
                            color: "#000",
                            fontSize: 10
                        },
                        // inactiveColor: "#999197",
                        icon: "circle",
                        type: "scroll",
                        orient: "vertical",
                        left: "right",
                        right: 20,
                        top: 20,
                        bottom: 80
                    },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        symbolSize: 58,
                        draggable: true,
                        roam: false,
                        focusNodeAdjacency: true,
                        edgeSymbol: ['', 'arrow'],
                        // edgeSymbolSize: [80, 10],
                        edgeLabel: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 20
                                },
                                // formatter(x) {
                                //     return x.data.name;
                                // }
                            }
                        },
                        label: {
                            show: true
                        },
                        force: {
                            repulsion: 300,
                            edgeLength: 40
                        },
                        data: showNodes,
                        links: showEdges
                    }]
                }
                chart.setOption(option)
            },
        },
    }
</script>

<style>
.graph-box{
    height: 400px;
}
</style>
