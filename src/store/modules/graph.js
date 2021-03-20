import{
    getAllAPI,
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
    picId: '',
    relationTypeSet: new Set(['是','和']),
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
    showGraphEdges: [
        {
            node1: '浏览器有限公司',
            node2: '操作系统集团',
            name: '参股',
            type: 'hasProperty',
            color: '#000'
        }, {
            node1: 'HTML科技',
            node2: '浏览器有限公司',
            name: '参股',
            type: 'hasProperty',
            color: '#000'
        }, {
            node1: 'CSS科技',
            node2: '浏览器有限公司',
            name: '参股',
            type: 'hasProperty',
            color: '#000'
        }, {
            node1: 'JavaScript科技',
            node2: '浏览器有限公司',
            name: '参股',
            type: 'hasProperty',
            color: '#000'
        }, {
            node1: 'Chrome',
            node2: '浏览器有限公司',
            name: '是',
            type: 'is',
            color: '#000'
        }, {
            node1: 'IE',
            node2: '浏览器有限公司',
            name: '是',
            type: 'is',
            color: '#000'
        }, {
            node1: 'Firefox',
            node2: '浏览器有限公司',
            name: '董事',
            type: 'is',
            color: '#000'
        }, {
            node1: 'Safari',
            node2: '浏览器有限公司',
            name: '董事',
            type: 'is',
            color: '#000'
        }, {
            node1: 'Chrome',
            node2: 'JavaScript科技',
            name: '法人',
            type: 'is',
            color: '#000'
        }
    ],
    currentPicId: '',
};

const graph = {
    state,
    mutations: {
        set_graph(state, data) {
            state.graphInfo = data
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
            state.showGraphNodes = [...data]
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
        addEntity:async({commit},param)=>{
            const res=await addEntityAPI(param);
            if(res){
                message.success('增加实体成功')
            }else{
                message.error('增加实体失败')
            }
        },
        deleteEntity:async({commit},param)=>{
            const res=await deleteEntityAPI(param);
            if(res){
                message.success('删除实体成功')
            }else{
                message.error('删除实体失败')
            }
        },
        changeEntity:async({commit},param)=>{
            const res=await changeEntityAPI(param);
            if(res){
                message.success('修改实体成功')
            }else{
                message.error('修改实体失败')
            }
        },
        addRelation:async({commit},param)=>{
            const res=await addRelationAPI(param);
            if(res){
                message.success('增加关系成功')
            }else{
                message.error('增加关系失败')
            }
        },
        changeRelation:async({commit},param)=>{
            const res=await changeRelationAPI(param);
            if(res){
                message.success('修改关系成功')
            }else{
                message.error('修改关系失败')
            }
        },
        deleteRelation:async({commit},param)=>{
            const res=await deleteRelationAPI(param);
            if(res){
                message.success('删除关系成功')
            }else{
                message.error('删除关系失败')
            }
        },
        downloadFile: async({ state }) => {
            console.log('download', state.picId);
            const res = await downloadAPI({
                picId: state.picId
            });
            if(res && res.code >= 0) {
                return res.data;
            } else {
                message.error('文件下载失败')
            }
        },

    }
};

export default graph
