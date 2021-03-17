<template>
    <div>
        <a-row type="flex" justify="center">
            <a-col :span="20">
                <a-card :id="graphId" class="graph-box"></a-card>
            </a-col>
        </a-row>
        <a-row type="flex" justify="center" class="margin-tb">
            <a-col :span="4">
                <a-dropdown>
                    <a-menu slot="overlay" @click="handleTypeChange">
                        <a-menu-item :key="item.value" v-for="(item, index) in downloadFileType">
                            <a-icon :type="item.icon" />
                            {{item.type}}
                        </a-menu-item>
                    </a-menu>
                    <a-button type="primary" icon="download" style="margin-left: 8px"> 下载 <a-icon type="down" /> </a-button>
                </a-dropdown>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    export default {
        name: "Graph",
        components: {ACol, ARow},
        data(){
            return {
                graphId: 'graphChart',
                chart: null,
                downloadFileType: [
                    {
                        type: 'PNG图片文件',
                        value: 'png',
                        icon: 'file-image'
                    },
                    {
                        type: 'JPEG图片',
                        value: 'jpeg',
                        icon: 'file-image'
                    },
                    {
                        type: 'XML文件',
                        value: 'xml',
                        icon: 'file-excel'
                    },
                    {
                        type: 'RDF文件',
                        value: 'rdf',
                        icon: 'file-text'
                    },
                ],
                chosenFileType: ''
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
                console.log(showNodes)
                let option = {
                    color: legendColor,
                    legend: {
                        show: true,
                        data: legend,
                        textStyle: {
                            color: "#000",
                            fontSize: 10
                        },
                        // inactiveColor: "#fff",
                        icon: "circle",
                        // type: "scroll",
                        // orient: "vertical",
                        // left: "right",
                        pageIconColor: "#000",
                        pageIconInactiveColor: "#000",
                        pageIconSize: 12,
                        pageTextStyle: {
                            color: "#000",
                            fontSize: 12
                        }
                    },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        symbolSize: 58,
                        draggable: true,
                        roam: false,
                        nodeScaleRatio: 0.6,
                        focusNodeAdjacency: true,
                        edgeSymbol: ['', 'arrow'],
                        // edgeSymbolSize: [80, 10],
                        edgeLabel: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 20
                                },
                                formatter(x) {
                                    console.log(x)
                                    return x.data.name;
                                }
                            }
                        },
                        label: {
                            show: true,
                            color: '#000'
                        },
                        force: {
                            repulsion: 1000,
                            edgeLength: 200
                        },
                        data: showNodes,
                        links: showEdges,
                        categories: categories,
                        animationDuration: 1500,
                        animationEasingUpdate: "quinticInOut",
                    }]
                };

                this.chart.setOption(option);
                window.onresize = () => {
                    this.chart.resize();
                };
                this.chart.on('click',  function(param) {
                    this.handleItemClick(param);
                });
            },
            handleTypeChange(value) {
                this.chosenFileType = value.key;
                this.downloadImage();
            },
            handleItemClick(param){

            },
            downloadImage(){
                let imgUrl = this.chart.getDataURL({
                    type: this.chosenFileType,
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                });
                const imgLink = document.createElement('a');
                imgLink.download = '知识图谱.' + this.chosenFileType;
                imgLink.style.display = 'none';
                imgLink.href = imgUrl;
                document.body.appendChild(imgLink);
                imgLink.click();
                URL.revokeObjectURL(imgLink.href); // 释放URL 对象
                document.body.removeChild(imgLink)
            }
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
