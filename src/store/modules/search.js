import {
  getSearchAnswerAPI,
  getSearchAnswerDetailAPI
  // getSearchResultFirstAPI,
  // getSearchResultSecondAPI
} from "../../api/search";
import {message} from "ant-design-vue";
import {getUserPicsAPI} from "../../api/user";

const search={
  state:{
    searchString: '贾宝玉喜欢谁',
    // searchResult1:[
    //   {title:'唐人街探案3',info:"继曼谷、纽约之后，东京再出大案。唐人街神探唐仁（王宝强 饰）、秦风（刘昊然 饰）" +
    //       "受侦探野田昊（妻夫木聪 饰）的邀请前往破案。“CRIMASTER世界侦探排行榜”中的侦探们闻讯后也齐聚东京，加入挑战，" +
    //       "而排名第一Q的现身，让这个大案更加扑朔迷离，一场亚洲最强神探之间的较量即将爆笑展开……"},
    //   {title:'温暖的抱抱',info:"对整洁和计划有着超乎常人执念的鲍抱（常远 饰），本以为自己是一个友情爱情的绝缘体，但在遇到个性率真宋温暖（李沁 饰）、妙手“神经”贾医生（沈腾 饰）和假仁假义王为仁（乔杉 饰）之后，上演了一段阴差阳错的喜剧故事……\n" +
    //       "　　影片根据韩国电影《计划男》改编。"},
    //   {title:'李茶的姑妈',info:"貌不惊人的李茶（宋平 饰）希望和土豪之女结为夫妇，他从未谋过面的姑妈（卢靖姗 饰）成为他婚姻的最大支柱。土豪的公司经营陷入困境，因此急于攀附李茶那位有钱的姑妈。土豪大女婿梁杰瑞（艾伦 饰）也是个见钱眼开的家伙，得知自己老爹破产时，他甚至建议老爹去向李茶的姑妈求婚。"},
    //   {title:'分手大师',info:"梅远贵（邓超 饰）是一个情感经历极为丰富的男人，虽然有过这样那样的失败恋情，却也帮他铺就了一条通往荣华复归的康庄大道。现如今的梅远贵生活在首都北京，与其精英团队操办起帮人分手的奇葩业务，无论你有着怎样的感情和生活，只要票子给足，他总会高效率地完成任务。"},
    //   {title:'咒怨 呪怨',info:"东京近郊一间屋被传是阴森鬼屋，说但凡拜访者进入，都会离奇毙命或神秘失踪。传说当年该屋的主人曾因突至的狂性大发斩死妻子"},
    //   {title:'死寂 Dead Silence',info:"童谣本应该充满欢声笑语，但世界上偏偏有这么一些童谣，让人听了毛骨悚然。小镇拉文斯•法尔就流传着这样一个恐怖的童谣：小心来自玛丽•肖的凝视；她没有孩子，只有玩偶；如果你看到她，不要尖叫；否则她会扯开你的嘴巴撕掉你的舌头。这个小镇一直就在笼罩在这个童谣的诅咒之下，只要有玩偶出现的地方，就有人遇害，死状一样，都是舌头被割下。"},
    //   {title:'孤儿怨 Orphan',info:"意外流产让满心期待宝宝降生的约翰（Peter Sarsgaard 饰）和凯特（Vera Farmiga 维拉•法米加 饰）深受打击，凯特精神几近崩溃，而他们的婚姻也岌岌可危。为了挽救濒临破败婚姻，这对夫妇前往孤儿院希望收养一个孩子。在这里，他们见到了有些特立独行的小女孩伊斯特（Isabelle Fuhrman 伊莎贝尔•福尔曼 饰）。小女孩所散发出的独特气质吸引了约翰夫妇，最终伊斯特成为他们家庭中的一员。"},
    // ],
    searchResult:{
      code: 0,
      answer: '林黛玉',
      length: 1,
      answerList:[
      ],
      contentList:[
      ],
      showGraphData:{
        nodes: [
          {
            "id": "0",
            "label": "hit_node_1",
            "type": "type_1",
            "class": "c0"
          },
          {
            "id": "1",
            "label": "hit_node_2",
            "type": "type_1",
            "class": "c1"
          },
          {
            "id": "2",
            "label": "node_1",
            "type": "type_2",
            "class": "c1"
          },
          {
            "id": "3",
            "label": "node_2",
            "type": "type_3",
            "class": "c0"
          }
        ],
        edges: [
          {
            "id": "5",
            "label": "hit_edge_1",
            "source": "1",
            "type": "test_type_1",
            "class": "c0",
            "target": "2"
          },
          {
            "id": "6",
            "label": "edge_1",
            "source": "1",
            "type": "test_type_2",
            "class": "c0",
            "target": "2"
          },
          {
            "id": "7",
            "label": "hit_edge_2",
            "source": "3",
            "type": "test_type_1",
            "class": "c0",
            "target": "0"
          },
          {
            "id": "8",
            "label": "edge_1",
            "source": "1",
            "type": "test_type_2",
            "class": "c0",
            "target": "3"
          }
        ]
      }
    },
    searchResultDetail:{
      categories: `['person']`,
      info: '林黛玉是中国古典名著《红楼梦》的女主角，史太君的外孙女，贾宝玉的姑表妹。字颦颦（宝玉赠），海棠诗社别号潇湘妃子，花签芙蓉，情榜评为“情情”。在大观园中住在潇湘馆，馆前竹林密布，象征其本性正直清高。',
      ending: '在通行程高本后40回中，林黛玉因贾府安排宝玉和宝钗成婚，气郁而死。脂砚斋批注中明确提到，林黛玉是泪尽而亡。新红学开创者俞平伯认为，林黛玉先病死然后宝钗嫁给宝玉。张爱玲认为，奉元妃命，宝玉宝钗结婚，而黛玉抑郁而死（《红楼梦魇》）。',
      reason: '啊哈哈哈',
      img: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/20210614112437.png',
      title: '林黛玉',
      nodes: [
        {
          "id": "0",
          "label": "hit_node_1",
          "type": "type_1",
          "class": "c0"
        },
        {
          "id": "1",
          "label": "hit_node_2",
          "type": "type_1",
          "class": "c1"
        },
        {
          "id": "2",
          "label": "node_1",
          "type": "type_2",
          "class": "c1"
        },
        {
          "id": "3",
          "label": "node_2",
          "type": "type_3",
          "class": "c0"
        }
      ],
      edges: [
        {
          "id": "5",
          "label": "hit_edge_1",
          "source": "1",
          "type": "test_type_1",
          "class": "c0",
          "target": "2"
        },
        {
          "id": "6",
          "label": "edge_1",
          "source": "1",
          "type": "test_type_2",
          "class": "c0",
          "target": "2"
        },
        {
          "id": "7",
          "label": "hit_edge_2",
          "source": "3",
          "type": "test_type_1",
          "class": "c0",
          "target": "0"
        },
        {
          "id": "8",
          "label": "edge_1",
          "source": "1",
          "type": "test_type_2",
          "class": "c0",
          "target": "3"
        }
      ]
    }
    // allPageNum:'',
    // currentPageNum: ''
  },
  mutations:{
    set_searchResult(state, data) {
      state.searchResult = data;
    },
    set_searchResultDetail(state, data) {
      state.searchResultDetail = data;
    },
    set_searchString(state, data) {
      console.log('vuex里面也修改了string')
      state.searchString = data;
    },
    // set_allPageNum(state, data) {
    //   state.allPageNum = data;
    // },
    // set_currentPageNum(state, data) {
    //   state.currentPageNum = data;
    // },
  },
  actions:{
    // getSearchResultFirst: async({commit,state})=>{
    //   //data是搜索条件+每页的条目数
    //   //res是总的页数
    //   let data={
    //     searchString: state.searchString,
    //     itemPerPage: 6
    //   }
    //   const res=await getSearchResultFirstAPI(data);
    //   commit('set_allPageNum',res.allPageNum)
    // },
    // getSearchResultSecond: async({commit,state},data)=>{
    //   //data是搜索条件+第几页
    //   //res是该页的所有条目数据
    //   let param={
    //     searchString: state.searchString,
    //     pageNum: data
    //   }
    //   const res=await getSearchResultSecondAPI(param);
    //   commit('set_searchResult',res.searchResult);
    // },
    getSearchAnswer: async({commit,state})=>{
      console.log('search!')
      let data={
        question: state.searchString,
      }
      const res=await getSearchAnswerAPI(data);
      console.log(res)
      commit('set_searchResult',res.data)
    },
    getSearchAnswerDetail: async({commit,state},data)=>{
      console.log('search!')
      let param={
        label: data
      }
      const res=await getSearchAnswerDetailAPI(param);
      console.log('lala',res)
      commit('set_searchResultDetail',res.data)
    },
  }
}

export default search