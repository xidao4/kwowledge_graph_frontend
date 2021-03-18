const getters={
    showGraphEdges: state => state.graph.showGraphEdges,
    showGraphNodes: state => state.graph.showGraphNodes,
    graphInfo: state => state.graph.graphInfo,
    picId: state=>state.graph.picId,
    nodes: state=>state.graph.nodes,
    links: state=>state.graph.links,
    showGraphInfo: state => state.graph.showGraphInfo,
    relationTypeSet: state=>state.graph.relationTypeSet,

    colorList: state=>state.util.colorList,
};
export default getters
