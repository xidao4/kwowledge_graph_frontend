import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueAwesome from './components/VueAwesome'
import ECharts from './components/ECharts'

Vue.use(Antd);

Vue.config.productionTip = false;

Vue.prototype.$moment = moment
Vue.prototype.$open = href => {
  const a = document.createElement('a')
  a.href = href
  a.target = '_blank'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
Vue.config.productionTip = false

moment.locale('zh-cn')

// Vue.use(NUI)
Vue.use(VueAwesome)
Vue.use(ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
