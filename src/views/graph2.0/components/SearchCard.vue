<template>
  <div class="myCard">
    <h2><span class="underline-hover" @click="toDetail">{{movieName}}</span></h2>
    <div class="demo">{{movieDescription}}</div>
  </div>
</template>

<script>
  export default {
    name: "SearchCard",
    props:{
      movieName: String,
      movieDescription:String
    },
    methods:{
      toDetail(){
        this.$router.push({
          path:`/searchDetail`
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  h2{
    color: #1a0dab;
    font-size: 20px;
    font-weight: normal;
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
  margin-bottom: 1.3%;
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
</style>