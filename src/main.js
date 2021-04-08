import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import echarts from 'echarts'
import '@/permission'
import './mock'

Vue.config.productionTip = false;

Vue.use(Antd);

Vue.prototype.$echarts = echarts;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
