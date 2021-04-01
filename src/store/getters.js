const getters={
    showGraphEdges: state => state.graph.showGraphEdges,
    showGraphNodes: state => state.graph.showGraphNodes,
    graphInfo: state => state.graph.graphInfo,
    picId: state=>state.graph.picId,
    nodes: state=>state.graph.nodes,
    links: state=>state.graph.links,
    showGraphInfo: state => state.graph.showGraphInfo,
    relationTypeSet: state=>state.graph.relationTypeSet,
    currentPicId: state=>state.graph.currentPicId,
    currentGraph: state=>state.graph.currentGraph,
    currentGraphId: state=>state.graph.currentGraphId,
    graphIds: state=>state.graph.graphIds,
    forceGraph: state=>state.graph.forceGraph,
    typesettingGraph: state=>state.graph.typesettingGraph,
    showDownloadImgModal: state=>state.graph.showDownloadImgModal,
    showDownloadFileModal: state=>state.graph.showDownloadFileModal,
    currentSetLayout: state=>state.graph.currentSetLayout,
    forceGraphRatio: state=>state.graph.forceGraphRatio,
    typesettingGraphRatio: state=>state.graph.typesettingGraphRatio,
    forceLayout: state=>state.graph.forceLayout,
    layoutType: state=>state.graph.layoutType,

    colorList: state=>state.util.colorList,

    userId: state=>state.user.userId,
    userInfo: state=>state.user.userInfo,
};
export default getters
