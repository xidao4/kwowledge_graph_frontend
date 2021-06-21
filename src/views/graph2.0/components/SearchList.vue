<template>
  <body>

<!--    <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/message.png" class="myBot" @click="showBox"/>-->
<!--    <div class="bodyStyle"></div>-->
    <div class="imgList" v-if="!(this.token===undefined || this.token==='')">
      <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/double-arro- right (1).png" class="myBot3" @click="logoutBox"/>
    </div>
    <div class="bgContent">
      <div class="headBar">
        <img class='logo' src="http://i3.sinaimg.cn/gm/j/n/2008-12-30/U1850P115T9D289891F364DT20081230185442_c.jpg" />
        <form class="search-form" onkeypress="return event.keyCode !== 13;">
          <input v-model="searchCondition" placeholder="搜你想搜" class="search-input" @keydown.enter="searchContent">
        </form>
      </div>
      <a-divider />
      <div class="page404">
        <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320" v-if="this.searchResult==='我也还不知道！'"><g fill="none" fill-rule="evenodd"><path fill="#D3E0ED" d="M126.712 193.336c0 34.697-28.159 62.824-62.895 62.824-34.735 0-62.894-28.127-62.894-62.824 0-34.696 28.159-62.824 62.894-62.824 34.736 0 62.895 28.128 62.895 62.824"></path><path fill="#E6EEF4" d="M13.492 226.305l153.5-135.884 153.5 135.884z"></path><path fill="#E6EEF4" d="M59.912 169.681l107.55-94.917 107.552 94.917z"></path><path fill="#E6EEF4" d="M167.463 59.166l-61.132 53.95h122.263z"></path><path stroke="#2B6BCC" stroke-linecap="round" stroke-width="1.179" d="M140.981 174.791v-56.249"></path><path stroke="#104799" stroke-linecap="round" stroke-linejoin="round" stroke-width="5.559" d="M169.632 227.325v21.51l-4.219.768M199.48 218.861s.892 13.194 12.598 15.041l1.602 4.75"></path><path stroke="#96ACCC" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.147" d="M205.786 103.076l-1.543-3.188M212.619 101.965l.342-3.337M218.923 107.422l2.491-3.664"></path><path fill="#FFF" d="M189.917 120.346c3.72 16.145-6.366 32.247-22.53 35.963-16.163 3.717-32.282-6.359-36.003-22.504-3.72-16.145 6.366-32.247 22.53-35.963 16.163-3.717 32.282 6.358 36.003 22.504m36.826 62.586c3.88 16.835-4.27 33.08-43.516 42.105-39.246 9.024-53.687-2.026-57.567-18.862-3.88-16.835 15.603-35.686 43.517-42.105 27.913-6.418 53.687 2.026 57.566 18.862"></path><path fill="#FFF" d="M146.034 105.255c1.15 4.992-1.968 9.97-6.966 11.12-4.997 1.148-9.981-1.967-11.132-6.959-1.15-4.992 1.968-9.97 6.966-11.12 4.998-1.149 9.982 1.966 11.132 6.959m36.031-8.285c1.15 4.992-1.968 9.97-6.966 11.12-4.997 1.148-9.981-1.967-11.132-6.959-1.15-4.992 1.968-9.97 6.966-11.12 4.997-1.149 9.982 1.966 11.132 6.959m8.556 28.1s1.021.702 2.125.363c.78-.24 1.22-.886 1.408-1.175 1.92-2.945 3.109-14.219 8.284-20.226.901-1.046 2.661-3.036 5.507-3.695 5.543-1.283 10.436 3.58 10.866 4.02 4.309 4.406 4.224 10.473 4.172 14.129-.177 12.681-8.22 24.184-17.032 27.66-1.476.58-2.311.677-3.078.612-8.085-.69-11.858-19.62-12.252-21.688"></path><path fill="#FFF" d="M226.743 182.932s-6.532-28.836-33.21-55.331l-2.912-2.531-57.799 13.29-1.514 3.548c-12.395 35.48-5.648 64.267-5.648 64.267"></path><path fill="#96ACCC" d="M146.233 123.914c.915-.223 1.476-.791 1.76-1.614.143-.52.12-1.052.008-1.509-.223-.914-.64-1.513-1.272-1.897-.608-.282-1.217-.349-1.917-.124a3.33 3.33 0 00-1.606 1.146c-.384.631-.49 1.303-.303 2.065.137.56.35.991.59 1.31.606.713 1.52.921 2.74.623m25.913-6.647c.916-.223 1.565-.651 1.85-1.474.346-.784.388-1.495.2-2.041-.25-.585-.68-1.018-1.3-1.351a2.182 2.182 0 00-1.7-.124c-1.577.385-2.129 1.435-1.707 3.162.013.051.15.394.426 1.08.543.676 1.252.933 2.231.748m-20.328-.26c.027-.115.052-.229.09-.292-.012-.051-.024-.102.027-.114.064-.177.078-.342.205-.48l-.012-.052c.026-.114.077-.126.103-.24l.203-.05a.472.472 0 00.012.266c-.268.227-.46.543-.628.961zm10.297.232l.078-.342a.447.447 0 01.087.355l-.165-.013zm-1.689 2.35c-.14.088-.318.24-.47.276.037-.063.025-.114.064-.177.101-.024.305-.074.496-.175-.039.063-.039.063-.09.076zm-4.084 1.59c.05-.013.126.076.126.076-.267.01-.495-.041-.774-.08.369-.037.534-.023.648.003zm2.262-2.653l-.253-.153c-.013-.051.025-.114.013-.165.114.026.228.052.33.027l.05-.012a.917.917 0 01-.14.303zm-.894-3.873c.076.09.14.128.164.23a.288.288 0 01-.09.29l-.077.127a1.39 1.39 0 01.003-.647zm-3.606 4.648c.063.039.076.09.178.065.076.09.164.23.341.293.051-.012.114.027.126.077.025.102 0 .216-.077.342-.027.114-.027.114-.065.178l-.101.024c-.166-.013-.216 0-.394-.065 0 0-.025-.102-.088-.14l-.062-.254c-.013-.05.026-.115.026-.115.064-.177.09-.29.116-.405zm-.177-4.91l-.101.026c.09-.291.307-.506.51-.556-.242.33-.358.519-.409.53zm-4.18.537c-.141.303-.27.658-.348 1-.426 1.342-.447 2.8-.112 4.388.646 2.641 1.933 4.157 3.962 4.524l-.05.012c1.597.364 3.706.172 6.263-.613 2.518-.722 4.288-1.639 5.296-2.585l.05-.012c1.25-1.059 1.628-2.82 1.122-5.334-.496-2.248-1.68-4.004-3.592-5.207-1.898-1.152-4.131-1.468-6.56-.821-2.44.596-4.25 1.79-5.416 3.636-.23.38-.474.708-.602 1.062l-.013-.05zm13.276 10.649c-1.564 2.643-3.383 3.356-5.485 2.254-.178-.065-.355-.13-.559-.08-.254.063-.382.201-.496.39a.748.748 0 00-.08.559c.05.203.15.394.391.496 2.898 1.716 5.469.765 7.609-2.825.064-.177.129-.355.066-.609a.645.645 0 00-.378-.446c-.19-.115-.419-.167-.571-.13-.254.062-.382.201-.497.39"></path><path fill="#F0F4F7" d="M216.852 108.93a1.593 1.593 0 00-.196.748c-.003.536.273.9.36 1.014a1.732 1.732 0 001.191.655 1.647 1.647 0 001.08-.503c.128-.13.522-.533.498-1.116-.02-.492-.325-.817-.445-.944-.097-.104-.536-.572-1.23-.552-.774.021-1.211.63-1.258.698m-2.564-1.56c.1-.075.692-.52.678-1.236-.01-.541-.36-.9-.491-1.034a1.809 1.809 0 00-1.024-.519 1.821 1.821 0 00-1.135.215c-.209.113-.62.336-.755.792-.079.27-.027.501.002.63.1.453.383.735.516.866.138.134.74.721 1.528.591.345-.056.577-.227.68-.304m-.658 2.248c-.834-.874-1.793-1.38-2.88-1.519-.3-.055-.597-.07-.887-.048-1.11.086-2.02.813-2.292 1.04a5.06 5.06 0 00-1.228 1.527c-.13.27-.314.751-.294 1.355.034.986.58 1.674.96 2.108.139.157.682.803 1.641 1.29.246.125 1.22.597 2.585.589.804-.005 1.764-.01 2.612-.687a3.261 3.261 0 001.01-1.431c.153-.428.208-.894.165-1.4-.102-1.065-.59-1.986-1.392-2.824m-7.835-4.3c-.201.177-.343.408-.358.432a2.192 2.192 0 00-.18.347 1.186 1.186 0 00-.044.549c.048.306.202.506.287.602.382.435.819.566 1.337.496.345-.046.699-.228.953-.451.183-.16.525-.473.559-.971.034-.488-.251-.837-.336-.941-.08-.098-.429-.5-1.004-.548 0 0-.615-.041-1.214.485"></path><path stroke="#96ACCC" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.147" d="M109.824 124.481l-.008-3.541M103.192 126.466l-1.769-2.852M99.911 134.127l-3.844-2.207"></path><path fill="#FFF" d="M132.822 138.36s-.61 1.078-1.752 1.255c-.805.125-1.485-.264-1.78-.442-3.016-1.81-9.02-11.43-16.304-14.573-1.268-.547-3.722-1.567-6.57-.917-5.547 1.267-7.819 7.777-8.013 8.36-1.947 5.845.786 11.264 2.432 14.53 5.71 11.328 17.98 18.16 27.426 17.437 1.581-.121 2.375-.4 3.036-.794 6.969-4.15 2.076-22.824 1.525-24.855"></path><path fill="#F0F4F7" d="M100.997 134.5c-.633.285-.823.898-.865 1.034-.052.167-.184.593.013 1.044.234.535.764.725.936.786a1.667 1.667 0 001.192-.02 1.731 1.731 0 00.784-1.109c.03-.14.117-.589-.12-1.069-.155-.313-.38-.499-.503-.587-.072-.04-.732-.398-1.437-.079m3.806-2.467c.765-.227 1.05-1.019 1.115-1.2.063-.176.193-.552.086-1.003-.031-.129-.086-.36-.275-.567-.32-.352-.788-.373-1.025-.383a1.826 1.826 0 00-1.116.302c-.113.077-.51.364-.693.914-.059.178-.217.653.01 1.145.302.65 1.029.791 1.152.815.127.025.41.077.746-.023m.816 4.906c.182.474.435.868.76 1.186.156.154.697.658 1.536.846 1.058.238 1.923-.175 2.648-.523a5.716 5.716 0 002.068-1.657c.65-.858.855-1.676.91-1.879.154-.555.342-1.413-.059-2.314a2.922 2.922 0 00-.857-1.09 5.056 5.056 0 00-1.773-.837c-.344-.086-1.48-.342-2.516.065-.271.107-.531.25-.777.43-.917.6-1.558 1.475-1.925 2.625-.354 1.104-.39 2.144-.015 3.148m3.875-10.344c-.497.295-.635.81-.663.932-.031.13-.134.569.11.992.248.434.693.566.927.63.326.09.724.099 1.055-.01.496-.164.832-.473.985-1.03a1.19 1.19 0 00-.005-.667 1.188 1.188 0 00-.28-.475 2.214 2.214 0 00-.314-.234c-.024-.015-.253-.16-.511-.231-.77-.212-1.304.093-1.304.093"></path><path stroke="#104799" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.147" d="M172.275 196.57s4.204 1.93 9.473 2.983m-1.395-5.407s-2.978 5.156-5.549 7.883"></path><path fill="#F0F4F7" d="M272.633 107.307a4.092 4.092 0 017.858-1.595 2.684 2.684 0 011.769-.663c.57 0 1.098.177 1.534.48a8.122 8.122 0 018.121-7.895c4.488 0 8.127 3.635 8.127 8.118a8.12 8.12 0 01-.258 2.036l7.845 1.805h-43.474l8.478-2.286zm-10.246-34.161a7.7 7.7 0 00.237-1.9c0-4.247-3.446-7.689-7.697-7.689a7.696 7.696 0 00-7.557 6.23 5.24 5.24 0 00-3.523-1.355c-.031 0-.062.004-.094.004a9.442 9.442 0 00-9.385-8.374 9.44 9.44 0 00-9.419 8.753 5.84 5.84 0 00-9.807 4.281l-11.247 2.182h68.381l-9.889-2.132z"></path><path fill="#FFF" d="M69.006 198.77c0 .098 0 .23-.033.363-.099-.067-.23-.133-.33-.199.132-.066.264-.132.363-.165m-.595 4.525v-.132l.199.1-.133.132c-.033-.034-.033-.066-.066-.1"></path><path stroke="#104799" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.836" d="M43.371 240.105v17.587M52.601 239.937l-.924 17.755M54.63 257.692h-3.673M44.271 257.692h-3.323"></path><path stroke="#96ACCC" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.147" d="M28.42 200.93s-8.833-8.125-14.28-14.29M17.793 185.697l-1.289 3.523-3.678.958M66.571 186.64l6.384-7.458M68.699 178.366l1.931 3.533 4.479.277"></path><path fill="#FFF" d="M24.262 217.074s-8.488-2.6-10.013 4c-1.356 5.872 1.808 11.292 9.043 10.389"></path><path fill="#FFF" d="M26.683 177.04s-1.13 10.613-1.809 18.969c-.367 4.524-2.487 33.195-1.582 36.809.904 3.613 3.843 7 12.886 7.452 9.043.451 32.103 1.355 34.363-4.517 2.261-5.87 1.809-32.97 1.809-32.97s6.422-.525 9.943-1.955c3.172-1.288 4.063-2.185 5.204-4.142 2.25-3.86.203-10.632-3.843-12.872-2.045-1.131-16.278 1.355-16.278 1.355s-4.07-5.871-7.234-8.581c0 0-3.843 4.29-5.2 7.452 0 0-10.4-.452-16.73.904 0 0-8.59-6.323-11.53-7.904"></path><path fill="#96ACCC" d="M79.032 201.787c1.176-.26 2.322-.578 3.261-.96 3.172-1.288 4.063-2.185 5.204-4.14 2.25-3.86.203-10.633-3.844-12.873-.916-.507-4.285-.287-7.722.11 0 0-.443 4.45.386 9.94.829 5.49 2.715 7.923 2.715 7.923m-27.707-8.473c0 1.485-1.28 2.808-2.728 2.725-1.56-.09-2.618-1.77-2.366-3.23.192-1.106 1.146-2.152 2.366-2.22 1.442-.08 2.728 1.236 2.728 2.725"></path><path fill="#F0F4F7" d="M91.678 253.91c0-59.458 33.227-107.659 74.215-107.659 40.988 0 74.216 48.201 74.216 107.66"></path><path fill="#D3E0ED" d="M268.293 190.945c-2.919 0-5.285 2.332-5.285 5.21v15.242h-2.262v-17.755c0-6.89-5.665-12.474-12.654-12.474-6.99 0-12.655 5.584-12.655 12.474v36.43h-2.221v-19.945c0-2.877-2.366-5.21-5.285-5.21s-5.285 2.333-5.285 5.21v25.154c0 2.877 2.366 5.21 5.285 5.21h7.506v17.784h25.31v-36.46h7.546c2.919 0 5.285-2.332 5.285-5.21v-20.45c0-2.878-2.366-5.21-5.285-5.21m-144.517 50.316a7.95 7.95 0 00.53-2.837c0-4.463-3.666-8.08-8.188-8.08-.976 0-1.906.176-2.774.486a5.98 5.98 0 00.234-1.644c0-3.351-2.753-6.069-6.148-6.069a6.156 6.156 0 00-5.44 3.244 7.204 7.204 0 00-6.553-4.169c-3.762 0-6.846 2.848-7.172 6.477a7.231 7.231 0 00-4.08-1.253 7.27 7.27 0 00-1.726.215c.001-.072.01-.143.01-.215 0-5.479-4.5-9.92-10.05-9.92-2.791 0-5.315 1.123-7.136 2.935-.606-4.908-4.834-8.711-9.97-8.711-4.621 0-8.504 3.082-9.679 7.274a10.086 10.086 0 00-5.293-1.498c-5.552 0-10.052 4.441-10.052 9.92 0 .092.011.18.014.271a7.012 7.012 0 00-1.917-.27c-3.834 0-6.943 3.067-6.943 6.851a6.77 6.77 0 001.807 4.6c-3.284.544-5.788 3.354-5.788 6.75 0 2.02.891 3.83 2.3 5.084-1.409 1.255-2.3 3.066-2.3 5.086 0 3.784 3.109 6.852 6.943 6.852h95.518c3.835 0 6.944-3.068 6.944-6.852a6.77 6.77 0 00-1.679-4.46c1.71-.922 2.87-2.713 2.87-4.771 0-2.586-1.831-4.746-4.282-5.296z"></path></g></svg>
        <div style="margin-left: 8%" v-if="this.searchResult==='我也还不知道！'">陷入了我的知识盲区~</div>
      </div>
      <div class="answer" v-if="this.searchResult.code===2 || this.searchResult.code===3">{{this.searchResult.answer}}</div>
      <h2 class="question" v-if="this.searchResult.code===2 || this.searchResult.code===3">{{this.searchString}}-红楼知道</h2>
      <a-divider class="bottomDivider" v-if="this.searchResult.code===2 || this.searchResult.code===3"/>
      <div class="contentPart">
        <div v-if="this.searchResult.code===0 || this.searchResult.code===1">
          <search-card v-for="(item,index) in this.searchResult.answerList" :cardIndex="index" :signal="0"></search-card>
        </div>
        <div v-if="(this.searchResult.code===0 || this.searchResult.code===2) && (this.searchResult.contentList.length!==0)">
          <h4 class="moreInfo">与此问题相关的实体：</h4>
          <search-card v-for="(item,index) in this.searchResult.contentList" :cardIndex="index" id="ccc" :signal="1"></search-card>
        </div>
      </div>
      <div id="mountNode" :class="this.searchResult.answerList.length>=4?'leftPosition':'none'" v-if="this.searchResult.code===1 || this.searchResult.code===3"></div>
