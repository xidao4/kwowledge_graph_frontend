import { axios } from '@/utils/request'

const api = {
  searchPre: '/api/search'
}

// export function getSearchResultFirstAPI(data) {
//   return axios({
//     url: `${api.searchPre}/getSearchResultFirst`,
//     method: 'POST',
//     data: data,
//   })
// }
//
// export function getSearchResultSecondAPI(data) {
//   return axios({
//     url: `${api.searchPre}/getSearchResultSecond`,
//     method: 'POST',
//     data: data,
//   })
// }
export function getSearchAnswerAPI(data) {
  return axios({
    url: `${api.searchPre}/getAnswer`,
    method: 'POST',
    data: data,
  })
}

export function getSearchAnswerDetailAPI(data){
  return axios({
    url:`${api.searchPre}/detail`,
    method:'POST',
    data:data
  })
}