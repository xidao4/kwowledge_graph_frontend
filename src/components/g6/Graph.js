import G6 from '@antv/g6';
import insertCss from 'insert-css';
import { isNumber, isArray } from '@antv/util';
import store from '../../store';
// Custom super node
insertCss(`
              .g6-component-contextmenu {
                position: absolute;
                z-index: 2;
                list-style-type: none;
                background-color: #363b40;
                border-radius: 6px;
                font-size: 14px;
                color: hsla(0,0%,100%,.85);
                width: fit-content;
                transition: opacity .2s;
                text-align: center;
                padding: 0px 20px 0px 20px;
                    box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
                    border: 0px;
              }
              .g6-component-contextmenu ul {
                    padding-left: 0px;
                    margin: 0;
              }
              .g6-component-contextmenu li {
                cursor: pointer;
                list-style-type: none;
                list-style: none;
                margin-left: 0;
                line-height: 38px;
              }
              .g6-component-contextmenu li:hover {
                color: #aaaaaa;
                }
              .g6-minimap-container {
                border: 1px solid #e2e2e2;
              }
              .g6-minimap-viewport {
                border: 2px solid rgb(25, 128, 255);
              }
            `);

const { labelPropagation, louvain, findShortestPath } = G6.Algorithm;
const { uniqueId } = G6.Util;

const NODESIZEMAPPING = 'degree';
const SMALLGRAPHLABELMAXLENGTH = 8;
let labelMaxLength = SMALLGRAPHLABELMAXLENGTH;
const DEFAULTNODESIZE = 25;
const DEFAULTAGGREGATEDNODESIZE = 53;
const NODE_LIMIT = 80; // TODO: find a proper number for maximum node number on the canvas

let graph = null;
let currentUnproccessedData = { nodes: [], edges: [] };
let nodeMap = {};
let aggregatedNodeMap = {};
let hiddenItemIds = [];
let largeGraphMode = true;
let cachePositions = {};
let manipulatePosition = undefined;
let descreteNodeCenter;
let layout = {
    type: '',
    instance: null,
    destroyed: true,
};
let expandArray = [];
let collapseArray = [];
let shiftKeydown = false;
let CANVAS_WIDTH = 800,
    CANVAS_HEIGHT = 800;

const duration = 2000;
const animateOpacity = 0.6;
const animateBackOpacity = 0.1;
const virtualEdgeOpacity = 0.1;
const realEdgeOpacity = 0.2;

const darkBackColor = '#D99CA8';
const disableColor = '#777';
const theme = 'dark';
const subjectColors = [
    '#5F95FF', // blue
    '#61DDAA',
    '#65789B',
    '#F6BD16',
    '#7262FD',
    '#78D3F8',
    '#9661BC',
    '#F6903D',
    '#008685',
    '#F08BB4',
];

const colorSets = G6.Util.getColorSetsBySubjectColors(
    subjectColors,
    darkBackColor,
    theme,
    disableColor,
);

const global = {
    node: {
        style: {
            fill: '#E65D6E',
            stroke: ''
        },
        labelCfg: {
            style: {
                fill: '#191b1c',
                // stroke: '#191b1c',
            },
        },
        stateStyles: {
            focus: {
                fill: '#2B384E',
            },
        },
    },
    edge: {
        style: {
            stroke: '#000',
            realEdgeStroke: '#ff0000', //'#f00',
            realEdgeOpacity,
            strokeOpacity: realEdgeOpacity,
        },
        labelCfg: {
            style: {
                fill: '#0f276e',
                realEdgeStroke: '#acaeaf', //'#f00',
                realEdgeOpacity: 0.5,
                stroke: '#fff',
            },
        },
        stateStyles: {
            focus: {
                stroke: '#fff', // '#3C9AE8',
            },
        },
    },
};

const hideItems = (graph) => {
    hiddenItemIds.forEach((id) => {
        graph.hideItem(id);
    });
};

