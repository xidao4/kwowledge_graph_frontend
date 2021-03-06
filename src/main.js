import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import echarts from 'echarts'
import '@/permission'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Chat from 'jwchat';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(ElementUI);
Vue.use(Chat)

Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
