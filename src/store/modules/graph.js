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
    showGraphInfo: [
        {
            node1Name: "实体1",
            node1Color: "#FFF",
            relationName: "关系1",
            relationType: "subClass of",
            relationColor: "#000",
            node2Name: "实体2",
            node2Color: "#FFF"
        },
        {
            node1Name: "实体2",
            node1Color: "#FFF",
            relationName: "关系2",
            relationType: "subClass of",
            relationColor: "#000",
            node2Name: "实体3",
            node2Color: "#FFF"
        },
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
