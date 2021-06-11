<template>
  <body>
    <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/message.png" class="myBot" @click="showBox"/>
    <form class="search-form" onkeypress="return event.keyCode !== 13;">
      <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/搜索.png" id="searchIcon"/>
      <input v-model="searchString" placeholder="搜你想搜" class="search-input" @keydown.enter="searchContent">
      <div :class="{'itemList':true,'show':isShow}">
        <li @click="searchContentList">电影图谱1</li>
        <li>电影图谱2</li>
      </div>
    </form>
    <JwChat-index
      :taleList="list"
      @enter="bindEnter"
      @clickTalk="changeRole"
      v-model="inputMsg"
      :showRightBox="false"
      :config="config"
      :toolConfig="tool"
      :class="{'chatBox':ifNotShowBox}"
      scrollType="scroll"
      id="chatpage"
    />
  </body>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import $ from 'jquery'
  export default {
    name: "SearchKG",
    data(){
      return{
        searchString:'',
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
          show:['img'],
          callback:this.toolEvent
        },
        ifNotShowBox:true,
        isShow:true
      }
    },
    watch:{
      searchString(){
        this.isShow=true
      }
    },
    computed: {
      ...mapGetters([
        "searchString"
      ]),
    },
    methods:{
      ...mapMutations([
        'set_searchString'
      ]),
      searchContent(){
        console.log(this.searchString)
        this.set_searchString(this.searchString)
        this.isShow=false
        // this.$router.push({
        //   path:`/searchList`
        // })
      },
      searchContentList(){
        this.set_searchString(this.searchString)
        this.$router.push({
          path:`/searchList`
        })
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
      },
      changeRole(){
        console.log('切换角色')
      },
      toolEvent(type, plyload) {
        console.log('tools', type, plyload)
      }
    },
    mounted() {
      $('.search-input').focus(function(){
        $(this).parent().addClass('focus');
      }).blur(function(){
        $(this).parent().removeClass('focus');
      })
      document.getElementsByClassName('header')[0].setAttribute('style', 'background-color: #123456 !important')
      document.getElementsByClassName('el-button')[0].setAttribute('style', 'border-color: #123456 !important;background-color: #123456 !important')
    }
  }
</script>

<style scoped lang="scss">
  /*--------------------
  Body
  --------------------*/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  $color: #e24040;

  body {
    height: 100vh;
    margin: 0;
    background: #DEDEDE;
    color: #5a6674;
    font-size: 13px;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }


  /*--------------------
  App
  --------------------*/
  .search-form {
    position: relative;
    top: 46%;
    left: 50%;
    width: 480px;
    height: 50px;
    border-radius: 40px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translate(-50%, -50%);
    background: #fff;
    transition: all 0.3s ease;

  &.focus {
     box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
   }
  }

  .search-input {
    position: absolute;
    top: 10px;
    left: 38px;
    font-size: 18px;
    background: none;
    color: #5a6674;
    width: 420px;
    height: 30px;
    border: none;
    appearance: none;
    outline: none;

  &::-webkit-search-cancel-button {
     appearance: none;
   }
  }

  img{
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
  }
  .myBot{
    position: fixed;
    top: 80%;
    left: 80%;
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 10%;
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
  .itemList{
    position: absolute;
    top: 60px;
    left: 38px;
    width: 420px;
  }
  li{
    margin-bottom: 10px;
    cursor: pointer;
    height: 38px;
    font-size: 16px;
    line-height: 38px;
    border-radius: 3%;
  }
  li:hover{
    box-shadow: 0 3px 3px rgba(51, 51, 51, .25);
  }
  .show{
    display: none;
  }

  .ChatPage .header[data-v-561fedf6] {
    background-color: #ffffff !important;
    display: flex;
    margin: 0 auto;
    padding-left: 12px;
    align-items: center;
    height: 60px;
    position: relative;
    color: #fff;
  }
</style>