<template>
  <div class="myCard">
    <h2 @click="seeMore"><span class="underline-hover">{{movieName}}</span></h2>
    <div class="demo">{{movieDescription}}</div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import {message} from "ant-design-vue";

  export default {
    name: "SearchCard",
    props:{
      movieName: String,
      movieDescription:String
    },
    computed: {
      ...mapGetters([
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
     background: blue;
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
</style>