<!--      <div class="pageBox" v-if="this.searchResult.code===0">-->
<!--        <a-pagination :default-current="1" v-model="currentPage" :total="this.searchResult.answerList.length" class="pageBar" :defaultPageSize="10" :hideOnSinglePage="true" @change="changePageNum"/>-->
<!--      </div>-->
    </div>
<!--    <JwChat-index-->
<!--      :taleList="list"-->
<!--      @enter="bindEnter"-->
<!--      v-model="inputMsg"-->
<!--      :showRightBox="false"-->
<!--      :config="config"-->
<!--      :toolConfig="tool"-->
<!--      :class="{'chatBox':ifNotShowBox,'contentBox':true}"-->
<!--      scrollType="scroll"-->
<!--    />-->
  </body>
</template>

<script>
  import $ from 'jquery'
  import SearchCard from "./SearchCard";
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import { GraphLayoutPredict } from '@antv/vis-predict-engine';
  import G6 from '@antv/g6';
  import { getToken } from '@/utils/auth'
  export default {
    name: "SearchList",
    computed:{
      ...mapGetters([
        "searchString",
        "searchResult",
      ])
    },
    data(){
      return{
        token:getToken(),
        currentPage: '',
        searchCondition:  this.searchString,
        inputMsg:'',
        list:[
          {
            "date": "2020/04/25 21:19:07",
            "text": { "text": "智能机器人为你回答" },
            "mine": false,
            "name": "智能机器人",
            "img": "https://ydl8023.oss-cn-beijing.aliyuncs.com/avatar19.png"
          },
        ],
        config:{
          img: 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/index-home-pie.png?_v_=20200710_1',
          name: 'SuperChat',
          dept: '想你所想',
        },
        tool:{
          show:[]
        },
        ifNotShowBox:true,
        isVirtual:false,
        myGraph: ''
      }
    },
    components:{
      SearchCard
    },
    methods:{
      ...mapMutations([
        'logout',
        'set_searchString'
      ]),
      ...mapActions([
        "getSearchAnswer"
      ]),
      async searchContent(){
        console.log('搜索？？？',this.searchCondition)
        this.set_searchString(this.searchCondition)
        console.log('搜索！！！',this.searchString)
        await this.getSearchAnswer()
        console.log(this.searchResult)
        if(this.searchResult.code===1 || this.searchResult.code===3) {
          if(Object.keys(this.myGraph).length !== 0) {
            console.log('最初的起点',this.myGraph)
            this.myGraph.destroy()
          }
          console.log('为啥不更新')
          let processedEdges = [...this.searchResult.showGraphData.edges];
          processedEdges.forEach((edge) => {
            edge.type = 'line';
            // edge.curveOffset = 30;
            edge.style={
              lineWidth: 1,
              endArrow: true,
              stroke: '#999999'
            }
          });
          G6.Util.processParallelEdges(processedEdges);
          const data = {
            // 点集
            nodes: this.searchResult.showGraphData.nodes,
            // 边集
            edges: processedEdges,
          };
          const { predictLayout, confidence } = await GraphLayoutPredict.predict({
            // 点集
            nodes: this.searchResult.showGraphData.nodes,
            // 边集
            edges: processedEdges,
          });
          console.log(predictLayout)
          let graph = new G6.Graph({
            container: 'mountNode', // 指定挂载容器
            width: 600, // 图的宽度
            height: 400, // 图的高度
            fitCenter:true,
            // fitView:true,
            fitViewPadding: 20,
            modes: {
              default: ['drag-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
            },
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
                fill: '#D99CA8', // 节点填充色
                stroke: '#D99CA8', // 节点描边色
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
            defaultEdge: {
              // ... 其他属性
              style: {
                lineWidth: 3,
                // endArrow: {
                //   path: G6.Arrow.triangle(),
                //   fill: "#D99CA8"
                // },
                // ... 其他样式属性
              },
            },
          });
          this.myGraph=graph;
          console.log('再次搜索后的图数据',data)
          this.myGraph.data(data); // 加载数据
          this.myGraph.render(); // 渲染
          console.log('再次搜索后的图数据',data)
          console.log('为啥不更新')
        }
      },
      changePageNum(pageNum,pageSize){
        //pageNum改变后的页码，pageSize都是6
      },
      logoutBox(){
        this.logout()
      },
      bindEnter(){
        const msg=this.inputMsg
        const msgObj = {
          "date": "2020/05/20 23:19:07",
          "text": { "text": msg },
          "mine": true,
          "name": "我",
          "img": "https://ydl8023.oss-cn-beijing.aliyuncs.com/柴犬.jpeg"
        }
        this.list.push(msgObj)
        const msgObj2 = {
          "date": "2020/05/20 23:19:07",
          "text": { "text": "我不好" },
          "mine": false,
          "name": "智能机器人",
          "img": "https://ydl8023.oss-cn-beijing.aliyuncs.com/avatar19.png"
        }
        this.list.push(msgObj2)
      },
      showBox(){
        this.ifNotShowBox=!this.ifNotShowBox
        this.isVirtual=!this.isVirtual
        console.log(this.ifNotShowBox)
      },
      async initG6(){
        let processedEdges = [...this.searchResult.showGraphData.edges];
        processedEdges.forEach((edge) => {
          edge.type = 'line';
          // edge.curveOffset = 30;
          edge.style={
            lineWidth: 1,
            endArrow: true,
            stroke: '#999999'
          }
        });
        G6.Util.processParallelEdges(processedEdges);
        const initData = {
          // 点集
          nodes: this.searchResult.showGraphData.nodes,
          // 边集
          edges: processedEdges,
        };
        const { predictLayout, confidence } = await GraphLayoutPredict.predict({
          // 点集
          nodes: this.searchResult.showGraphData.nodes,
          // 边集
          edges: processedEdges,
        });
        console.log(predictLayout)
        let graph = new G6.Graph({
          container: 'mountNode', // 指定挂载容器
          width: 600, // 图的宽度
          height: 400, // 图的高度
          fitCenter:true,
          // fitView:true,
          fitViewPadding: 20,
          modes: {
            default: ['drag-canvas', 'drag-node'], // 允许拖拽画布、放缩画布、拖拽节点
          },
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
              fill: '#D99CA8', // 节点填充色
              stroke: '#D99CA8', // 节点描边色
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
          defaultEdge: {
            // ... 其他属性
            style: {
              lineWidth: 3,
              // endArrow: {
              //   path: G6.Arrow.triangle(),
              //   fill: "#D99CA8"
              // },
              // ... 其他样式属性
            },
          },
        });
        this.myGraph=graph;
        graph.data(initData); // 加载数据
        graph.render(); // 渲染
        // graph.on('node:click', async (ev) => {
        //   const shape = ev.target;
        //   const node = ev.item;
        //   console.log('我点击了！！！',node._cfg.model.label)
        //   // await this.getSearchAnswerDetail(node._cfg.model.label)
        //   await this.getSearchAnswerDetail('贾兰')
        //   console.log('重新渲染')
        //   const data = {
        //     // 点集
        //     nodes: this.searchResultDetail.nodes,
        //     // 边集
        //     edges: processedEdges,
        //   };
        //   graph.data(data)
        //   console.log(data)
        //   graph.render()
        // });
      }
    },
    mounted() {
      console.log('token',this.token)
      console.log('现在是什么',this.searchString)
      console.log('页面渲染的数据',this.searchResult)
      this.searchCondition=this.searchString
      $('.search-input').focus(function(){
        $(this).parent().addClass('focus');
      }).blur(function(){
        $(this).parent().removeClass('focus');
      })
      if(this.searchResult.code===1 || this.searchResult.code===3) {
        console.log('会渲染么')
        this.initG6()
      }
    }
  }
</script>

<style scoped lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

$color: #e24040;

body {
  /*background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fspider.nosdn.127.net%2F056b09f38fcd0ac720b1079cd991b5de.jpeg&refer=http%3A%2F%2Fspider.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626164318&t=15c176c5ef8893498c63826ae749178a");*/
  /*background-size: 100% 100%;*/
  /*height: 100%;*/
  /*position: fixed;*/
  /*width: 100%;*/
  /*margin: 0;*/
  color: #5a6674;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
}
.bodyStyle{
  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fspider.nosdn.127.net%2F056b09f38fcd0ac720b1079cd991b5de.jpeg&refer=http%3A%2F%2Fspider.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626164318&t=15c176c5ef8893498c63826ae749178a");
  background-size: 100% 100%;
  opacity: 0.5;
  height: 100%;
  position: fixed;
  width: 100%;
  margin: 0;
}
$color: #e24040;
.search-form {
  margin-left: 310px;
  margin-top: 36px;
  width: 600px;
  height: 50px;
  border-radius: 40px;
  border: 1px;
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, 0);
  background: #fff;
  transition: all 0.3s ease;

&.focus {
   box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
 }
}

