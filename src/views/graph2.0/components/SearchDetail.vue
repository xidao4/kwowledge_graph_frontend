<template>
  <div>
    <div class="imgList" v-if="!(this.token===undefined || this.token==='')">
      <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/double-arro- right (1).png" class="myBot3" @click="logoutBox"/>
    </div>
    <div class="infoBar">
      <div class="info">
        <div class="information">
          <div class="key" v-if="this.searchResultDetail.categories===`['person']`">人物</div>
          <div class="key" v-if="this.searchResultDetail.categories===`['event']`">事件</div>
          <div class="key" v-if="this.searchResultDetail.categories===`['location']`">地点</div>
          <div class="key" v-if="this.searchResultDetail.categories===`['time']`">回数</div>
          <div class="value">{{this.searchResultDetail.title}}</div>
        </div>
        <div class="information" v-if="this.searchResultDetail.info!==null">
          <div class="key">简介</div>
          <div class="value">{{this.searchResultDetail.info}}</div>
        </div>
        <div v-if="this.searchResultDetail.ending!==null && this.searchResultDetail.categories===`['person']` && this.searchResultDetail.ending!==null" class="information">
          <div class="key">结局</div>
          <div class="value">{{this.searchResultDetail.ending}}</div>
        </div>
        <div v-if="this.searchResultDetail.reason!==null && this.searchResultDetail.categories===`['event']`" class="information">
          <div class="key">原因</div>
          <div class="value">{{this.searchResultDetail.reason}}</div>
        </div>
      </div>
      <div class="infoPic">
        <img :src="this.searchResultDetail.img" :alt="this.searchResultDetail.title" v-if="this.searchResultDetail.img!==null"/>
      </div>
    </div>
    <div class="bgBlock">
<!--      <a-input-search placeholder="input search text" style="width: 400px" @search="onSearch"  class="searchEntity"/>-->
      <div id="mountNode"></div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters,mapMutations} from 'vuex'
  import { GraphLayoutPredict } from '@antv/vis-predict-engine';
  import G6 from '@antv/g6';
  import {setHighlight} from '../../../components/g6/Graph.js';
  import { getToken } from '@/utils/auth'

  export default {
    name: "SearchDetail",
    data(){
      return{
        token:getToken(),
        myGraph: ''
      }
    },
    computed:{
      ...mapGetters([
        'searchResultDetail',
      ])
    },
    methods:{
      ...mapMutations([
        'logout'
      ]),
      ...mapActions([
        'getSearchAnswerDetail'
      ]),
      onSearch(value){
        setHighlight(this.myGraph,this.searchNodes,this.searchEdges);
      },
      logoutBox(){
        this.logout()
      },
      async initG6(){
        let processedEdges = [...this.searchResultDetail.edges];
        processedEdges.forEach((edge) => {
          edge.type = 'arc';
          edge.curveOffset = 30;
          edge.style={
            lineWidth: 3
          }
        });
        const initData = {
          // 点集
          nodes: this.searchResultDetail.nodes,
          // 边集
          edges: processedEdges,
        };
        const { predictLayout, confidence } = await GraphLayoutPredict.predict({
          // 点集
          nodes: this.searchResultDetail.nodes,
          // 边集
          edges: processedEdges,
        });
        console.log(predictLayout)
        const graph = new G6.Graph({
          container: 'mountNode', // 指定挂载容器
          width: 760, // 图的宽度
          height: 600, // 图的高度
          fitCenter:true,
          // fitView:true,
          fitViewPadding: 20,
          layout: {
            // Object，可选，布局的方法及其配置项，默认为 random 布局。
            type: predictLayout,
            preventOverlap: true,
            linkDistance:200,
            nodeSize: 30,
            nodeSpacing:30,
            maxPreventOverlapIteration:400,
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
        graph.on('node:click', async (ev) => {
          const shape = ev.target;
          const node = ev.item;
          console.log('我点击了！！！',node._cfg.model.label)
          // await this.getSearchAnswerDetail(node._cfg.model.label)
          await this.getSearchAnswerDetail(node._cfg.model.label)
          console.log('重新渲染')
          const data = {
            // 点集
            nodes: this.searchResultDetail.nodes,
            // 边集
            edges: processedEdges,
          };
          graph.data(data)
          console.log(data)
          graph.render()
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
    width:180px
  }
  .infoPic{
    position: absolute;
    left: 76%;
    top: 46px;
  }
  .searchEntity{
    position: absolute; left: 50%; top: 42%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }
  #mountNode{
    margin: 0 auto;
    width: 760px; height: 600px;
    position: absolute; left: 50%; top: 70%;
    transform: translate(-50%, -50%);
    /*background-color: #0074D9;*/
  }
  .myBot3{
    position: fixed;
    top: 80%;
    left: 87%;
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #ffffff;
    margin:40px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }
  .myBot3:hover{
    box-shadow: 0 3px 3px rgba(51, 51, 51, .25);
    -webkit-transform: translateY(-2px);
    -moz-transform: translateY(-2px);
    transform: translateY(-2px)
  }
</style>