const showItems = (graph) => {
    graph.getNodes().forEach((node) => {
        if (!node.isVisible()) graph.showItem(node);
    });
    graph.getEdges().forEach((edge) => {
        if (!edge.isVisible()) edge.showItem(edge);
    });
    hiddenItemIds = [];
};

const handleRefreshGraph = (
    graph,
    graphData,
    width,
    height,
    largeGraphMode,
    edgeLabelVisible,
    isNewGraph,
) => {
    if (!graphData || !graph) return;
    clearFocusItemState(graph);
    // reset the filtering
    graph.getNodes().forEach((node) => {
        if (!node.isVisible()) node.show();
    });
    graph.getEdges().forEach((edge) => {
        if (!edge.isVisible()) edge.show();
    });

    let nodes = [],
        edges = [];

    nodes = graphData.nodes;
    const processRes = processNodesEdges(
        nodes,
        graphData.edges || [],
        width,
        height,
        largeGraphMode,
        edgeLabelVisible,
        isNewGraph,
    );

    edges = processRes.edges;

    graph.changeData({ nodes, edges });

    hideItems(graph);
    graph.getNodes().forEach((node) => {
        node.toFront();
    });

    // layout.instance.stop();
    // force ?????????????????? id ???????????????????????????????????????????????????????????????????????????????????????????????????????????? force ???????????????
    layout.instance.init({
        nodes: graphData.nodes,
        edges,
    });

    layout.instance.minMovement = 0.0001;
    // layout.instance.getCenter = d => {
    // 	const cachePosition = cachePositions[d.id];
    // 	if (!cachePosition && (d.x || d.y)) return [d.x, d.y, 10];
    // 	else if (cachePosition) return [cachePosition.x, cachePosition.y, 10];
    // 	return [width / 2, height / 2, 10];
    // }
    layout.instance.getMass = (d) => {
        const cachePosition = cachePositions[d.id];
        if (cachePosition) return 5;
        return 1;
    };
    layout.instance.execute();
    return { nodes, edges };
};

const getMixedGraph = (
    aggregatedData,
    originData,
    nodeMap,
    aggregatedNodeMap,
    expandArray,
    collapseArray,
) => {
    let nodes = [],
        edges = [];

    const expandMap = {},
        collapseMap = {};
    expandArray.forEach((expandModel) => {
        expandMap[expandModel.id] = true;
    });
    collapseArray.forEach((collapseModel) => {
        collapseMap[collapseModel.id] = true;
    });

    aggregatedData.clusters.forEach((cluster, i) => {
        if (expandMap[cluster.id]) {
            nodes = nodes.concat(cluster.nodes);
            aggregatedNodeMap[cluster.id].expanded = true;
        } else {
            nodes.push(aggregatedNodeMap[cluster.id]);
            aggregatedNodeMap[cluster.id].expanded = false;
        }
    });
    originData.edges.forEach((edge) => {
        const isSourceInExpandArray = expandMap[nodeMap[edge.source].clusterId];
        const isTargetInExpandArray = expandMap[nodeMap[edge.target].clusterId];
        if (isSourceInExpandArray && isTargetInExpandArray) {
            edges.push(edge);
        } else if (isSourceInExpandArray) {
            const targetClusterId = nodeMap[edge.target].clusterId;
            const vedge = {
                source: edge.source,
                target: targetClusterId,
                id: `edge-${uniqueId()}`,
                label: '',
            };
            edges.push(vedge);
        } else if (isTargetInExpandArray) {
            const sourceClusterId = nodeMap[edge.source].clusterId;
            const vedge = {
                target: edge.target,
                source: sourceClusterId,
                id: `edge-${uniqueId()}`,
                label: '',
            };
            edges.push(vedge);
        }
    });
    aggregatedData.clusterEdges.forEach((edge) => {
        if (expandMap[edge.source] || expandMap[edge.target]) return;
        else edges.push(edge);
    });
    return { nodes, edges };
};

