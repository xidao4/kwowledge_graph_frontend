import { axios } from '@/utils/request'

const api = {
  graphPre: '/api/graph'
}


// 修改实体
export function changeEntityAPI(data) {
  return axios({
    url: `${api.graphPre}/changeEntity`,
    method: 'POST',
    data
  })
}

// 新增实体
export function addEntityAPI(data) {
  return axios({
    url: `${api.graphPre}/addEntity`,
    method: 'POST',
    data
  })
}

// 删除实体
export function deleteEntityAPI(data) {
  return axios({
    url: `${api.graphPre}/deleteEntity/${data}`,
    method: 'GET'
  })
}

// 新增关系
export function addRelationAPI(data) {
  return axios({
    url: `${api.graphPre}/addRelation`,
    method: 'POST',
    data
  })
}

// 修改关系
export function changeRelationAPI(data) {
  return axios({
    url: `${api.graphPre}/changeRelation`,
    method: 'POST',
    data
  })
}

// 删除关系
export function deleteRelationAPI(data) {
  return axios({
    url: `${api.graphPre}/deleteEntity`,
    method: 'POST',
    data
  })
}

// 下载文件
export function downloadAPI(data) {
  return axios({
    url: `${api.graphPre}/download`,
    method: 'POST',
    data,
    responseType: "arraybuffer",//设置数据格式
  })
}
