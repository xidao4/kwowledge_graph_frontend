import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import VueAwesome from './components/VueAwesome'
import echarts from 'echarts'


Vue.use(Antd);

Vue.config.productionTip = false;

Vue.prototype.$moment = moment

Vue.config.productionTip = false

moment.locale('zh-cn')

Vue.use(VueAwesome)
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
