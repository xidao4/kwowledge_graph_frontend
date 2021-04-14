import { axios } from '@/utils/request'

const api = {
  graphPre: '/api/graph'
}

export function getAllAPI(data) {
  return axios({
    url: `${api.graphPre}/getAll`,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}



// 修改实体
export function changeEntityAPI(data) {
  console.log('changeEntity',data)
  return axios({
    url: `${api.graphPre}/changeEntity`,
    method: 'POST',
    data
  })
}

// 新增实体
export function addEntityAPI(data) {
  console.log('addEntity',data)
  return axios({
    url: `${api.graphPre}/addEntity`,
    method: 'POST',
    data
  })
}

// 删除实体
export function deleteEntityAPI(data) {
  console.log('deleteEntity',data)
  return axios({
    url: `${api.graphPre}/deleteEntity`,
    method: 'POST',
    data
  })
}

// 新增关系
export function addRelationAPI(data) {
  console.log('addRelation',data)
  return axios({
    url: `${api.graphPre}/addRelation`,
    method: 'POST',
    data
  })
}

// 修改关系
export function changeRelationAPI(data) {
  console.log('changeRelation',data)
  return axios({
    url: `${api.graphPre}/changeRelation`,
    method: 'POST',
    data
  })
}

// 删除关系
export function deleteRelationAPI(data) {
  console.log('deleteRelation',data)
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
    data
  })
}

export function saveAPI(data) {
  return axios({
    url: `${api.graphPre}/save`,
    method: 'POST',
    data,
  })
}

export function thumbnailAPI(data) {
  return axios({
    url: `${api.graphPre}/thumbnail/${data.picId}/${data.userId}/${data.picName}`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}

export function getPicElementsAPI(data) {
  console.log('get', data);
  return axios({
    url: `${api.graphPre}/getPicElements`,
    method: 'POST',
    data,
  })
}

//根据picId获取 节点的类型-个数 和 边的类型-个数 两个map
export function getPicTypesAPI(data){
  return axios({
    url:`${api.graphPre}/getPicTypes`,
    method:'POST',
    data
  })
}

//模糊匹配
export function searchAPI(data){
  return axios({
    url:`${api.graphPre}/search`,
    method:'POST',
    data
  })
}

//获取 类型-节点集合 的Map useless
export function getNodesByTypesAPI(data){
  return axios({
    url:`${api.graphPre}/getNodesByTypes`,
    method:'POST',
    data
  })
}

//获取 类型数组
export function getNodeTypesAPI(data){
  return axios({
    url:`${api.graphPre}/getNodeTypes`,
    method:'POST',
    data
  })
}

