import G6 from '@antv/g6';
import insertCss from 'insert-css';
import { isNumber, isArray } from '@antv/util';
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
const SMALLGRAPHLABELMAXLENGTH = 5;
let labelMaxLength = SMALLGRAPHLABELMAXLENGTH;
const DEFAULTNODESIZE = 20;
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
        },
        labelCfg: {
            style: {
                fill: '#E65D6E',
                stroke: '#191b1c',
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
                fill: '#000',
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
const formatText = (text, length = 5, elipsis = '...') => {
    if (!text) return '';
    if (text.length > length) {
        return `${text.substr(0, length)}${elipsis}`;
    }
    return text;
};

const labelFormatter = (text, minLength = 10) => {
    if (text && text.split('').length > minLength) return `${text.substr(0, minLength)}...`;
    return text;
};

export const processNodesEdges = (
    nodes,
    edges,
    width,
    height,
    largeGraphMode,
    edgeLabelVisible,
    isNewGraph = false,
) => {
    if (!nodes || nodes.length === 0) return {};
    const currentNodeMap = {};
    let maxNodeCount = -Infinity;
    const paddingRatio = 0.3;
    const paddingLeft = paddingRatio * width;
    const paddingTop = paddingRatio * height;
    nodes.forEach((node) => {
        node.type = node.level === 0 ? 'real-node' : 'aggregated-node';
        node.isReal = node.level === 0 ? true : false;
        node.label = `${node.id}`;
        node.labelLineNum = undefined;
        node.oriLabel = node.label;
        node.label = formatText(node.label, labelMaxLength, '...');
        node.degree = 0;
        node.inDegree = 0;
        node.outDegree = 0;
        if (currentNodeMap[node.id]) {
            console.warn('node exists already!', node.id);
            node.id = `${node.id}${Math.random()}`;
        }
        currentNodeMap[node.id] = node;
        if (node.count > maxNodeCount) maxNodeCount = node.count;
        const cachePosition = cachePositions ? cachePositions[node.id] : undefined;
        if (cachePosition) {
            node.x = cachePosition.x;
            node.y = cachePosition.y;
            node.new = false;
        } else {
            node.new = isNewGraph ? false : true;
            if (manipulatePosition && !node.x && !node.y) {
                node.x = manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
                node.y = manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
            }
        }
    });

    let maxCount = -Infinity;
    let minCount = Infinity;
    // let maxCount = 0;
    edges.forEach((edge) => {
        // to avoid the dulplicated id to nodes
        if (!edge.id) edge.id = `edge-${uniqueId()}`;
        else if (edge.id.split('-')[0] !== 'edge') edge.id = `edge-${edge.id}`;
        // TODO: delete the following line after the queried data is correct
        if (!currentNodeMap[edge.source] || !currentNodeMap[edge.target]) {
            console.warn('edge source target does not exist', edge.source, edge.target, edge.id);
            return;
        }
        const sourceNode = currentNodeMap[edge.source];
        const targetNode = currentNodeMap[edge.target];

        if (!sourceNode || !targetNode)
            console.warn('source or target is not defined!!!', edge, sourceNode, targetNode);

        // calculate the degree
        sourceNode.degree++;
        targetNode.degree++;
        sourceNode.outDegree++;
        targetNode.inDegree++;

        if (edge.count > maxCount) maxCount = edge.count;
        if (edge.count < minCount) minCount = edge.count;
    });

    nodes.sort(descendCompare(NODESIZEMAPPING));
    const maxDegree = nodes[0].degree || 1;

    const descreteNodes = [];
    nodes.forEach((node, i) => {
        // assign the size mapping to the outDegree
        const countRatio = node.count / maxNodeCount;
        const isRealNode = node.level === 0;
        node.size = isRealNode ? DEFAULTNODESIZE : DEFAULTAGGREGATEDNODESIZE;
        node.isReal = isRealNode;
        node.labelCfg = {
            position: 'bottom',
            offset: 5,
            style: {
                fill: global.node.labelCfg.style.fill,
                fontSize: 6 + countRatio * 6 || 12,
                stroke: global.node.labelCfg.style.stroke,
                lineWidth: 3,
            },
        };

        if (!node.degree) {
            descreteNodes.push(node);
        }
    });

    const countRange = maxCount - minCount;
    const minEdgeSize = 1;
    const maxEdgeSize = 7;
    const edgeSizeRange = maxEdgeSize - minEdgeSize;
    edges.forEach((edge) => {
        // set edges' style
        const targetNode = currentNodeMap[edge.target];

        const size = ((edge.count - minCount) / countRange) * edgeSizeRange + minEdgeSize || 1;
        edge.size = size;

        const arrowWidth = Math.max(size / 2 + 2, 3);
        const arrowLength = 10;
        const arrowBeging = targetNode.size + arrowLength;
        let arrowPath = `M ${arrowBeging},0 L ${arrowBeging + arrowLength},-${arrowWidth} L ${
        arrowBeging + arrowLength
            },${arrowWidth} Z`;
        let d = targetNode.size / 2 + arrowLength;
        if (edge.source === edge.target) {
            edge.type = 'loop';
            arrowPath = undefined;
        }
        const sourceNode = currentNodeMap[edge.source];
        const isRealEdge = targetNode.isReal && sourceNode.isReal;
        edge.isReal = isRealEdge;
        const stroke = isRealEdge ? global.edge.style.realEdgeStroke : global.edge.style.stroke;
        const opacity = isRealEdge
            ? global.edge.style.realEdgeOpacity
            : global.edge.style.strokeOpacity;
        const dash = Math.max(size, 2);
        const lineDash = isRealEdge ? undefined : [dash, dash];
        edge.style = {
            stroke,
            strokeOpacity: opacity,
            cursor: 'pointer',
            lineAppendWidth: Math.max(edge.size || 5, 5),
            fillOpacity: 1,
            lineDash,
            endArrow: arrowPath
                ? {
                    path: arrowPath,
                    d,
                    fill: stroke,
                    strokeOpacity: 0,
                }
                : false,
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
        if (!edge.oriLabel) edge.oriLabel = edge.label;
        if (largeGraphMode || !edgeLabelVisible) edge.label = '';
        else {
            edge.label = labelFormatter(edge.label, labelMaxLength);
        }

        // arrange the other nodes around the hub
        const sourceDis = sourceNode.size / 2 + 20;
        const targetDis = targetNode.size / 2 + 20;
        if (sourceNode.x && !targetNode.x) {
            targetNode.x = sourceNode.x + sourceDis * Math.cos(Math.random() * Math.PI * 2);
        }
        if (sourceNode.y && !targetNode.y) {
            targetNode.y = sourceNode.y + sourceDis * Math.sin(Math.random() * Math.PI * 2);
        }
        if (targetNode.x && !sourceNode.x) {
            sourceNode.x = targetNode.x + targetDis * Math.cos(Math.random() * Math.PI * 2);
        }
        if (targetNode.y && !sourceNode.y) {
            sourceNode.y = targetNode.y + targetDis * Math.sin(Math.random() * Math.PI * 2);
        }

        if (!sourceNode.x && !sourceNode.y && manipulatePosition) {
            sourceNode.x = manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
            sourceNode.y = manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
        }
        if (!targetNode.x && !targetNode.y && manipulatePosition) {
            targetNode.x = manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
            targetNode.y = manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
        }
    });

    G6.Util.processParallelEdges(edges);
    return {
        maxDegree,
        edges,
    };
};

export const getForceLayoutConfig = (graph, largeGraphMode, configSettings) => {
    let {
        linkDistance,
        edgeStrength,
        nodeStrength,
        nodeSpacing,
        preventOverlap,
        nodeSize,
        collideStrength,
        alpha,
        alphaDecay,
        alphaMin,
    } = configSettings || { preventOverlap: true };

    if (!linkDistance && linkDistance !== 0) linkDistance = 225;
    if (!edgeStrength && edgeStrength !== 0) edgeStrength = 50;
    if (!nodeStrength && nodeStrength !== 0) nodeStrength = 200;
    if (!nodeSpacing && nodeSpacing !== 0) nodeSpacing = 5;

    const config = {
        type: 'gForce',
        minMovement: 0.01,
        maxIteration: 5000,
        preventOverlap,
        damping: 0.99,
        linkDistance: (d) => {
            let dist = linkDistance;
            const sourceNode = nodeMap[d.source] || aggregatedNodeMap[d.source];
            const targetNode = nodeMap[d.target] || aggregatedNodeMap[d.target];
            // // 两端都是聚合点
            // if (sourceNode.level && targetNode.level) dist = linkDistance * 3;
            // // 一端是聚合点，一端是真实节点
            // else if (sourceNode.level || targetNode.level) dist = linkDistance * 1.5;
            if (!sourceNode.level && !targetNode.level) dist = linkDistance * 0.3;
            return dist;
        },
        edgeStrength: (d) => {
            const sourceNode = nodeMap[d.source] || aggregatedNodeMap[d.source];
            const targetNode = nodeMap[d.target] || aggregatedNodeMap[d.target];
            // 聚合节点之间的引力小
            if (sourceNode.level && targetNode.level) return edgeStrength / 2;
            // 聚合节点与真实节点之间引力大
            if (sourceNode.level || targetNode.level) return edgeStrength;
            return edgeStrength;
        },
        nodeStrength: (d) => {
            // 给离散点引力，让它们聚集
            if (d.degree === 0) return -10;
            // 聚合点的斥力大
            if (d.level) return nodeStrength * 2;
            return nodeStrength;
        },
        nodeSize: (d) => {
            if (!nodeSize && d.size) return d.size;
            return 50;
        },
        nodeSpacing: (d) => {
            if (d.degree === 0) return nodeSpacing * 2;
            if (d.level) return nodeSpacing;
            return nodeSpacing;
        },
        onLayoutEnd: () => {
            if (largeGraphMode) {
                graph.getEdges().forEach((edge) => {
                    if (!edge.oriLabel) return;
                    edge.update({
                        label: labelFormatter(edge.oriLabel, labelMaxLength),
                    });
                });
            }
        },
        tick: () => {
            graph.refreshPositions();
        },
    };

    if (nodeSize) config['nodeSize'] = nodeSize;
    if (collideStrength) config['collideStrength'] = collideStrength;
    if (alpha) config['alpha'] = alpha;
    if (alphaDecay) config['alphaDecay'] = alphaDecay;
    if (alphaMin) config['alphaMin'] = alphaMin;

    return config;
};
