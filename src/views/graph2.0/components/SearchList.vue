<template>
  <body>
<!--    <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/message.png" class="myBot" @click="showBox"/>-->
    <div :class="{'bgContent':isVirtual}">
      <div>
        <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/index-home-pie.png?_v_=20200710_1">
        <form class="search-form" onkeypress="return event.keyCode !== 13;">
          <input v-model="searchCondition" placeholder="搜你想搜" class="search-input" @keydown.enter="searchContent">
        </form>
      </div>
      <a-divider />
      <div class="contentPart">
        <search-card v-for="item in this.searchResult" :movie-description="item.info" :movie-name="item.title"></search-card>
      </div>
<!--      <div class="pageBox">-->
<!--        <a-pagination :default-current="1" v-model="currentPage" :total="100" class="pageBar" :defaultPageSize="6" :hideOnSinglePage="true" @change="changePageNum"/>-->
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
  export default {
    name: "SearchList",
    computed:{
      ...mapGetters([
        "searchString",
        "searchResult"
      ])
    },
    data(){
      return{
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
        isVirtual:false
      }
    },
    components:{
      SearchCard
    },
    methods:{
      ...mapActions([
        "getSearchAnswer"
      ]),
      async searchContent(){
        console.log(this.searchCondition)
        this.set_searchString(this.searchString)
        await this.getSearchAnswer()
      },
      changePageNum(pageNum,pageSize){
        //pageNum改变后的页码，pageSize都是6
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
      }
    },
    mounted() {
      console.log('现在是什么',this.searchString)
      this.searchCondition=this.searchString
      $('.search-input').focus(function(){
        $(this).parent().addClass('focus');
      }).blur(function(){
        $(this).parent().removeClass('focus');
      })
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
  height: 100vh;
  margin: 0;
  color: #5a6674;
  font-size: 13px;
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
}
img{
  width: 4%;
  height: 4%;
  margin-left: 6%;
  margin-top: 2%;
}
$color: #e24040;
.search-form {
  position: relative;
  margin-top: -2%;
  margin-left: 32%;
  width: 600px;
  height: 50px;
  border-radius: 40px;
  border: 1px;
  box-shadow: 6px 6px 8px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, -50%);
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
  width: 90%;
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
  opacity: 0.3;
}
</style>