import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import echarts from 'echarts'
import '@/permission'

Vue.config.productionTip = false;

Vue.use(Antd);

Vue.prototype.$moment = moment;
moment.locale('zh-cn');

Vue.prototype.$echarts = echarts;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
