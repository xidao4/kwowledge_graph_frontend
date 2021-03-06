import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import search from "./modules/search";
import graph from './modules/graph'
import user from './modules/user'
import util from './modules/util'
import chat from "./modules/chat";
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

const PERSIST_PATHS = [
    'user',
    'graph.picId',
    'graph.currentCombos',
    'graph.currentGraphData',
    'graph.currentShowGraphData',
    'graph.nodeId',
    'graph.relationId',
    'search.searchResult',
    'search.searchString',
    'search.searchResultDetail'
];

const store = new Vuex.Store({
    state: {

    },
    modules: {
        graph,
        user,
        search,
        chat,
        util
    },
    getters,
    plugins: [
        persistedState({
            // storage: window.sessionStorage,
            paths: PERSIST_PATHS
        })
    ]
});

export default store
