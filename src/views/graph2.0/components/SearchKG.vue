<template>
  <body>
    <div class="imgList" v-if="!(this.token===undefined || this.token==='')">
      <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/atm.png" class="myBot1" @click="showBox"/>
      <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/bussiness-man.png" class="myBot2" @click="showBox"/>
      <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/double-arro- right.png" class="myBot3" @click="logoutBox"/>
    </div>
    <form class="search-form" onkeypress="return event.keyCode !== 13;" :class="{'bgContent':isVirtual}">
      <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/搜索 (1).png" id="searchIcon"/>
      <input v-model="searchString" placeholder="搜你想搜" class="search-input" @keydown.enter="searchContentList">
<!--      <div :class="{'itemList':true,'show':isShow}">-->
<!--        <li @click="searchContentList">电影图谱1</li>-->
<!--        <li>电影图谱2</li>-->
<!--      </div>-->
      <a-upload
        name="mFile"
        :multiple="false"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
        :customRequest="uploadImage"
        class="upload"
      >
        <a-button> <a-icon type="upload" />上传图片</a-button>
      </a-upload>
    </form>
    <JwChat-index
      :taleList="list"
      @enter="bindEnter"
      v-model="inputMsg"
      :showRightBox="false"
      :config="config"
      :toolConfig="tool"
      :class="{'chatBox':ifNotShowBox}"
      scrollType="scroll"
      id="chatpage"
    />
    <a-modal
      title="角色选择"
      :visible="roleVisible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="roleList">
        <div v-for="(item,i) in roleSentence" @click="change(i)">
          <img :src="item.avatarUrl" class="avatar">
          <div style="width: 120px;text-align: center;">
            {{item.name}}
          </div>
        </div>
      </div>
      <br/>
      <div class="selectRole">
        <h3>您选择的角色是：</h3>
        {{roleSentence[tempRoleId].name}}
      </div>
    </a-modal>
  </body>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import {message} from "ant-design-vue";
  import $ from 'jquery'
  import { getToken } from '@/utils/auth'
  import axios from "axios";
  export default {
    name: "SearchKG",
    data(){
      return{
        token:getToken(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "authorization": 'authorization-text',
          "token": getToken()
        },
        searchString:'',
        inputMsg:'',
        // list:[
        //   {
        //     "text": { "text": "智能机器人为你回答" },
        //     "mine": false,
        //     "name": "智能机器人",
        //     "img": "https://ydl8023.oss-cn-beijing.aliyuncs.com/avatar19.png"
        //   },
        // ],
        list:[],
        config:{
          img: 'http://i3.sinaimg.cn/gm/j/n/2008-12-30/U1850P115T9D289891F364DT20081230185442_c.jpg',
          name: 'SuperChat',
          dept: '想你所想',
        },
        tool:{
          show:['file'],
          callback:this.toolEvent
        },
        ifNotShowBox:true,
        isShow:true,
        isVirtual:false,
        roleVisible: false,
        tempRoleId: 0,
        resList: []
      }
    },
    components:{
    },
    watch:{
      searchString(){
        this.isShow=true
      }
    },
    computed: {
      ...mapGetters([
        "searchString",
        "roleId",
        "roleSentence",
        "chatAnswer",
      ]),
    },
    methods:{
      ...mapMutations([
        'set_searchString',
        'set_roleId',
        'set_searchResult',
        'logout'
      ]),
      ...mapActions([
        "getChatAnswer",
        "getSearchAnswer"
      ]),
      searchContent(){
        console.log(this.searchString)
        this.set_searchString(this.searchString)
        this.isShow=false
        // this.$router.push({
        //   path:`/searchList`
        // })
      },
      async searchContentList(){
        this.set_searchString(this.searchString)
        await this.getSearchAnswer()
        this.$router.push({
          path: `/searchList`
        })
      },
      async bindEnter(){
        const msg=this.inputMsg
        if(msg===''){
          message.error('聊天内容不能为空')
          return ;
        }
        const msgObj = {
          "text": { "text": msg },
          "mine": true,
          "name": "我",
          "img": "https://ydl8023.oss-cn-beijing.aliyuncs.com/柴犬.jpeg"
        }
        this.list.push(msgObj)
        await this.getChatAnswer(msg)
        let that=this
        const msgObj2 = {
          "text": { "text": that.chatAnswer },
          "mine": false,
          "name": that.roleSentence[that.roleId].name,
          "img": that.roleSentence[that.roleId].avatarUrl
        }
        this.list.push(msgObj2)
      },
      showBox(){
        var that=this
        this.ifNotShowBox=!this.ifNotShowBox
        this.isVirtual=!this.isVirtual
        this.list.push({
          "text": { "text": that.roleSentence[that.roleId].firstSentence},
          "mine": false,
          "name": that.roleSentence[that.roleId].name,
          "img": that.roleSentence[that.roleId].avatarUrl
          })
        if(this.roleId===0){
          this.list.push({
            "text": { "text": "点击左上角红楼梦还能切换不同的对话角色哟"},
            "mine": false,
            "name": that.roleSentence[that.roleId].name,
            "img": that.roleSentence[that.roleId].avatarUrl
          })
        }
        let l=document.getElementsByClassName('el-badge')[0]
        console.log('看看头像',l)
        l.addEventListener('click',that.changeRole,false);
        if(this.isVirtual===false){
          this.list=[]
          this.set_roleId(0)
        }
      },
      changeRole(){
        console.log('切换角色')
        this.roleVisible=true
      },
      async toolEvent(type, plyload) {
        console.log('tools', type, plyload)
        console.log('调用上传图片')
        let formData = new FormData()
        formData.append('mfile', plyload[0])
        console.log('myFormData',formData.get('mfile'))
        let that=this
        let config = {
          headers: that.headers
        }
        axios.post(`http://118.182.96.49:8001/api/chat/uploadScene`,formData,config)
          .then(response => {
            // handle success
            console.log('上传图片后的response',response)
            console.log('success!!',response.contentList)
            //用户这边先展示上传的图片
            that.list.push({
              "text": { "text": "<img data-src='"+response.data.data.url+"'/>" },
              "mine": true,
              "name": "我",
              "img": "https://ydl8023.oss-cn-beijing.aliyuncs.com/柴犬.jpeg"
            },)
            for(let i=0;i<response.data.data.contentList.length;i++){
              that.resList.push({
                id: `system`+{i},
                text: response.data.data.contentList[i]
              })
            }
            that.list.push({
              "mine": false,
              "name": that.roleSentence[that.roleId].name,
              "img": that.roleSentence[that.roleId].avatarUrl,
              "text":{
                system:{
                  title:'看图说话',
                  subtitle:'你可是想问:',
                  content:that.resList
                }
              }
            })
          }).catch(error => {
          this.$message.error(`图片上传失败.`);
        }).then(() => {
          let l=document.getElementsByClassName('el-link');
          for (let i=0;i<l.length;i++){
            console.log('啦啦啦啦啦啦',l[i].children[0].childNodes[0].data)
            l[i].addEventListener('click',clickx_,false);
            async function clickx_(){
              that.set_searchString(l[i].children[0].childNodes[0].data)
              await this.getSearchAnswer()
              that.$router.push({
                path: `/searchList`
              })
            }
          }
        });
      },
      handleOk(e) {
        this.set_roleId(this.tempRoleId)
        this.roleVisible = false;
        this.list=[]
        this.list.push({
          "text": { "text": this.roleSentence[this.roleId].firstSentence},
          "mine": false,
          "name": this.roleSentence[this.roleId].name,
          "img": this.roleSentence[this.roleId].avatarUrl
        })
      },
      handleCancel(e) {
        this.roleVisible = false;
        this.tempRoleId=this.roleId
      },
      change(i){
        console.log(i)
        this.tempRoleId=i
      },
      handleChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          this.$message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
      logoutBox(){
        this.logout()
      },
      uploadImage(file) {
        console.log('调用上传图片')
        let formData = new FormData()
        console.log(file.file)
        formData.append('mfile', file.file)
        console.log('myFormData',formData.get('mfile'))
        let that=this
        let config = {
          headers: that.headers
        }
        axios.post(`http://118.182.96.49:8001/api/search/uploadScene`,formData,config)
          .then(response => {
            // handle success
            console.log('success!!',response)
            this.set_searchResult(response.contentList)
          }).catch(error => {
          this.$message.error(`图片上传失败.`);
        }).then(() => {
          this.$router.push({
            path: `/searchList`
          })
        });
      },
    },
    mounted() {
      $('.search-input').focus(function(){
        $(this).parent().addClass('focus');
      }).blur(function(){
        $(this).parent().removeClass('focus');
      })
      console.log('token',this.token)
      document.getElementsByClassName('header')[0].setAttribute('style', 'background-color: #F6CEE3 !important;')
      document.getElementsByClassName('el-button')[0].setAttribute('style', 'border-color: #F6CEE3 !important;background-color: #F6CEE3 !important')
      // document.getElementsByClassName('cover')[0].setAttribute('style', 'cursor: auto;')

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
    /*height: 100vh;*/
    /*margin: 0;*/
    /*background: #DEDEDE;*/
    /*color: #5a6674;*/
    /*font-size: 13px;*/
    /*font-family: 'Roboto', sans-serif;*/
    /*overflow: hidden;*/
    background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fspider.nosdn.127.net%2F056b09f38fcd0ac720b1079cd991b5de.jpeg&refer=http%3A%2F%2Fspider.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626164318&t=15c176c5ef8893498c63826ae749178a");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%
  }


  /*--------------------
  App
  --------------------*/
  .search-form {
    position: relative;
    top: 38%;
    left: 30%;
    width: 480px;
    height: 50px;
    border-radius: 40px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    transform: translate(-50%, -50%);
    background: #fff;

  &.focus {
     box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
   }
  }

  .search-input {
    position: absolute;
    top: 10px;
    left: 45px;
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
  .myBot1{
    position: fixed;
    top: 80%;
    left: 73%;
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #ffffff;
    margin:40px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }
  .myBot1:hover{
    box-shadow: 0 3px 3px rgba(51, 51, 51, .25);
    -webkit-transform: translateY(-2px);
    -moz-transform: translateY(-2px);
    transform: translateY(-2px)
  }
  .myBot2{
    position: fixed;
    top: 80%;
    left: 80%;
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #ffffff;
    margin:40px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
  }
  .myBot2:hover{
    box-shadow: 0 3px 3px rgba(51, 51, 51, .25);
    -webkit-transform: translateY(-2px);
    -moz-transform: translateY(-2px);
    transform: translateY(-2px)
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
  .bgContent{
    opacity: 0.3;
    pointer-events: none;
  }
  .roleList{
    display: flex;
    /*justify-content: center;*/
    flex-wrap: wrap;
  }
  .avatar{
    width: 100px;
    height:100px;
    margin: 10px;
    cursor: pointer;
  }
  .selectRole{
    margin-left: 10px;
  }
  .upload{
    position: fixed;
    float: right;
    left: 72%;
    top: 19%;
    margin-right: 30px;
    /*<!--transform: translate(0, -50%);-->*/
  }
</style>