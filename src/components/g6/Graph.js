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

// Custom super node
G6.registerNode(
    'aggregated-node',
    {
        draw(cfg, group) {
            let width = 53,
                height = 27;
            const style = cfg.style || {};
            const colorSet = cfg.colorSet || colorSets[0];

            // halo for hover
            group.addShape('rect', {
                attrs: {
                    x: -width * 0.55,
                    y: -height * 0.6,
                    width: width * 1.1,
                    height: height * 1.2,
                    fill: colorSet.mainFill,
                    opacity: 0.9,
                    lineWidth: 0,
                    radius: (height / 2 || 13) * 1.2,
                },
                name: 'halo-shape',
                visible: false,
            });

            // focus stroke for hover
            group.addShape('rect', {
                attrs: {
                    x: -width * 0.55,
                    y: -height * 0.6,
                    width: width * 1.1,
                    height: height * 1.2,
                    fill: colorSet.mainFill, // '#3B4043',
                    stroke: '#AAB7C4',
                    lineWidth: 1,
                    lineOpacty: 0.85,
                    radius: (height / 2 || 13) * 1.2,
                },
                name: 'stroke-shape',
                visible: false,
            });

            const keyShape = group.addShape('rect', {
                attrs: {
                    ...style,
                    x: -width / 2,
                    y: -height / 2,
                    width,
                    height,
                    fill: colorSet.mainFill, // || '#3B4043',
                    stroke: colorSet.mainStroke,
                    lineWidth: 2,
                    cursor: 'pointer',
                    radius: height / 2 || 13,
                    lineDash: [2, 2],
                },
                name: 'aggregated-node-keyShape',
            });

            let labelStyle = {};
            if (cfg.labelCfg) {
                labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
            }
            group.addShape('text', {
                attrs: {
                    text: `${cfg.count}`,
                    x: 0,
                    y: 0,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    cursor: 'pointer',
                    fontSize: 12,
                    fill: '#fff',
                    opacity: 0.85,
                    fontWeight: 400,
                },
                name: 'count-shape',
                className: 'count-shape',
                draggable: true,
            });

            // tag for new node
            if (cfg.new) {
                group.addShape('circle', {
                    attrs: {
                        x: width / 2 - 3,
                        y: -height / 2 + 3,
                        r: 4,
                        fill: '#e24a5d',
                        lineWidth: 0.5,
                        stroke: '#FFFFFF',
                    },
                    name: 'typeNode-tag-circle',
                });
            }
            return keyShape;
        },
        setState: (name, value, item) => {
            const group = item.get('group');
            if (name === 'layoutEnd' && value) {
                const labelShape = group.find((e) => e.get('name') === 'text-shape');
                if (labelShape) labelShape.set('visible', true);
            } else if (name === 'hover') {
                if (item.hasState('focus')) {
                    return;
                }
                const halo = group.find((e) => e.get('name') === 'halo-shape');
                const keyShape = item.getKeyShape();
                const colorSet = item.getModel().colorSet || colorSets[0];
                if (value) {
                    halo && halo.show();
                    keyShape.attr('fill', colorSet.activeFill);
                } else {
                    halo && halo.hide();
                    keyShape.attr('fill', colorSet.mainFill);
                }
            } else if (name === 'focus') {
                const stroke = group.find((e) => e.get('name') === 'stroke-shape');
                const keyShape = item.getKeyShape();
                const colorSet = item.getModel().colorSet || colorSets[0];
                if (value) {
                    stroke && stroke.show();
                    keyShape.attr('fill', colorSet.selectedFill);
                } else {
                    stroke && stroke.hide();
                    keyShape.attr('fill', colorSet.mainFill);
                }
            }
        },
        update: undefined,
    },
    'single-node',
);

