import axios from 'axios'
import store from '../store'
import router from '../router'
import { setToken, getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://118.182.96.49:8001': 'http://118.182.96.49:8001',
  timeout: 10 * 1000,
  withCredentials: true
});
const requests = [];

//request拦截器
service.interceptors.request.use(
    config => {
    requests.push(config.url);
    // const token = store.state.user.token;
    config.headers = {
      ...config.headers,
      token: getToken()
    };
    return config;
},
  error => {
    return Promise.reject(error);
});

service.interceptors.response.use(
    response => {
    if (response && response.data.code >= 0 && response.data.data.token) {
      const token = response.data.data.token;
      store.commit('set_token', token);
      setToken(token);
    }
    return response.data
},
  err => {
    if (err.response.status === 406) {
      // 刷新token
      const { token } = err.response.headers;
      store.commit('set_token', token);
      setToken(token);
    }
    if (err.response.status === 401) {
      router.push('/login')
    }
    return null
  }
)

export {
  service as axios
}
