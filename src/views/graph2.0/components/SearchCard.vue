<template>
  <div class="myCard">
    <div class="headerBar">
      <h2 @click="seeMore"><span class="underline-hover">{{movieName}}</span></h2>
      <a-tag class="myTag" v-if="tag!==undefined" color="pink">{{tag}}</a-tag>
    </div>
    <div class="demo">{{movieDescription}}</div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import {message} from "ant-design-vue";
  import { getToken } from '@/utils/auth'
  export default {
    name: "SearchCard",
    props:{
      movieName: String,
      movieDescription:String,
      tag:String
    },
    data(){
      return{
        token:getToken()
      }
    },
    computed: {
      ...mapGetters([
        'searchResult'
      ]),
    },
    methods:{
      ...mapMutations([
        'set_searchResultDetail',
      ]),
      ...mapActions([
        "getSearchAnswerDetail"
      ]),
      async seeMore(){
        if(this.token===undefined || this.token===''){
          message.error('没有权限访问~请先登录')
          this.$router.push({
            path: `/login`
          })
          return;
        }
        console.log('拿着props里面的movieName去迭代二里面的图谱中查找',this.movieName)
        // await this.getSearchAnswerDetail(this.movieName)
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
  max-height: 60px;
  line-height: 20px;
  overflow: hidden;
  text-indent: 2em;
  color: black;
  font-size: 15px;
  opacity: 1;
}
/*.demo::before{*/
/*  float: left;*/
/*  content:'';*/
/*  width: 20px;*/
/*  height: 40px;*/
/*}*/

.demo .text {
  float: right;
  width: 100%;
  margin-left: -20px;
  word-break: break-all;
  margin-top: 10px;
  margin-bottom: 10px;
}
.demo::after{
  float:right;
  content:'...';
  width: 20px;
  height: 20px;
  position: relative;
  left:100%;
  transform: translate(-100%,-100%);
}
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