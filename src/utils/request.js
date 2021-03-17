// 导入axios
import axios from 'axios'
// 使用Message做消息提醒
import { message } from 'ant-design-vue'
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: 'http://118.182.96.49:8001',
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000,
  withCredentials: true
})

//request拦截器
service.interceptors.request.use((config) => {
  const requestConfig = {
    ...config,
    url: `${config.url}`,
  }
  return requestConfig
},
  error => {
    return Promise.reject(err);
})

export {
  service as axios
}