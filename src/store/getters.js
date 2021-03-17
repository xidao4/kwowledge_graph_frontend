const getters={
    showGraphEdges: state => state.graph.showGraphEdges,
    showGraphNodes: state => state.graph.showGraphNodes,
    graphInfo: state => state.graph.graphInfo,
    showGraphInfo: state => state.graph.showGraphInfo,
    colorList: state=>state.util.colorList
};
export default getters
