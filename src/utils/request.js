import axios from 'axios'
import router from '@/router';
import { setToken, getToken, removeToken } from '@/utils/auth'
import { message } from 'ant-design-vue'

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
      setToken(token);
    }
    return response.data
},
  err => {
    console.log(err)
    if (err.response.status === 406) {
      // 刷新token
      const { token } = err.response.headers;
      setToken(token);
    }
    if (err.response.status === 401) {
      message.error('请重新登录');
      // 先清理过期token再跳转，否则路由守卫会认为hasToken
      removeToken();
      router.push('/login')
    }
    return null;
  }
)

export {
  service as axios
}