.search-input {
  position: absolute;
  top: 23%;
  left: 5%;
  font-size: 18px;
  background: none;
  color: #5a6674;
  width: 580px;
  height: 30px;
  border: none;
  appearance: none;
  outline: none;

&::-webkit-search-cancel-button {
   appearance: none;
 }
}
  body{
    overflow: auto;
  }
  .pageBox{
    width: 46%;
    height: 100px;
    margin-left: 12%;
    margin-bottom: 1.3%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.myBot{
  position: fixed;
  top: 80%;
  left: 80%;
  width: 60px;
  height: 60px;
  cursor: pointer;
}
.myBot:hover{
  box-shadow: 0 3px 3px rgba(51, 51, 51, .25);
  -webkit-transform: translateY(-2px);
  -moz-transform: translateY(-2px);
  transform: translateY(-2px)
}
.chatBox{
  display: none;
}
.contentBox{
  position: fixed;
  top: 10%;
  left: 24%;
}
.bgContent{
  /*opacity: 0.3;*/
  /*border: 1px solid black;*/
  z-index: 11;
}
.contentPart{
  z-index: 111;
  opacity: 1;
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
  .imgList{
    z-index: 111;
  }
  #ccc{
    z-index: 111;
  }
  .answer{
    font-size: 18px;
    font-family: cursive;
    margin-left: 120px;
    width: 600px;
  }
  .question{
    color: #cd6657;
    font-size: 20px;
    font-weight: normal;
    margin-left: 120px;
    margin-top: 20px;
    margin-bottom: -10px;
  }
.bottomDivider{
  margin-left: 120px;
  min-width: 600px;
  width: 30%;
}
  .moreInfo{
    margin-left: 120px;
    font-size: 18px;
    font-family: cursive;
    margin-bottom: 10px;
    margin-top: 40px;
  }
#mountNode{
  margin-left: 120px;
  width: 600px; height: 400px;
  /*background-color: #0074D9;*/
}
  .leftPosition{
    position: absolute;
    left: 46%;
    top:30%
  }
  .page404{
    margin-left: 12%;
  }
  .logo{
    width: 100px;
    height: 50px;
    margin-top: 40px;
  }
  .headBar{
    display: flex;
    flex-direction: row;
  }
/*img{*/
/*  width: 8%;*/
/*  height: 8%;*/
/*  margin-left: 2%;*/
/*  margin-top: 2%;*/
/*}*/
</style>