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
