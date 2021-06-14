import { axios } from '@/utils/request'

const api = {
  chatPre: '/api/chat'
}

export function getChatAnswerAPI(data) {
  //data是roleId和question
  console.log('lalala')
  return axios({
    url: `${api.chatPre}/getAnswer`,
    method: 'POST',
    data: data,
  })
}
