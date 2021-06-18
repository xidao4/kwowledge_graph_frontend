import {message} from "ant-design-vue";
import {getChatAnswerAPI} from "../../api/chat";

const chat={
  state:{
    roleSentence:[
      {name:'馆长',firstSentence: '有什么想问的吗？再次点击右下角图标即可关闭对话框~',avatarUrl:'https://ydl8023.oss-cn-beijing.aliyuncs.com/20210617132419.png'},
      {name:'贾宝玉',firstSentence:'虽然未曾见过妹妹，但我看着面善，心里就算是旧相识，只作远别重逢。',avatarUrl: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/548BFDA7C3A2EF17350923708867EDB6.jpg'},
      {name:'林黛玉',firstSentence:'尔今死去侬收葬，未卜侬身何日丧？',avatarUrl: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/E63C25F83E48887FBE10008FF08AC5E4.jpg'},
      {name:'薛宝钗',firstSentence: '你有什么疑难，只管问我，我能解得，自然替你解一日。',avatarUrl: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/FF35ECCC84F47A9E7940D1842C5B4A32.jpg'},
      {name:'王熙凤',firstSentence: '哈哈哈哈哈......我来迟了，不曾迎接远客！',avatarUrl: 'https://ydl8023.oss-cn-beijing.aliyuncs.com/13CB80908BFAF1E856E018C686BEBF3B.jpg'}
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