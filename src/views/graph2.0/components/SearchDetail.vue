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
    <div class="bgBlock">
<!--      <a-input-search placeholder="input search text" style="width: 400px" @search="onSearch"  class="searchEntity"/>-->
      <div id="mountNode"></div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import G6 from '@antv/g6';
  import {setHighlight} from '../../../components/g6/Graph.js';

  export default {
    name: "SearchDetail",
    data(){
      return{
        myGraph: ''
      }
    },
    computed:{
      ...mapGetters([
        'searchResultDetail'
      ])
    },
    methods:{
      ...mapActions([
        'getSearchAnswerDetail'
      ]),
      onSearch(value){
        setHighlight(this.myGraph,this.searchNodes,this.searchEdges);
      },
      async initG6(){
        let processedEdges = [...this.searchResultDetail.edges];
        processedEdges.forEach((edge) => {
          edge.type = 'arc';
          edge.curveOffset = 30;
        });
        const initData = {
          // 点集
          nodes: this.searchResultDetail.nodes,
          // 边集
          edges: processedEdges,
        };
        const graph = new G6.Graph({
          container: 'mountNode', // 指定挂载容器
          width: 760, // 图的宽度
          height: 400, // 图的高度
          layout: {
            // Object，可选，布局的方法及其配置项，默认为 random 布局。
            type: 'radial',
            preventOverlap: true,
            nodeSize: 30,
            // workerEnabled: true, // 是否启用 webworker
            // gpuEnabled: true // 是否使用 gpu 版本的布局算法，G6 4.0 支持，目前仅支持 gForce 及 fruchterman
            // ...                    // 其他配置
          },
          defaultNode: {
            size: 30, // 节点大小
            // ...                 // 节点的其他配置
            // 节点样式配置
            style: {
              fill: 'steelblue', // 节点填充色
              stroke: '#666', // 节点描边色
              lineWidth: 1, // 节点描边粗细
            },
            // 节点上的标签文本配置
            labelCfg: {
              // 节点上的标签文本样式配置
              position: 'bottom',
              style: {
                fill: '#000', // 节点标签文字颜色
              },
            },
          },
        });
        this.myGraph=graph;
        graph.data(initData); // 加载数据
        graph.render(); // 渲染
        graph.on('node:click', (ev) => {
          const shape = ev.target;
          const node = ev.item;
          console.log('我点击了！！！',node._cfg.model.label)
          this.getSearchAnswerDetail(node._cfg.model.label)
        });
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
    position: absolute; left: 50%; top: 42%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }
  #mountNode{
    margin: 0 auto;
    width: 760px; height: 400px;
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
