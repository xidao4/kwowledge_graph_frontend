function install (Vue) {
  const echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  Vue.prototype.$echarts = echarts
}

export default install