// Custom real node
G6.registerNode(
    'real-node',
    {
        draw(cfg, group) {
            let r = 30;
            if (isNumber(cfg.size)) {
                r = cfg.size / 2;
            } else if (isArray(cfg.size)) {
                r = cfg.size[0] / 2;
            }
            const style = cfg.style || {};
            const colorSet = cfg.colorSet || colorSets[0];

            // halo for hover
            group.addShape('circle', {
                attrs: {
                    x: 0,
                    y: 0,
                    r: r + 5,
                    fill: style.fill || colorSet.mainFill || '#2B384E',
                    opacity: 0.9,
                    lineWidth: 0,
                },
                name: 'halo-shape',
                visible: false,
            });

            // focus stroke for hover
            group.addShape('circle', {
                attrs: {
                    x: 0,
                    y: 0,
                    r: r + 5,
                    fill: style.fill || colorSet.mainFill || '#2B384E',
                    stroke: '#fff',
                    strokeOpacity: 0.85,
                    lineWidth: 1,
                },
                name: 'stroke-shape',
                visible: false,
            });

            const keyShape = group.addShape('circle', {
                attrs: {
                    ...style,
                    x: 0,
                    y: 0,
                    r,
                    fill: colorSet.mainFill,
                    stroke: colorSet.mainStroke,
                    lineWidth: 2,
                    cursor: 'pointer',
                },
                name: 'aggregated-node-keyShape',
            });

            let labelStyle = {};
            if (cfg.labelCfg) {
                labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
            }

            if (cfg.label) {
                const text = cfg.label;
                let labelStyle = {};
                let refY = 0;
                if (cfg.labelCfg) {
                    labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
                    refY += cfg.labelCfg.refY || 0;
                }
                let offsetY = 0;
                const fontSize = labelStyle.fontSize < 8 ? 8 : labelStyle.fontSize;
                const lineNum = cfg.labelLineNum || 1;
                offsetY = lineNum * (fontSize || 12);
                group.addShape('text', {
                    attrs: {
                        text,
                        x: 0,
                        y: r + refY + offsetY + 5,
                        textAlign: 'center',
                        textBaseLine: 'alphabetic',
                        cursor: 'pointer',
                        fontSize,
                        fill: '#000',
                        opacity: 0.85,
                        fontWeight: 400,
                        stroke: global.edge.labelCfg.style.stroke,
                    },
                    name: 'text-shape',
                    className: 'text-shape',
                });
            }

            // tag for new node
            if (cfg.new) {
                group.addShape('circle', {
                    attrs: {
                        x: r - 3,
                        y: -r + 3,
                        r: 4,
                        fill: '#e24a5d',
                        lineWidth: 0.5,
                        stroke: '#FFFFFF',
                    },
                    name: 'typeNode-tag-circle',
                });
            }

            return keyShape;
        },
        setState: (name, value, item) => {
            const group = item.get('group');
            if (name === 'layoutEnd' && value) {
                const labelShape = group.find((e) => e.get('name') === 'text-shape');
                if (labelShape) labelShape.set('visible', true);
            } else if (name === 'hover') {
                if (item.hasState('focus')) {
                    return;
                }
                const halo = group.find((e) => e.get('name') === 'halo-shape');
                const keyShape = item.getKeyShape();
                const colorSet = item.getModel().colorSet || colorSets[0];
                if (value) {
                    halo && halo.show();
                    keyShape.attr('fill', colorSet.activeFill);
                } else {
                    halo && halo.hide();
                    keyShape.attr('fill', colorSet.mainFill);
                }
            } else if (name === 'focus') {
                const stroke = group.find((e) => e.get('name') === 'stroke-shape');
                const label = group.find((e) => e.get('name') === 'text-shape');
                const keyShape = item.getKeyShape();
                const colorSet = item.getModel().colorSet || colorSets[0];
                if (value) {
                    stroke && stroke.show();
                    keyShape.attr('fill', colorSet.selectedFill);
                    label && label.attr('fontWeight', 800);
                } else {
                    stroke && stroke.hide();
                    keyShape.attr('fill', colorSet.mainFill); // '#2B384E'
                    label && label.attr('fontWeight', 400);
                }
            }
        },
        update: undefined,
    },
    'aggregated-node',
); // 这样可以继承 aggregated-node 的 setState

// Custom the quadratic edge for multiple edges between one node pair
G6.registerEdge(
    'custom-quadratic',
    {
        setState: (name, value, item) => {
            const group = item.get('group');
            const model = item.getModel();
            if (name === 'focus') {
                const back = group.find((ele) => ele.get('name') === 'back-line');
                if (back) {
                    back.stopAnimate();
                    back.remove();
                    back.destroy();
                }
                const keyShape = group.find((ele) => ele.get('name') === 'edge-shape');
                const arrow = model.style.endArrow;
                if (value) {
                    if (keyShape.cfg.animation) {
                        keyShape.stopAnimate(true);
                    }
                    keyShape.attr({
                        strokeOpacity: animateOpacity,
                        opacity: animateOpacity,
                        stroke: '#000',
                        endArrow: {
                            ...arrow,
                            stroke: '#000',
                            fill: '#000',
                        },
                    });
                    if (model.isReal) {
                        const { lineWidth, path, endArrow, stroke } = keyShape.attr();
                        const back = group.addShape('path', {
                            attrs: {
                                lineWidth,
                                path,
                                stroke,
                                endArrow,
                                opacity: animateBackOpacity,
                            },
                            name: 'back-line',
                        });
                        back.toBack();
                        const length = keyShape.getTotalLength();
                        keyShape.animate(
                            (ratio) => {
                                // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
                                const startLen = ratio * length;
                                // Calculate the lineDash
                                const cfg = {
                                    lineDash: [startLen, length - startLen],
                                };
                                return cfg;
                            },
                            {
                                repeat: true, // Whether executes the animation repeatly
                                duration, // the duration for executing once
                            },
                        );
                    } else {
                        let index = 0;
                        const lineDash = keyShape.attr('lineDash');
                        const totalLength = lineDash[0] + lineDash[1];
                        keyShape.animate(
                            () => {
                                index++;
                                if (index > totalLength) {
                                    index = 0;
                                }
                                const res = {
                                    lineDash,
                                    lineDashOffset: -index,
                                };
                                // returns the modified configurations here, lineDash and lineDashOffset here
                                return res;
                            },
                            {
                                repeat: true, // whether executes the animation repeatly
                                duration, // the duration for executing once
                            },
                        );
                    }
                } else {
                    keyShape.stopAnimate();
                    const stroke = '#acaeaf';
                    const opacity = model.isReal ? realEdgeOpacity : virtualEdgeOpacity;
                    keyShape.attr({
                        stroke,
                        strokeOpacity: opacity,
                        opacity,
                        endArrow: {
                            ...arrow,
                            stroke,
                            fill: stroke,
                        },
                    });
                }
            }
        },
    },
    'quadratic',
);

