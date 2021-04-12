import{
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
} from "../../api/graph";
import {
    url2File
} from '../../utils/util';

import { message } from 'ant-design-vue'

const state = {
    graphInfo: [
        'hi'
    ],
    picId: '',
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
    nodes:[
        {name:'node1'},
        {name:'node2'}
    ],
    links:[

    ],
    showGraphNodes: [
        {
            name: '操作系统集团',
            color: "#F5222D"
        }, {
            name: '浏览器有限公司',
            color: "#FA541C"
        }, {
            name: 'HTML科技',
            color: "#FAAD14"
        }, {
            name: 'JavaScript科技',
            color: "#13C2C2"
        }, {
            name: 'CSS科技',
            color: "#52C41A"
        }, {
            name: 'Chrome',
            color: "#1890FF"
        }, {
            name: 'IE',
            color: "#FFB8C6"
        }, {
            name: 'Firefox',
            color: "#FFB8C6"
        }, {
            name: 'Safari',
            color: "#FFB8C6"
        }
    ],
    forceGraphRatio: 1,
    typesettingGraphRatio: 1,
    currentStrength: 30,
    showGraphEdges: [],
    currentPicId: '',
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
    nodesByTypesMap:{},
    nodesTypes:[],
    isNew: false,
};

const graph = {
    state,
    mutations: {
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
        },
        set_nodesTypeCntMap(state,data){
            state.nodesTypeCntMap=data;
        },
        set_edgesTypeCntMap(state,data){
            state.edgesTypeCntMap=data;
        },
        set_searchNodes(state,data){
            state.searchNodes=data;
        },
        set_searchEdges(state,data){
            state.searchEdges=data;
        },
        set_nodesByTypesMap(state,data){
            state.nodesByTypesMap={...data};
        },
        set_nodesTypes(state,data) {
            state.nodesTypes = data;
        },
        clear_graphs(state) {
            state.currentGraph = null;
            state.forceGraph = null;
            state.typesettingGraph = null;
            state.currentGraphData = {};
            state.currentShowGraphData = {};
            state.currentSetLayout = null;
        },
        set_isNew(state, data) {
            state.isNew = data;
        },
        init_graph(state, data) {
            let baseNodes = [];
            let baseEdges = [];
            // TODO 基本数据来自后端，默认排版和力导模式一致，后期防御式编程？
            if(data.fedges){
                data.fedges.forEach((edge) => {
                    baseEdges.push({
                        id: edge.id,
                        label: edge.label,
                        type: edge.type,
                        source: edge.source,
                        target: edge.target
                    })
                });
            }
            if(data.fnodes){
                data.fnodes.forEach((node) => {
                    baseNodes.push({
                        id: node.id,
                        label: node.label,
                        type: node.type
                    })
                });
            }
            state.currentGraphData = {
                nodes: baseNodes,
                edges: baseEdges
            }
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
        // 注意该接口返回值为ArrayBuffer，经拦截器已取出data
        // TODO 后端重构，传url
        downloadFile: async({state}) => {
            const res = await downloadAPI({
                picId: state.picId
            });
            if(res) {
                return res;
            } else {
                message.error('文件下载失败')
            }
        },
        save: async({state}) => {
            let param = {
                picId: state.picId,
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
            const res = await saveAPI(param);
            if(res.code >= 0) {
                message.success('保存成功');
            } else {
                message.error('文件下载失败');
            }
        },
        thumbnail: async({rootState, state}, url) => {
            let picId = state.picId;
            const res = await thumbnailAPI({
                picId: picId,
                userId: rootState.userId,
                picName: picId,
                file: url2File(url, picId)
            });
            if(res.code < 0) {
                console.log('文件下载失败');
            }
        },
        // 根据picId获取已有图谱数据（非上传文件获取）
        getPicElements: async({state, commit}) => {
            let picId = state.picId;
            const res = await getPicElementsAPI({
                picId: picId
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
                if(resData.fedges){
                    resData.fedges.forEach((edge) => {
                        baseEdges.push({
                            id: edge.id,
                            label: edge.label,
                            type: edge.type,
                            source: edge.source,
                            target: edge.target
                        })
                    });
                }
                if(resData.fnodes){
                    resData.fnodes.forEach((node) => {
                        baseNodes.push({
                            id: node.id,
                            label: node.label,
                            type: node.type
                        })
                    });
                }
                commit('set_currentGraphData', {
                    nodes: baseNodes,
                    edges: baseEdges
                })
                console.log('base', state.currentGraphData);
                console.log('show', state.currentShowGraphData);
            }
        },
        getPicTypes:async({commit},data)=>{
            const res=await getPicTypesAPI(data);
            if(res===null){
                console.log('getPicTypesAPI=null');
                message.error(res);
            }else if(res.code>=0){
                commit('set_nodesTypeCntMap',res.nodesMap);
                commit('set_edgesTypeCntMap',res.edgesMap);
            }else{
                console.log('getPicTypesAPI.code<0');
                message.error(res);
            }
        },
        search:async({commit},data)=>{
            const res=await searchAPI(data);
            if(res===null){
                console.log('searchAPI=null');
                message.error(res);
            }else if(res.code>=0){
                commit('set_searchNodes',res.nodes);
                commit('set_searchEdges',res.edges);
            }else{
                console.log('searchAPI.code<0');
                message.error(res);
            }
        },
        getNodesByTypesMap:async({commit,state},data)=>{
            const res=await getNodesByTypesAPI(data);
            if(res===null){
                console.log("getNodesByTypesAPI=null");
                message.error(res);
            }else if(res.code>=0){
                commit('set_nodesByTypeMap',res);
            }else{
                console.log('getNodesByTypesAPI.code<0');
                message.error(res);
            }
            let types=[];
            let useless=[];
            for(let[key,value] of state.nodesByTypeMap){
                types.push(key);
                useless.push(value);
            }
            commit('set_nodesTypes',types);
        },
    }
};

export default graph
