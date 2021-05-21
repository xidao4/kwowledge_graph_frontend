<template>
  <body>
    <div>
      <div>
        <img src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/index-home-pie.png?_v_=20200710_1">
        <form class="search-form">
          <input v-model="searchString" placeholder="搜你想搜" class="search-input" @keydown.enter="searchContent">
        </form>
      </div>
      <a-divider />
      <div class="contentPart">
        <search-card v-for="item in this.searchCardContent" :movie-description="item.description" :movie-name="item.name"></search-card>
      </div>
    </div>
  </body>
</template>

<script>
  import $ from 'jquery'
  import SearchCard from "./SearchCard";
  export default {
    name: "SearchList",
    data(){
      return{
        searchString:"",
        searchCardContent:[
          {name:'唐人街探案3',description:"继曼谷、纽约之后，东京再出大案。唐人街神探唐仁（王宝强 饰）、秦风（刘昊然 饰）" +
              "受侦探野田昊（妻夫木聪 饰）的邀请前往破案。“CRIMASTER世界侦探排行榜”中的侦探们闻讯后也齐聚东京，加入挑战，" +
              "而排名第一Q的现身，让这个大案更加扑朔迷离，一场亚洲最强神探之间的较量即将爆笑展开……"},
          {name:'温暖的抱抱',description:"对整洁和计划有着超乎常人执念的鲍抱（常远 饰），本以为自己是一个友情爱情的绝缘体，但在遇到个性率真宋温暖（李沁 饰）、妙手“神经”贾医生（沈腾 饰）和假仁假义王为仁（乔杉 饰）之后，上演了一段阴差阳错的喜剧故事……\n" +
              "　　影片根据韩国电影《计划男》改编。"},
          {name:'李茶的姑妈',description:"貌不惊人的李茶（宋平 饰）希望和土豪之女结为夫妇，他从未谋过面的姑妈（卢靖姗 饰）成为他婚姻的最大支柱。土豪的公司经营陷入困境，因此急于攀附李茶那位有钱的姑妈。土豪大女婿梁杰瑞（艾伦 饰）也是个见钱眼开的家伙，得知自己老爹破产时，他甚至建议老爹去向李茶的姑妈求婚。"},
          {name:'分手大师',description:"梅远贵（邓超 饰）是一个情感经历极为丰富的男人，虽然有过这样那样的失败恋情，却也帮他铺就了一条通往荣华复归的康庄大道。现如今的梅远贵生活在首都北京，与其精英团队操办起帮人分手的奇葩业务，无论你有着怎样的感情和生活，只要票子给足，他总会高效率地完成任务。"},
          {name:'咒怨 呪怨',description:"东京近郊一间屋被传是阴森鬼屋，说但凡拜访者进入，都会离奇毙命或神秘失踪。传说当年该屋的主人曾因突至的狂性大发斩死妻子"},
          {name:'死寂 Dead Silence',description:"童谣本应该充满欢声笑语，但世界上偏偏有这么一些童谣，让人听了毛骨悚然。小镇拉文斯•法尔就流传着这样一个恐怖的童谣：小心来自玛丽•肖的凝视；她没有孩子，只有玩偶；如果你看到她，不要尖叫；否则她会扯开你的嘴巴撕掉你的舌头。这个小镇一直就在笼罩在这个童谣的诅咒之下，只要有玩偶出现的地方，就有人遇害，死状一样，都是舌头被割下。"},
          {name:'孤儿怨 Orphan',description:"意外流产让满心期待宝宝降生的约翰（Peter Sarsgaard 饰）和凯特（Vera Farmiga 维拉•法米加 饰）深受打击，凯特精神几近崩溃，而他们的婚姻也岌岌可危。为了挽救濒临破败婚姻，这对夫妇前往孤儿院希望收养一个孩子。在这里，他们见到了有些特立独行的小女孩伊斯特（Isabelle Fuhrman 伊莎贝尔•福尔曼 饰）。小女孩所散发出的独特气质吸引了约翰夫妇，最终伊斯特成为他们家庭中的一员。"},
        ]
      }
    },
    components:{
      SearchCard
    },
    methods:{
      searchContent(){
        console.log(this.searchString)
        this.$router.push({
          path:`/searchList`
        })
      }
    },
    mounted() {
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
</style>