// Custom the line edge for single edge between one node pair
G6.registerEdge(
    'custom-line',
    {
        setState: (name, value, item) => {
            const group = item.get('group');
            const model = item.getModel();
            if (name === 'focus') {
                const keyShape = group.find((ele) => ele.get('name') === 'edge-shape');
                const back = group.find((ele) => ele.get('name') === 'back-line');
                if (back) {
                    back.stopAnimate();
                    back.remove();
                    back.destroy();
                }
                const arrow = model.style.endArrow;
                if (value) {
                    if (keyShape.cfg.animation) {
                        keyShape.stopAnimate(true);
                    }
                    keyShape.attr({
                        strokeOpacity: animateOpacity,
                        opacity: animateOpacity,
                        stroke: '#000',
                        endArrow: {
                            ...arrow,
                            stroke: '#000',
                            fill: '#000',
                        },
                    });
                    if (model.isReal) {
                        const { path, stroke, lineWidth } = keyShape.attr();
                        const back = group.addShape('path', {
                            attrs: {
                                path,
                                stroke,
                                lineWidth,
                                opacity: animateBackOpacity,
                            },
                            name: 'back-line',
                        });
                        back.toBack();
                        const length = keyShape.getTotalLength();
                        keyShape.animate(
                            (ratio) => {
                                // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
                                const startLen = ratio * length;
                                // Calculate the lineDash
                                const cfg = {
                                    lineDash: [startLen, length - startLen],
                                };
                                return cfg;
                            },
                            {
                                repeat: true, // Whether executes the animation repeatly
                                duration, // the duration for executing once
                            },
                        );
                    } else {
                        const lineDash = keyShape.attr('lineDash');
                        const totalLength = lineDash[0] + lineDash[1];
                        let index = 0;
                        keyShape.animate(
                            () => {
                                index++;
                                if (index > totalLength) {
                                    index = 0;
                                }
                                const res = {
                                    lineDash,
                                    lineDashOffset: -index,
                                };
                                // returns the modified configurations here, lineDash and lineDashOffset here
                                return res;
                            },
                            {
                                repeat: true, // whether executes the animation repeatly
                                duration, // the duration for executing once
                            },
                        );
                    }
                } else {
                    keyShape.stopAnimate();
                    const stroke = '#E65D6E';
                    const opacity = model.isReal ? realEdgeOpacity : virtualEdgeOpacity;
                    keyShape.attr({
                        stroke,
                        strokeOpacity: opacity,
                        opacity: opacity,
                        endArrow: {
                            ...arrow,
                            stroke,
                            fill: stroke,
                        },
                    });
                }
            }
        },
    },
    'single-edge',
);

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
    // force 需要使用不同 id 的对象才能进行全新的布局，否则会使用原来的引用。因此复制一份节点和边作为 force 的布局数据
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
            keepTags[i] = true; // 需要被保留
            examAncestors(expandedNode, expandedArray, length, keepTags);
            break;
        }
    }
};

