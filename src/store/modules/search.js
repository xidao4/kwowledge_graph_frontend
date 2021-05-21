import {
  getSearchResultFirstAPI,
  getSearchResultSecondAPI
} from "../../api/search";
import {message} from "ant-design-vue";
import {getUserPicsAPI} from "../../api/user";

const search={
  state:{
    searchString: '你好啊',
    searchResult: '',
    allPageNum:'',
    currentPageNum: ''
  },
  mutations:{
    set_searchResult(state, data) {
      state.searchResult = data;
    },
    set_searchString(state, data) {
      console.log('vuex里面也修改了string')
      state.searchString = data;
    },
    set_allPageNum(state, data) {
      state.allPageNum = data;
    },
    set_currentPageNum(state, data) {
      state.currentPageNum = data;
    },
  },
  actions:{
    getSearchResultFirst: async({commit,state})=>{
      //data是搜索条件+每页的条目数
      //res是总的页数
      let data={
        searchString: state.searchString,
        itemPerPage: 6
      }
      const res=await getSearchResultFirstAPI(data);
      commit('set_allPageNum',res.allPageNum)
    },
    getSearchResultSecond: async({commit,state},data)=>{
      //data是搜索条件+第几页
      //res是该页的所有条目数据
      let param={
        searchString: state.searchString,
        pageNum: data
      }
      const res=await getSearchResultSecondAPI(param);
      commit('set_searchResult',res.searchResult);
    },
  }
}

export default search