import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import graph from './modules/graph'
import user from './modules/user'
import util from './modules/util'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex);
//
// const modulesFiles = require.context('./modules', true, /\.js$/);
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     // set './app.js' => 'app'
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//     const value = modulesFiles(modulePath);
//     modules[moduleName] = value.default;
//     return modules
// }, {});

const PERSIST_PATHS = ['user', 'util', 'graph.picId', 'graph.currentCombos'];

const store = new Vuex.Store({
    state: {

    },
    modules: {
        graph,
        user,
        util
    },
    getters,
    plugins: [
        persistedState({
            storage: window.sessionStorage,
            paths: PERSIST_PATHS
        })
    ]
});

export default store