const getNeighborMixedGraph = (
    centerNodeModel,
    step,
    originData,
    clusteredData,
    currentData,
    nodeMap,
    aggregatedNodeMap,
    maxNeighborNumPerNode = 5,
) => {
    // update the manipulate position for center gravity of the new nodes
    manipulatePosition = { x: centerNodeModel.x, y: centerNodeModel.y };

    // the neighborSubGraph does not include the centerNodeModel. the elements are all generated new nodes and edges
    const neighborSubGraph = generateNeighbors(centerNodeModel, step, maxNeighborNumPerNode);
    // update the origin data
    originData.nodes = originData.nodes.concat(neighborSubGraph.nodes);
    originData.edges = originData.edges.concat(neighborSubGraph.edges);
    // update the origin nodeMap
    neighborSubGraph.nodes.forEach((node) => {
        nodeMap[node.id] = node;
    });
    // update the clusteredData
    const clusterId = centerNodeModel.clusterId;
    clusteredData.clusters.forEach((cluster) => {
        if (cluster.id !== clusterId) return;
        cluster.nodes = cluster.nodes.concat(neighborSubGraph.nodes);
        cluster.sumTot += neighborSubGraph.edges.length;
    });
    // update the count
    aggregatedNodeMap[clusterId].count += neighborSubGraph.nodes.length;

    currentData.nodes = currentData.nodes.concat(neighborSubGraph.nodes);
    currentData.edges = currentData.edges.concat(neighborSubGraph.edges);
    return currentData;
};

const generateNeighbors = (centerNodeModel, step, maxNeighborNumPerNode = 5) => {
    if (step <= 0) return undefined;
    let nodes = [],
        edges = [];
    const clusterId = centerNodeModel.clusterId;
    const centerId = centerNodeModel.id;
    const neighborNum = Math.ceil(Math.random() * maxNeighborNumPerNode);
    for (let i = 0; i < neighborNum; i++) {
        const neighborNode = {
            id: uniqueId(),
            clusterId,
            level: 0,
            colorSet: centerNodeModel.colorSet,
        };
        nodes.push(neighborNode);
        const dire = Math.random() > 0.5;
        const source = dire ? centerId : neighborNode.id;
        const target = dire ? neighborNode.id : centerId;
        const neighborEdge = {
            id: uniqueId(),
            source,
            target,
            label: `${source}-${target}`,
        };
        edges.push(neighborEdge);
        const subNeighbors = generateNeighbors(neighborNode, step - 1, maxNeighborNumPerNode);
        if (subNeighbors) {
            nodes = nodes.concat(subNeighbors.nodes);
            edges = edges.concat(subNeighbors.edges);
        }
    }
    return { nodes, edges };
};


const examAncestors = (model, expandedArray, length, keepTags) => {
    for (let i = 0; i < length; i++) {
        const expandedNode = expandedArray[i];
        if (!keepTags[i] && model.parentId === expandedNode.id) {
            keepTags[i] = true; // ???????????????
            examAncestors(expandedNode, expandedArray, length, keepTags);
            break;
        }
    }
};

