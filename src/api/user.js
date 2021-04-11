import { axios } from '@/utils/request'

const api = {
    graphPre: '/api/user'
}

export function loginAPI(data) {
    return axios({
        url: `${api.graphPre}/login`,
        method: 'POST',
        data: data
    })
}

export function testTokenAPI() {
    return axios({
        url: `/test`,
        method: 'GET',
    })
}

//获取我的图谱
export function getUserPicsAPI(data){
    return axios({
        url:`/api/graph/getUserPics`,
        method:'POST',
        data:data
    })
}

//获取历史搜索信息
export function getHistoryAPI(data){
    return axios({
        url:`${api.graphPre}/getHistory`,
        method:'POST',
        data:data
    })
}
