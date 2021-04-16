import {
    deleteEntityAPI,
    deleteRelationAPI,
    addEntityAPI,
    addRelationAPI,
    changeEntityAPI,
    changeRelationAPI,
    downloadAPI,
    saveAPI,
    thumbnailAPI,
    getPicElementsAPI,
    getPicTypesAPI,
    searchAPI,
    getNodesByTypesAPI,
    getNodeTypesAPI, getPicCustomizeElementsAPI,bindUrlToPicAPI
} from "../../api/graph";
import {
    url2File
} from '../../utils/util';

import { message } from 'ant-design-vue'

const state = {
    customizeElement: [{key:'圆形', value: 'circle'},{key:'矩形', value: 'rect'},{key:'椭圆', value: 'ellipse'},{key:'菱形', value: 'diamond'}],
    picId: '',//方便测试by ljy 6075ab0c1f3a46144cf5c4c1
    //这两个用来生成唯一id
    nodeId: 0,
    relationId: 0,
    //labelList用来添加关系时选择实体节点
    labelList: [],
    relationTypeSet: new Set(),
    currentGraph: null,
    forceGraph: null,
    typesettingGraph: null,
    currentGraphId: 'typesetting',
    showDownloadImgModal: false,
    showDownloadFileModal: false,
    graphIds: {
        force: 'force',
        typesetting: 'typesetting'
    },
    forceGraphRatio: 1,
    typesettingGraphRatio: 1,
    currentStrength: 30,
    showGraphEdges: [],
    currentSetLayout: null,
    forceLayout: [
        {
            key: 'gForce',
            value: '经典力导向布局(gForce)'
        },
        {
            key: 'force',
            value: '经典力导向布局(force)'
        },
        {
            key: 'forceAtlas2',
            value: 'FA2力导向布局(forceAtlas2)'
        },
        {
            key: 'fruchterman',
            value: 'Fruchterman布局(fruchterman)'
        },
    ],
    layoutType: [
        {
            key: 'random',
            value: '随机布局(random)'
        },
        {
            key: 'circular',
            value: '环形布局(circular)'
        },
        {
            key: 'radial',
            value: '辐射状布局(Radial)'
        },
        {
            key: 'mds',
            value: '高维数据降维算法布局(mds)'
        },
        {
            key: 'dagre',
            value: '层次布局(dagre)'
        },
        {
            key: 'concentric',
            value: '同心圆布局(concentric)'
        },
        {
            key: 'grid',
            value: '格子布局(grid)'
        },
    ],
    currentShowGraphData: {},
    currentGraphData: {},
    nodesTypeCntMap:{},
    edgesTypeCntMap:{},
    searchNodes:[],
    searchEdges:[],
    nodesByTypesMap:{},//useless
    nodesTypes:[],
    isNew: false,
    forceShowEdgeLabel: false,
    typesettingEdgeShowLabel: false,
    currentCombos: [],
    currentShowCombos: false,
    currentItem: null,
    showEditNodeModal: false,
    showEditEdgeModal: false,
    boardTypes: {
        none: '0',
        pie: '1',
        entityList: '2',
        relationList: '3',
        entityEdit: '4',
        relationEdit: '5',
    },
    currentShowBoard: '1',
    checkList:[],//类型筛选用
};

