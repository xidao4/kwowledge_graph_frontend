import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    state: {
         colorList: {
             red: {
                 key: '薄暮', color: '#F5222D'
             },
             orange: {
                 key: '火山', color: '#FA541C'
             },
             yellow: {
                 key: '日暮', color: '#FAAD14'
             },
             cyan: {
                 key: '明青', color: '#13C2C2'
             },
             green: {
                 key: '极光绿', color: '#52C41A'
             },
             blue: {
                 key: '拂晓蓝', color: '#1890FF'
             },
             blue2: {
                 key: '极客蓝', color: '#2F54EB'
             },
             purple: {
                 key: '酱紫', color: '#722ED1'
             },
             pink: {
                 key: '粉色（默认）', color: '#FFB8C6'
             }
        }
    },
    modules:{

    },
    getters
})

export default store
