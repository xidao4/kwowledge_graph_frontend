import {message} from "ant-design-vue";
import {getChatAnswerAPI} from "../../api/chat";

const chat={
  state:{
    roleSentence:[
      {name:'怡红院管家',firstSentence: '有什么想问的吗？再次点击右下角图标即可关闭对话框~',avatarUrl:'https://ydl8023.oss-cn-beijing.aliyuncs.com/20210614112137.png'},
      {name:'贾宝玉',firstSentence:'虽然未曾见过妹妹，但我看着面善，心里就算是旧相识，只作远别重逢。',avatarUrl: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/20210614112223.png'},
      {name:'林黛玉',firstSentence:'尔今死去侬收葬，未卜侬身何日丧？',avatarUrl: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/20210614112437.png'},
      {name:'薛宝钗',firstSentence: '你有什么疑难，只管问我，我能解得，自然替你解一日。',avatarUrl: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/20210614112523.png'},
      {name:'王熙凤',firstSentence: '哈哈哈哈哈......我来迟了，不曾迎接远客！',avatarUrl: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/20210614112552.png'}
    ],
    roleId:0,
    chatAnswer: ''
  },
  mutations:{
    set_roleId(state, data) {
      state.roleId = data;
    },
    set_chatAnswer(state, data) {
      state.chatAnswer = data;
    },
  },
  actions:{
    getChatAnswer:async ({commit,state},data)=>{
      let param={
        roleId: state.roleId,
        question: data
      }
      const res=await getChatAnswerAPI(data);
      console.log('看看返回的内容',res)
      commit('set_chatAnswer',res.answer)
    }
  }
}

export default chat