const manageExpandCollapseArray = (nodeNumber, model, collapseArray, expandArray) => {
    manipulatePosition = { x: model.x, y: model.y };

    // ?????? expandArray???????????????????????????????????????????????? expandedArray ?????? model ???????????????)
    if (nodeNumber > NODE_LIMIT) {
        // ??? keepTags[i] ??? true?????? expandedArray ?????? i ????????????????????????
        const keepTags = {};
        const expandLen = expandArray.length;
        // ?????? X ???????????????????????? keepTags
        examAncestors(model, expandArray, expandLen, keepTags);
        // ?????? expandedArray ???????????? keepTags ?????? true ??????
        let shiftNodeIdx = -1;
        for (let i = 0; i < expandLen; i++) {
            if (!keepTags[i]) {
                shiftNodeIdx = i;
                break;
            }
        }
        // ?????????????????????????????????????????? expandedArray ?????????
        if (shiftNodeIdx !== -1) {
            let foundNode = expandArray[shiftNodeIdx];
            if (foundNode.level === 2) {
                let foundLevel1 = false;
                // ?????? expandedArray ??? parentId = foundNode.id ??? level = 1 ??????????????????
                for (let i = 0; i < expandLen; i++) {
                    const eNode = expandArray[i];
                    if (eNode.parentId === foundNode.id && eNode.level === 1) {
                        foundLevel1 = true;
                        foundNode = eNode;
                        expandArray.splice(i, 1);
                        break;
                    }
                }
                // ?????????????????? foundNode ??????, ???????????? foundNode
                if (!foundLevel1) expandArray.splice(shiftNodeIdx, 1);
            } else {
                // ???????????? foundNode
                expandArray.splice(shiftNodeIdx, 1);
            }
            // const removedNode = expandedArray.splice(shiftNodeIdx, 1); // splice returns an array
            const idSplits = foundNode.id.split('-');
            let collapseNodeId;
            // ????????????????????????
            for (let i = 0; i < idSplits.length - 1; i++) {
                const str = idSplits[i];
                if (collapseNodeId) collapseNodeId = `${collapseNodeId}-${str}`;
                else collapseNodeId = str;
            }
            const collapseNode = {
                id: collapseNodeId,
                parentId: foundNode.id,
                level: foundNode.level - 1,
            };
            collapseArray.push(collapseNode);
        }
    }

    const currentNode = {
        id: model.id,
        level: model.level,
        parentId: model.parentId,
    };

    // ?????????????????????????????????
    expandArray.push(currentNode);

    graph.get('canvas').setCursor('default');
    return { expandArray, collapseArray };
};

const cacheNodePositions = (nodes) => {
    const positionMap = {};
    const nodeLength = nodes.length;
    for (let i = 0; i < nodeLength; i++) {
        const node = nodes[i].getModel();
        positionMap[node.id] = {
            x: node.x,
            y: node.y,
            level: node.level,
        };
    }
    return positionMap;
};

const stopLayout = () => {
    layout.instance.stop();
};

const descendCompare = (p) => {
    // ??????????????????
    return function (m, n) {
        const a = m[p];
        const b = n[p];
        return b - a; // ??????
    };
};

const clearFocusItemState = (graph) => {
    if (!graph) return;
    clearFocusNodeState(graph);
    clearFocusEdgeState(graph);
};

// ??????????????????????????? focus ?????????????????????
const clearFocusNodeState = (graph) => {
    const focusNodes = graph.findAllByState('node', 'focus');
    focusNodes.forEach((fnode) => {
        graph.setItemState(fnode, 'focus', false); // false
    });
};

// ???????????????????????? focus ?????????????????????
const clearFocusEdgeState = (graph) => {
    const focusEdges = graph.findAllByState('edge', 'focus');
    focusEdges.forEach((fedge) => {
        graph.setItemState(fedge, 'focus', false);
    });
};

// ??????????????????length ???????????????????????????elipsis ?????????
export const formatText = (text, length = 5, elipsis = '...') => {
    if (!text) return '';
    if (text.length > length) {
        return `${text.substr(0, length)}${elipsis}`;
    }
    return text;
};

export const labelFormatter = (text, minLength = 10) => {
    if (text && text.split('').length > minLength) return `${text.substr(0, minLength)}...`;
    return text;
};