const graph = {
    state,
    mutations: {
        set_nodeId(state){
            state.nodeId++;
        },
        set_customizeElement(state,data){

        },
        add_customizeElement(state,data){

        },
        set_relationId(state){
            state.relationId++;
        },
        set_graph(state, data) {
            state.graphInfo = data
        },
        set_currentGraph(state, data) {
            state.currentGraph = data
        },
        set_forceGraph(state, data) {
            state.forceGraph = data
        },
        set_typesettingGraph(state, data) {
            state.typesettingGraph = data
        },
        set_currentGraphId(state, data) {
            state.currentGraphId = data
        },
        set_showDownloadImgModal(state, data) {
            state.showDownloadImgModal = data
        },
        set_showDownloadFileModal(state, data) {
            state.showDownloadFileModal = data
        },
        set_picId(state, data) {
            state.picId = data
        },
        set_nodes(state, data) {
            state.nodes = data
        },
        set_links(state, data) {
            state.links = data
        },
        set_showGraphNodes(state, data) {
            data.forEach(node => {
                node.color = "#FFB8C6";
            });
            state.showGraphNodes = data;
        },
        set_showGraphEdges(state, data) {
            data.forEach(edge => {
                edge.color = "#000";
            });
            state.showGraphEdges = data;
        },
        add_showGraphEdges(state,data){
            let signal=0;
            for(let i=0;i<state.showGraphEdges.length;i++){
                if((state.showGraphEdges[i].node1===data.node1) && (state.showGraphEdges[i].node2===data.node2) && (state.showGraphEdges[i].name===data.name)){
                    signal=1;
                    break;
                }
            }
            if(signal===0) {
                state.showGraphEdges.push(data)
            }
        },
        delete_showGraphEdges(state,data){
            for(let i=0;i<state.showGraphEdges.length;i++){
                if((state.showGraphEdges[i].node1===data.node1) && (state.showGraphEdges[i].node2===data.node2) && (state.showGraphEdges[i].name===data.name)){
                    state.showGraphEdges.splice(i,1);
                    break;
                }
            }
        },
        change_showGraphEdges(state,data){
            for(let i=0;i<state.showGraphEdges.length;i++){
                if((state.showGraphEdges[i].node1===data.node1) && (state.showGraphEdges[i].node2===data.node2) && (state.showGraphEdges[i].name===data.name)){
                    state.showGraphEdges[i].name=data.newName
                    state.showGraphEdges[i].type=data.newType
                    break
                }
            }
        },
        update_showGraphNodes(state, data = {oldName: '', newName: '', newColor: ''}) {
            for(let i = 0; i < state.showGraphNodes.length; i++){
                if(state.showGraphNodes[i]['name'] === data.oldName){
                    state.showGraphNodes[i]['name'] = data.newName;
                    state.showGraphNodes[i]['color'] = data.newColor;
                    break;
                }
            }
            for(let i = 0; i < state.showGraphEdges.length; i++){
                if(state.showGraphEdges[i]['node1'] === data.oldName){
                    state.showGraphEdges[i]['node1'] = data.newName;
                }
                if(state.showGraphEdges[i]['node2'] === data.oldName){
                    state.showGraphEdges[i]['node2'] = data.newName;
                }
            }
        },
        delete_showGraphNodes(state, data = {name: ''}) {
            let index = 0;
            for(let i = 0; i < state.showGraphNodes.length; i++){
                if(state.showGraphNodes[i]['name'] === data.name){
                    index = i;
                    break;
                }
            }
            state.showGraphNodes.splice(index,1);
        },
        add_showGraphNodes(state, data = {name: '', color: ''}) {
            state.showGraphNodes.push(data)
        },
        set_relationTypeSet(state,data){
            for (let i of data) {
                state.relationTypeSet.add(i.type)
            }
        },
        set_currentPicId(state, data) {
            state.currentPicId = data
        },
        set_currentSetLayout(state, data) {
            state.currentSetLayout = data
        },
        set_forceGraphRatio(state, data) {
            state.forceGraphRatio = data
        },
        set_typesettingGraphRatio(state, data) {
            state.typesettingGraphRatio = data
        },
        set_currentShowGraphData(state, data) {
            state.currentShowGraphData = {...data}
        },
        set_currentGraphData(state, data) {
            state.currentGraphData = {...data}
            console.log('添加labelList')
            state.labelList=[]
            for(let i=0;i<data.nodes.length;i++){
                state.labelList.push(data.nodes[i].label)
            }
            console.log(state.labelList)
        },
        set_nodesTypeCntMap(state,data){
            state.nodesTypeCntMap=data;
        },
        set_edgesTypeCntMap(state,data){
            state.edgesTypeCntMap=data;
            console.log('6666 set_edgesTypeCntMap: state.edgesTypeCntMap',state.edgesTypeCntMap);

        },
        set_searchNodes(state,data){
            state.searchNodes=data;
        },
        set_searchEdges(state,data){
            state.searchEdges=data;
        },
        set_nodesByTypesMap(state,data){//useless
            state.nodesByTypesMap={...data};
        },
        set_nodesTypes(state,data) {
            state.nodesTypes = data;
        },
        clear_graphs(state) {
            state.currentGraphId = 'typesetting';
            state.currentGraph = null;
            state.forceGraph = null;
            state.typesettingGraph = null;
            state.currentGraphData = {};
            state.labelList=[];
            state.currentShowGraphData = {};
            state.currentSetLayout = null;
            state.currentCombos = [];
        },
        set_isNew(state, data) {
            state.isNew = data;
        },
        init_graph(state, data) {
            let baseNodes = [];
            let baseEdges = [];
            // TODO 基本数据来自后端，默认排版和力导模式一致，后期防御式编程？
            if(data.sedges){
                data.sedges.forEach((edge) => {
                    baseEdges.push({
                        id: edge.id,
                        label: edge.label,
                        class: edge.class,
                        source: edge.source,
                        target: edge.target
                    })
                });
            }
            state.labelList=[]
            if(data.snodes){
                data.snodes.forEach((node) => {
                    baseNodes.push({
                        id: node.id,
                        label: node.label,
                        class: node.class
                    })
                    state.labelList.push(node.label)
                });
            }
            state.currentGraphData = {
                nodes: baseNodes,
                edges: baseEdges
            };
        },
        set_forceShowEdgeLabel(state, data){
            state.forceShowEdgeLabel = data;
        },
        set_typesettingEdgeShowLabel(state, data){
            state.typesettingEdgeShowLabel = data;
        },
        set_currentCombos(state, data){
            state.currentCombos = [...data];
        },
        set_currentShowCombos(state, data){
            state.currentShowCombos = data;
        },
        set_currentShowGraphData_force(state, data) {
            state.currentShowGraphData.force = {
                nodes: data.nodes,
                edges: data.edges
            };
        },
        set_currentShowGraphData_typesetting(state, data) {
            state.currentShowGraphData.typesetting = {
                nodes: data.nodes,
                edges: data.edges
            };
        },
        set_currentItem(state, data){
            state.currentItem = data;
        },
        set_showEditNodeModal(state, data){
            state.showEditNodeModal = data;
        },
        set_showEditEdgeModal(state, data){
            state.showEditEdgeModal = data;
        },
        set_currentShowBoard(state, data){
            state.currentShowBoard = data;
        },
        set_checkList(state,data){
            state.checkedList=data;
        }
    },
    actions: {
        // getAll:async ({commit,state},data)=>{
        //     const res = await getAllAPI(data);
        //     console.log('file', res);
        //     if(res && res.code >= 0){
        //         let data = res.data;
        //         commit('set_picId', data.picId);
        //         commit('set_links', data.links);
        //         commit('set_nodes', data.nodes);
        //         commit('set_relationTypeSet', data.links);
        //     }else{
        //         message.error('文件上传失败')
        //     }
        // },
        addEntity:async(param)=>{
            const res=await addEntityAPI(param);
            console.log('addEntity',res)
            if(res){
                message.success('增加实体成功')
            }else{
                message.error('增加实体失败')
            }
        },
        deleteEntity:async(param)=>{
            const res=await deleteEntityAPI(param);
            console.log(res)
            if(res){
                message.success('删除实体成功')
            }else{
                message.error('删除实体失败')
            }
        },
        changeEntity:async(param)=>{
            const res=await changeEntityAPI(param);
            if(res){
                message.success('修改实体成功')
            }else{
                message.error('修改实体失败')
            }
        },
        addRelation:async(param)=>{
            const res=await addRelationAPI(param);
            if(res){
                message.success('增加关系成功')
            }else{
                message.error('增加关系失败')
            }
        },
        changeRelation:async(param)=>{
            const res=await changeRelationAPI(param);
            if(res){
                message.success('修改关系成功')
            }else{
                message.error('修改关系失败')
            }
        },
        deleteRelation:async(param)=>{
            const res=await deleteRelationAPI(param);
            if(res){
                // message.success('删除关系成功')
            }else{
                message.error('删除关系失败')
            }
        },
        downloadFile: async({state}) => {
            const res = await downloadAPI({
                picId: state.picId
            });
            if(res.code >= 0) {
                console.log('download=======================', res.code)
                return res.data;
            } else {
                message.error('文件下载失败')
            }
        },
        save: async({state}, showMsg=true) => {
            let param = {
                picId: state.picId
            };
            if(state.forceGraph != null){
                let data = state.forceGraph.save();
                param.fnodes = data.nodes;
                param.fedges = data.edges;
            } else {
                param.fnodes = [];
                param.fedges = [];
            }
            if(state.typesettingGraph != null){
                let data = state.typesettingGraph.save();
                param.snodes = data.nodes;
                param.sedges = data.edges;
            } else {
                param.snodes = [];
                param.sedges = [];
            }
            console.log('to be saved', param);
            const res = await saveAPI(param);
            if(res.code >= 0) {
                if(showMsg){
                    message.success('保存成功');
                }
            } else {
                if(showMsg){
                    message.error('图谱初次保存失败，请注意保存');
                }else {
                    console.error('图谱初次保存失败！')
                }
            }
        },
        thumbnail: async({rootState, state}, url) => {
            let picId = state.picId;
            let formData = new FormData();
            formData.append('mFile', url2File(url, picId));
            const res = await thumbnailAPI({
                picId: picId,
                userId: rootState.user.userId,
                picName: picId,
                file: formData
            });
            if(res.code < 0) {
                console.error('缩略图保存失败');
            }
        },
        // 根据picId获取已有图谱数据（非上传文件获取）
        getPicElements: async({state, commit}) => {
            console.log('xixi', state);
            const res = await getPicElementsAPI({
                picId: state.picId
            });
            if(res.code < 0) {
                message.error("图谱获取失败");
            } else {
                let resData = res.data;
                commit('set_currentShowGraphData', {
                    force: {
                        nodes: resData.fnodes,
                        edges: resData.fedges
                    },
                    typesetting: {
                        nodes: resData.snodes,
                        edges: resData.sedges
                    }
                });
                let baseNodes = [];
                let baseEdges = [];
                // TODO 现在是假设f和s的基本数据一致，后期防御式编程？
                if(resData.sedges){
                    resData.sedges.forEach((edge) => {
                        baseEdges.push({
                            id: edge.id,
                            label: edge.label,
                            oriLabel: edge.oriLabel,
                            class: edge.class,
                            source: edge.source,
                            target: edge.target
                        })
                    });
                }
                if(resData.snodes){
                    resData.snodes.forEach((node) => {
                        baseNodes.push({
                            id: node.id,
                            label: node.label,
                            oriLabel: node.oriLabel,
                            class: node.class
                        })
                    });
                }
                commit('set_currentGraphData', {
                    nodes: baseNodes,
                    edges: baseEdges
                });
            }
        },
        getPicTypes:async({commit,state},data)=>{
            const res=await getPicTypesAPI(data);
            if(res===null){
                console.log('getPicTypesAPI=null');
                message.error(res);
            }else if(res.code>=0){
                commit('set_nodesTypeCntMap',new Map(Object.entries(res.data.nodesMap)));
                //console.log('6666 res.data.edgesMap',new Map(Object.entries(res.data.edgesMap)));
                //console.log('6666 typeof(res.data.edgesMap)',typeof(new Map(Object.entries(res.data.edgesMap))));
                commit('set_edgesTypeCntMap',new Map(Object.entries(res.data.edgesMap)));
                //console.log('6666 getPicTypes: state.edgesTypeCntMap',state.edgesTypeCntMap);
            }else{
                console.log('getPicTypesAPI.code<0');
                message.error(res.data);
            }
        },
        search:async({commit},data)=>{
            const res=await searchAPI(data);
            if(res===null){
                console.log('searchAPI=null');
                message.error(res);
            }else if(res.code>=0){
                console.log('5555 searchAPI.data.nodes',res.data.nodes);
                commit('set_searchNodes',res.data.nodes);
                console.log('5555 searchAPI.data.edges',res.data.edges);
                commit('set_searchEdges',res.data.edges);
            }else{
                console.log('searchAPI.code<0');
                message.error(res.data);
            }
        },
        getNodesByTypesMap:async({commit,state},data)=>{//useless
            const res=await getNodesByTypesAPI(data);
            if(res===null){
                console.log("getNodesByTypesAPI=null");
                message.error(res);
            }else if(res.code>=0){
                commit('set_nodesByTypeMap',res);

                let types=[];
                let useless=[];
                for(let[key,value] of state.nodesByTypeMap){
                    types.push(key);
                    useless.push(value);
                }
                commit('set_nodesTypes',types);
            }else{
                console.log('getNodesByTypesAPI.code<0');
                message.error(res.data);
            }
        },
        getNodeTypes:async({commit},data)=>{
            const res=await getNodeTypesAPI(data);
            if(res===null){
                console.log("getNodeTypesAPI=null");
                message.error(res);
            }else if(res.code>=0){
                commit('set_nodesTypes',res.data);
            }else{
                console.log('getNodeTypesAPI.code<0');
                message.error(res.data);
            }
        },
        bindUrlToPic:async({commit,state},data)=>{
            const res=await bindUrlToPicAPI(data);
            if(res){
                message.success('用户自定义图元成功')
            }
            else{
                message.error('自定义失败')
            }
        },
        getPicCustomizeElements:async({commit,state},data)=>{
            state.customizeElement=[{key:'圆形', value: 'circle'},{key:'矩形', value: 'rect'},{key:'椭圆', value: 'ellipse'},{key:'菱形', value: 'diamond'}]
            const res=await getPicCustomizeElementsAPI(data);
            console.log('获取用户自定义的所有图元',res)
            for(let i=0;i<res.data.length;i++){
                state.customizeElement.push({
                    key: res.data[i].customizeEntityName,
                    value: res.data[i].customizeImgUrl
                })
            }
        },

    }
};

export default graph
