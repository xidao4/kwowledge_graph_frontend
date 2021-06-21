<template>
  <div class="homePage">
    <div class="come">
      <div class="title">《红楼体验馆》</div>
      <button type="submit" id="login-button" @click="toHome">点击进入</button>
    </div>
    <div class="introduction">
      <h1>简介</h1>
      <h2>《红楼梦》，中国古代章回体长篇小说，中国古典四大名著之一。小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，以贾宝玉与林黛玉、薛宝钗的爱情婚姻悲剧为主线，描绘了一批举止见识出于须眉之上的闺阁佳人的人生百态，展现了真正的人性美和悲剧美。
      </h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ExperienceHome",
    methods:{
      toHome(){
        this.$router.push({
          path:`/search`
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.homePage{
  background: url("https://ydl8023.oss-cn-beijing.aliyuncs.com/20210617004925.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%
}
.introduction{
  /*max-width: 70%;*/
  width: 40%;
  margin-bottom:10px;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  position: absolute;
  top: 48%;
  left: 14%;
}
h1{
  margin-left: 43%;
  margin-bottom: 3px;
  font-family: cursive;
}
h2{
  font-family: cursive;
  font-weight: lighter;
  margin-bottom: 10px;
}
.come{
  left: 40%;
  top: 8%;
  position: absolute;
}
.title{
  font-size: 36px;
  font-weight: bold;
  font-family: STFangsong;
}
button{
  appearance: none;
  outline: 0;
  background-color: red;
  border: 0;
  padding: 10px 15px;
  color: #ffffff;
  border-radius: 3px;
  width: 180px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;

&:hover{
   background-color: rgb(245, 247, 249);
   color: red;
 }
}
#login-button{
  margin-left: 13%;
  margin-top: 20%;
  font-family: cursive;
}
</style>