export const processNodesEdges = (
    nodes,
    edges,
    width,
    height,
    edgeLabelVisible,
) => {
    const currentNodeMap = {};
    let maxNodeCount = -Infinity;
    const paddingRatio = 0.3;
    const paddingLeft = paddingRatio * width;
    const paddingTop = paddingRatio * height;
    if (!nodes || nodes.length === 0) return {};
    let combosList = [];
    nodes.forEach((node) => {
        node.oriLabel = node.label;
        node.label = formatText(node.label, labelMaxLength, '...');
        node.size = DEFAULTNODESIZE;
        node.comboId = node.class;
        if(combosList.indexOf(node.comboId) === -1){
            combosList.push(node.comboId);
        }
        node.style = {
            fill: '#E65D6E',
            stroke: '#D99CA8',
            lineWidth: 1
        };
        node.labelCfg = {
            // position: 'cen',
            offset: 5,
            style: {
                fill: global.node.labelCfg.style.fill,
                fontSize: 12,
                stroke: global.node.labelCfg.style.stroke,
                lineWidth: 3,
            },
        };
        // TODO ????????????
        node.stateStyles = {
            selected: {
                shadowColor: node.style.fill,
                lineWidth: 0,
                fill: node.style.fill,
                shadowBlur: 15,
                // stroke: '#f00'
            },
            highlight: {
                fill: 'rgb(223, 234, 255)',
                // stroke: '#4572d9',
                stroke:'#ff0',
                lineWidth: 2,
                // text-shape: {
                //     fontWeight: 500
                // }
            },
        };
        if (currentNodeMap[node.id]) {
            console.warn('node exists already!', node.id);
            node.id = `${node.id}${Math.random()}`;
        }
        currentNodeMap[node.id] = node;
    });

    edges.forEach((edge) => {
        edge.oriLabel = edge.label;
        if(edgeLabelVisible){
            edge.label = labelFormatter(edge.label, labelMaxLength);
        } else {
            edge.label = '';
        }
        edge.style = {
            stroke: '#D99CA8',
            // strokeOpacity: global.edge.style.realEdgeOpacity,
            cursor: 'pointer',
            lineAppendWidth: Math.max(edge.size || 5, 5),
            fillOpacity: 1,
            endArrow: {
                path: G6.Arrow.triangle(),
                fill: "#D99CA8"
            },
        };
        edge.labelCfg = {
            autoRotate: true,
            style: {
                stroke: global.edge.labelCfg.style.stroke,
                fill: global.edge.labelCfg.style.fill,
                lineWidth: 4,
                fontSize: 12,
                lineAppendWidth: 10,
                opacity: 1,
            },
        };
        edge.stateStyles = {
            selected: {
                shadowColor: edge.style.endArrow.fill,
                fill: edge.style.endArrow.fill,
                shadowBlur: 5,
                stroke: edge.style.endArrow.fill
            },
            noneLabel: {
                fill: '#fff',
                stroke: '#fff'
            },
            highlight:{
                // fill: 'rgb(223, 234, 255)',
                stroke:'#ff0',
                lineWidth: 2,
            }
        };
    });
    let combos = [];
    combosList.forEach(combo => {
        combos.push({
            id: combo,
            label: combo
        })
    });

    G6.Util.processParallelEdges(edges);
    return {
        edges,
        nodes,
        combos
    };
};

export function processCombos(
    nodes
) {
    let combosList = [];
    console.log('nodes=========================', nodes);
    nodes.forEach((node) => {
        node.comboId = node.class;
        if(combosList.indexOf(node.comboId) === -1){
            combosList.push(node.comboId);
        }
    });
    let combos = [];
    combosList.forEach(combo => {
        combos.push({
            id: combo,
            label: combo
        })
    });
    return {
        nodes, combos
    }
}

