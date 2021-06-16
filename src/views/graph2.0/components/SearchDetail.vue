<template>
  <div>
    <div class="infoBar">
      <div class="info">
        <div class="information">
          <div class="key" v-if="this.searchResultDetail.categories==='person'">人物</div>
          <div class="key" v-if="this.searchResultDetail.categories==='event'">事件</div>
          <div class="value">{{this.searchResultDetail.title}}</div>
        </div>
        <div class="information">
          <div class="key">简介</div>
          <div class="value">{{this.searchResultDetail.info}}</div>
        </div>
        <div v-if="this.searchResultDetail.categories==='person'" class="information">
          <div class="key">结局</div>
          <div class="value">{{this.searchResultDetail.ending}}</div>
        </div>
        <div v-if="this.searchResultDetail.categories==='event'" class="information">
          <div class="key">原因</div>
          <div class="value">{{this.searchResultDetail.reason}}</div>
        </div>
      </div>
      <div class="infoPic">
        <img :src="this.searchResultDetail.img" :alt="this.searchResultDetail.title" />
      </div>
    </div>
    <div>
      <a-input-search placeholder="input search text" style="width: 400px" @search="onSearch"  class="searchEntity"/>
      <div id="mountNode"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import G6 from '@antv/g6';

  export default {
    name: "SearchDetail",
    data(){
      return{
        param:{
        }
      }
    },
    computed:{
      ...mapGetters([
        'searchResultDetail'
      ])
    },
    methods:{
      onSearch(value){

      },
      initG6(){
        const initData = {
          // 点集
          nodes: this.searchResultDetail.nodes,
          // 边集
          edges: this.searchResultDetail.edges,
        };
        const graph = new G6.Graph({
          container: 'mountNode', // 指定挂载容器
          width: 800, // 图的宽度
          height: 500, // 图的高度
          fitView: true,
          fitViewPadding: [20, 40, 50, 20],
        });
        graph.data(initData); // 加载数据
        graph.render(); // 渲染
      }
    },
    mounted() {
      this.initG6()
    },
  }
</script>

<style scoped>
  .key{
    font-family: cursive;
    font-size: 24px;
    width: 30px;
  }
  .info{
    height: 30%;
  }
  .info{
    display: flex;
    flex-direction: column;
    width: 60%;
    position: absolute;
    left: 13%;
    top: 20px;
  }
  .information{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .value{
    font-size: 16px;
    margin-left: 40px;
  }
  img{
    width:60%
  }
  .infoPic{
    position: absolute;
    left: 76%;
    top: 50px;
  }
  .searchEntity{
    position: absolute;
    left: 32%;
    top: 43%;
  }
  #mountNode{
    position: absolute;
    top: 45%;
    margin: 0 auto;
    background-color: white;
  }
</style>