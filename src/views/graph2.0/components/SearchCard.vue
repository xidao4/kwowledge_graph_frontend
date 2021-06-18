<template>
  <div class="myCard">
    <div class="headerBar">
      <h2 @click="seeMore">
        <span class="underline-hover" v-if="signal===0">{{this.searchResult.answerList[cardIndex].title}}</span>
        <span class="underline-hover" v-if="signal===1">{{this.searchResult.contentList[cardIndex].title}}</span>
      </h2>
      <a-tag class="myTag" v-if="signal===1" color="pink">{{this.searchResult.contentList[cardIndex].relation}}</a-tag>
    </div>
    <div class="demo" v-if="signal===0">{{this.searchResult.answerList[cardIndex].info}}</div>
    <div class="demo" v-if="signal===1">{{this.searchResult.contentList[cardIndex].info}}</div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import {message} from "ant-design-vue";
  import { getToken } from '@/utils/auth'
  export default {
    name: "SearchCard",
    props:{
      cardIndex: Number,
      signal: Number
    },
    data(){
      return{
        token:getToken()
      }
    },
    computed: {
      ...mapGetters([
        'searchResult',
        'searchResultDetail'
      ]),
    },
    methods:{
      ...mapMutations([
        'set_searchResultDetail',
      ]),
      ...mapActions([
        "getSearchAnswerDetail"
      ]),
      test(){
        console.log(this.movieName)
      },
      async seeMore(){
        if(this.token===undefined || this.token===''){
          message.error('没有权限访问~请先登录')
          this.$router.push({
            path: `/login`
          })
          return;
        }
        if(this.signal===0) {
          await this.getSearchAnswerDetail(this.searchResult.answerList[this.cardIndex].title)
        }
        else{
          await this.getSearchAnswerDetail(this.searchResult.contentList[this.cardIndex].title)
        }
        this.$router.push({
          path: `/searchDetail`
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  h2{
    color: #cd6657;
    font-size: 20px;
    font-weight: normal;
    /*margin-bottom: 2px;*/
  }
  .underline-hover{
    padding:5px;
    cursor: pointer;
    position:relative;
  &::before,&::after {
     content: "";
     background: #cd6657;
     position: absolute;
     height: 2px;
     bottom: 0;
     width: 0;
     transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
   }
  &::before {
     right:50%;
   }
  &::after {
     left:50%;
   }
  &:hover {
  &::before,&::after {
     width: 50%;
     transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
   }
  }
  }
.myCard{
  width: 46%;
  height: 100px;
  margin-left: 12%;
  margin-bottom: 2%;
}
.demo {
  text-indent: 2em;
  font-size: 15px;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
/*.demo::before{*/
/*  float: left;*/
/*  content:'';*/
/*  width: 20px;*/
/*  height: 40px;*/
/*}*/


.seeMore{
  font-size: 12px;
  color: blue;
  cursor: pointer;
  margin-left: 2em;
  padding-top: 3px;
  margin-bottom: 10px;
}
  .myTag{
    width: 60px;
    text-align: center;
    margin-left: 10px;
    margin-bottom: 9px;
  }
  .headerBar{
    display: flex;
    align-items: center;
  }
</style>