export const bindListener = (graph) => {
    function refreshDragedNodePosition(e) {
        const model = e.item.get('model');
        model.fx = e.x;
        model.fy = e.y;
    }
    function clearAllClickedState(){
        graph.findAllByState('node', 'selected').forEach((node) => {
            graph.setItemState(node, 'selected', false);
        });
        graph.findAllByState('edge', 'selected').forEach((edge) => {
            graph.setItemState(edge, 'selected', false);
        });
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
        graph.getCombos().forEach((combo) => {
            graph.setItemState(combo, 'dragenter', false);
        });
    });
    graph.on('node:click', (e) => {
        clearAllClickedState();
        graph.setItemState(e.item, 'selected', true);
        store.commit('set_currentItem', e.item);
        store.commit('set_currentShowBoard', store.state.graph.boardTypes.entityEdit);
    });
    graph.on('edge:click', (e) => {
        clearAllClickedState();
        graph.setItemState(e.item, 'selected', true);
        store.commit('set_currentItem', e.item);
        store.commit('set_currentShowBoard', store.state.graph.boardTypes.relationEdit);
    });
    graph.on('canvas:click', (e) => {
        clearAllClickedState();
        store.commit('set_currentShowBoard', store.state.graph.boardTypes.pie);
    });
    // graph.on('combo:click', (e) => {
    //     console.log('selected')
    //     graph.setItemState(e.item, 'selected', true);
    // });
    graph.on('combo:dragend', (e) => {
        graph.getCombos().forEach((combo) => {
            graph.setItemState(combo, 'dragenter', false);
        });
    });
    graph.on('combo:dragenter', (e) => {
        // console.log('dragenter')
        graph.setItemState(e.item, 'dragenter', true);
    });
    graph.on('combo:dragleave', (e) => {
        // console.log('dragleave')
        graph.setItemState(e.item, 'dragenter', false);
    });
    graph.on('combo:mouseenter', (evt) => {
        // console.log('active')
        const { item } = evt;
        graph.setItemState(item, 'active', true);
    });
    graph.on('combo:mouseleave', (evt) => {
        const { item } = evt;
        graph.setItemState(item, 'active', false);
    });
};

export const setHighlight=(graph,searchNodes,searchEdges)=>{
    searchNodes.forEach((node)=>{
        console.log('5555 setHighlight: node',node);
        // let mapNode=new Map(Object.entries(node));
        // console.log('5555 setHighlight new Map(node)',mapNode);
        graph.setItemState(graph.findById(node.id),'highlight',true);
    })
    searchEdges.forEach((edge)=>{
        console.log('5555 setHighlight: edge',edge);
        graph.setItemState(graph.findById(edge.id),'highlight',true);
    })
}
export const cancelHighlight=(graph,searchNodes,searchEdges)=>{
    searchNodes.forEach((node)=>{
        graph.setItemState(graph.findById(node.id),'highlight',false);
    })
    searchEdges.forEach((edge)=>{
        graph.setItemState(graph.findById(edge.id),'highlight',false);
    })
}
export const hideItem=(graph,type)=>{
    console.log('4444 tag|????????????',type);
    const nodesByType=graph.findAll('node',(node)=>{
        console.log('4444 node',node);
        console.log('4444 node.class',node.get('model').class);
        return node.get('model').class===type;
    })
    console.log('4444 hideItem',nodesByType);
    nodesByType.forEach((node)=>{
        graph.hideItem(node);
    })
}
export const showItem=(graph,type)=>{
    console.log('4444 tag|????????????',type);
    const nodesByType=graph.findAll('node',(node)=>{
        return node.get('model').class===type;
    })
    console.log('4444 showItem',nodesByType);
    nodesByType.forEach((node)=>{
        graph.showItem(node);
    })
}

export const cssStr = `
  .g6-component-tooltip {
    position: absolute;
    z-index: 2;
    list-style-type: none;
    background-color: #363b40;
    border-radius: 6px;
    font-size: 14px;
    color: hsla(0,0%,100%,.85);
    width: fit-content;
    transition: opacity .2s;
    padding: 0px 20px 0px 20px;
        box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
        border: 0px;
  }
  .g6-component-tooltip ul {
        padding-left: 0px;
        margin: 0;
  }
  .g6-component-tooltip li {
    cursor: pointer;
    list-style-type: none;
    list-style: none;
    margin-left: 0;
    line-height: 38px;
  }
  .g6-component-tooltip li:hover {
    color: #aaaaaa;
  }
`;
