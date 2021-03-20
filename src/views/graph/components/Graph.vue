<template>
    <div>
        <a-row type="flex" justify="center">
            <a-col :span="20">
                <a-card :id="graphId" class="graph-box" style="width: 100%"></a-card>
            </a-col>
        </a-row>

        <EntityModal :showModal="showEntityModal" :info="showEntityInfo" @closeModal="closeModal"></EntityModal>
        <RelationLine :showModal="showRelationModal" :info="showRelationInfo" @closeModal="closeModal"></RelationLine>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import EntityModal from './EntityModal';
    import RelationLine from "./RelationLine";

    export default {
        name: "Graph",
        components: {
            RelationLine,
            EntityModal
        },
        data(){
            return {
                graphId: 'graphChart',
                chart: null,

                showEntityModal: false,
                showEntityInfo: {
                    name: '',
                    color: ''
                },
                showRelationModal: false,
                showRelationInfo: {}
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
                this.chart = this.$echarts.init(document.getElementById(this.graphId));
                let showNodes = this.showGraphNodes.slice(0);
                let showEdges = this.showGraphEdges.slice(0);
                let legend = [];
                let legendColor = showNodes.map(item => item.color);
                let nodeCnt = 0;
                let categories = showNodes.map(item => {
                    return {
                        name: item.name
                    };
                });
                showNodes.forEach(node => {
                    legend.push(node.name);
                    node.category = nodeCnt;
                    nodeCnt++;
                    categories.push(nodeCnt);
                    node.itemStyle = {
                        color: {
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: node.color // 0% 处的颜色
                                },
                                {
                                    offset: 0.8,
                                    color: node.color // 80% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: node.color // 100% 处的颜色
                                }
                            ],
                            global: false
                        },
                        shadowColor: "rgba(0, 0, 0, 0.3)",
                        shadowBlur: 6
                    };
                });
                showEdges.forEach(link => {
                    link.label = {
                        align: 'center',
                        fontSize: 12
                    };
                    link.lineStyle = {
                        color: link.color
                    };
                    link.source = link.node1;
                    link.target = link.node2;
                });
                let option = {
                    color: legendColor,
                    // legend: {
                    //     show: true,
                    //     data: legend,
                    //     textStyle: {
                    //         color: "#000",
                    //         fontSize: 10
                    //     },
                    //     // inactiveColor: "#fff",
                    //     icon: "circle",
                    //     // type: "scroll",
                    //     // orient: "vertical",
                    //     // left: "right",
                    //     pageIconColor: "#000",
                    //     pageIconInactiveColor: "#000",
                    //     pageIconSize: 12,
                    //     pageTextStyle: {
                    //         color: "#000",
                    //         fontSize: 12
                    //     }
                    // },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        symbolSize: 58,
                        draggable: true,
                        roam: true,
                        nodeScaleRatio: 0.6,
                        scaleLimit: {
                            min: 0.8,
                            max: 2
                        },
                        labelLayout: {
                            hideOverlap: true
                        },
                        focusNodeAdjacency: true,
                        edgeSymbol: ['', 'arrow'],
                        // edgeSymbolSize: [80, 10],
                        edgeLabel: {
                            overflow: 'truncate',
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 20
                                },
                                formatter(x) {
                                    return x.data.name;
                                },
                            }
                        },
                        label: {
                            show: true,
                            color: '#000'
                        },
                        force: {
                            repulsion: 250,
                            edgeLength: 130
                        },
                        data: showNodes,
                        links: showEdges,
                        categories: categories,
                        autoCurveness: 0.01, //多条边的时候，自动计算曲率
                    }]
                };

                this.chart.setOption(option);
                window.onresize = () => {
                    this.chart.resize();
                };
                let that = this;
                this.chart.on('click',  function(param) {
                    that.handleItemClick(param.data);
                });
            },
            formatterLabel(params, unit, color) {
                console.log(params);
                let tip = '';
                let colorIn = color ? color : '#D99CA8';
                tip = tip + '<span style="display:inline-block; margin-right:4px; border-radius:10px; width:10px; height:10px;' +
                    'background-color:' + colorIn + ';"></span>'
                tip = tip + '<span>' + params.data[0] + ':</span>' + '<span style="font-weight:bold">' + params.data[1]  + '</span>'
                return tip;
            },
            handleItemClick(param){
                if(param.hasOwnProperty('target')){
                    this.showRelationModal = true;
                    this.showRelationInfo = param;
                } else {
                    this.showEntityModal = true;
                    this.showEntityInfo = param;
                }
            },
            closeModal(changed){
                if(changed){
                    this.draw();
                }
                this.showEntityModal = false;
                this.showRelationModal = false;
            },
            downloadImage(chosenFileType){
                let imgUrl = this.chart.getDataURL({
                    type: chosenFileType,
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                });
                const imgLink = document.createElement('a');
                imgLink.download = '知识图谱.' + chosenFileType;
                imgLink.style.display = 'none';
                imgLink.href = imgUrl;
                document.body.appendChild(imgLink);
                imgLink.click();
                URL.revokeObjectURL(imgLink.href); // 释放URL 对象
                document.body.removeChild(imgLink)
            },
        },
    }
</script>

<style scoped lang="less">
.graph-box{
    height: 600px;
}
.margin-tb {
    padding-bottom: 80px;
    padding-top: 30px;
}
.a-select {
    border-color: #FFB8C6;
}
.a-select:hover {
    border-color: #D99CA8;
}
</style>
