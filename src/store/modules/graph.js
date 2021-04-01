import{
    deleteEntityAPI,
    deleteRelationAPI,
    addEntityAPI,
    addRelationAPI,
    changeEntityAPI,
    changeRelationAPI,
    downloadAPI
} from "../../api/graph";

import { message } from 'ant-design-vue'

const state = {
    graphInfo: [
        'hi'
    ],
    picId: '4',
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
    showGraphNodes: [],
    showGraphEdges: [],
    currentPicId: '',
    currentSetLayout: '',
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
            key: 'Radial',
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
    forceGraphRatio: 1,
    typesettingGraphRatio: 1,
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

    }
};

export default graph