const manageExpandCollapseArray = (nodeNumber, model, collapseArray, expandArray) => {
    manipulatePosition = { x: model.x, y: model.y };

    // 维护 expandArray，若当前画布节点数高于上限，移出 expandedArray 中非 model 祖先的节点)
    if (nodeNumber > NODE_LIMIT) {
        // 若 keepTags[i] 为 true，则 expandedArray 的第 i 个节点需要被保留
        const keepTags = {};
        const expandLen = expandArray.length;
        // 检查 X 的所有祖先并标记 keepTags
        examAncestors(model, expandArray, expandLen, keepTags);
        // 寻找 expandedArray 中第一个 keepTags 不为 true 的点
        let shiftNodeIdx = -1;
        for (let i = 0; i < expandLen; i++) {
            if (!keepTags[i]) {
                shiftNodeIdx = i;
                break;
            }
        }
        // 如果有符合条件的节点，将其从 expandedArray 中移除
        if (shiftNodeIdx !== -1) {
            let foundNode = expandArray[shiftNodeIdx];
            if (foundNode.level === 2) {
                let foundLevel1 = false;
                // 找到 expandedArray 中 parentId = foundNode.id 且 level = 1 的第一个节点
                for (let i = 0; i < expandLen; i++) {
                    const eNode = expandArray[i];
                    if (eNode.parentId === foundNode.id && eNode.level === 1) {
                        foundLevel1 = true;
                        foundNode = eNode;
                        expandArray.splice(i, 1);
                        break;
                    }
                }
                // 若未找到，则 foundNode 不变, 直接删去 foundNode
                if (!foundLevel1) expandArray.splice(shiftNodeIdx, 1);
            } else {
                // 直接删去 foundNode
                expandArray.splice(shiftNodeIdx, 1);
            }
            // const removedNode = expandedArray.splice(shiftNodeIdx, 1); // splice returns an array
            const idSplits = foundNode.id.split('-');
            let collapseNodeId;
            // 去掉最后一个后缀
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

    // 加入当前需要展开的节点
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
    // 这是比较函数
    return function (m, n) {
        const a = m[p];
        const b = n[p];
        return b - a; // 降序
    };
};

const clearFocusItemState = (graph) => {
    if (!graph) return;
    clearFocusNodeState(graph);
    clearFocusEdgeState(graph);
};

// 清除图上所有节点的 focus 状态及相应样式
const clearFocusNodeState = (graph) => {
    const focusNodes = graph.findAllByState('node', 'focus');
    focusNodes.forEach((fnode) => {
        graph.setItemState(fnode, 'focus', false); // false
    });
};

// 清除图上所有边的 focus 状态及相应样式
const clearFocusEdgeState = (graph) => {
    const focusEdges = graph.findAllByState('edge', 'focus');
    focusEdges.forEach((fedge) => {
        graph.setItemState(fedge, 'focus', false);
    });
};

// 截断长文本。length 为文本截断后长度，elipsis 是后缀
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
        console.log('修改了我的图元样式！！！！！')
        node.style = {
            fill: '#E65D6E',
            stroke: '#D99CA8',
            lineWidth: 1
        };
        node.labelCfg = {
            position: 'bottom',
            offset: 5,
            style: {
                fill: global.node.labelCfg.style.fill,
                fontSize: 12,
                stroke: global.node.labelCfg.style.stroke,
                lineWidth: 3,
            },
        };
        // TODO 添加状态
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
        // refreshDragedNodePosition(e);
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
        store.commit('set_showEditEdgeModal', false);
        store.commit('set_showEditNodeModal', true);
        console.log('clickclick================', store.state.graph.showEditNodeModal);
    });
    graph.on('edge:click', (e) => {
        clearAllClickedState();
        store.commit('set_currentItem', e.item);
        store.commit('set_showEditNodeModal', false);
        store.commit('set_showEditEdgeModal', true);
        graph.setItemState(e.item, 'selected', true);
    });
    graph.on('canvas:click', (e) => {
        clearAllClickedState();
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

// <<<<<<< HEAD
// =======
export const setHighlight=(graph,searchNodes,searchEdges)=>{
    searchNodes.forEach((node)=>{
        graph.setItemState(graph.findById(node.get('id')),'highlight',true);
    })
    searchEdges.forEach((edge)=>{
        graph.setItemState(graph.findById(edge.get('id')),'highlight',true);
    })
}
export const cancelHighlight=(graph,searchNodes,searchEdges)=>{
    searchNodes.forEach((node)=>{
        graph.setItemState(graph.findById(node.get('id')),'highlight',false);
    })
    searchEdges.forEach((edge)=>{
        graph.setItemState(graph.findById(edge.get('id')),'highlight',false);
    })
}
export const hideItem=(graph,type)=>{
    const nodesByType=graph.findAll('node',(node)=>{
        return node.get('class')===type;
    })
    nodesByType.forEach((node)=>{
        graph.hideItem(node);
    })
}
export const showItem=(graph,type)=>{
    const nodesByType=graph.findAll('node',(node)=>{
        return node.get('class')===type;
    })
    nodesByType.forEach((node)=>{
        graph.showItem(node);
    })
}

// >>>>>>> feat/我的图谱+统计+搜索+筛选
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
