import{
    deleteEntityAPI,
    deleteRelationAPI,
    addEntityAPI,
    addRelationAPI,
    changeEntityAPI,
    changeRelationAPI,
} from "../../api/graph";
import { message } from 'ant-design-vue'

const state = {
    graphInfo: [

    ],
    // showGraphInfo: [
    //     {
    //         node1Name: "实体1",
    //         node1Color: "#FFF",
    //         relationName: "关系1",
    //         relationType: "subClass of",
    //         relationColor: "#000",
    //         node2Name: "实体2",
    //         node2Color: "#FFF"
    //     },
    //     {
    //         node1Name: "实体2",
    //         node1Color: "#FFF",
    //         relationName: "关系2",
    //         relationType: "subClass of",
    //         relationColor: "#000",
    //         node2Name: "实体3",
    //         node2Color: "#FFF"
    //     },
    // ],
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
    ]
};

const graph = {
    state,
    mutations: {
        set_graph(state, data) {
            state.graphInfo = data
        }
    },
    actions: {
        addEntity:async({commit},param)=>{
            const res=await addEntityAPI(param)
            if(res){
                message.success('增加实体成功')
            }else{
                message.error('增加实体失败')
            }
        },
        deleteEntity:async({commit},param)=>{
            const res=await deleteEntityAPI(param)
            if(res){
                message.success('删除实体成功')
            }else{
                message.error('删除实体失败')
            }
        },
        changeEntity:async({commit},param)=>{
            const res=await changeEntityAPI(param)
            if(res){
                message.success('修改实体成功')
            }else{
                message.error('修改实体失败')
            }
        },
        addRelation:async({commit},param)=>{
            const res=await addRelationAPI(param)
            if(res){
                message.success('增加关系成功')
            }else{
                message.error('增加关系失败')
            }
        },
        changeRelation:async({commit},param)=>{
            const res=await changeRelationAPI(param)
            if(res){
                message.success('修改关系成功')
            }else{
                message.error('修改关系失败')
            }
        },
        deleteRelation:async({commit},param)=>{
            const res=await deleteRelationAPI(param)
            if(res){
                message.success('删除关系成功')
            }else{
                message.error('删除关系失败')
            }
        },
    }
};

export default graph
