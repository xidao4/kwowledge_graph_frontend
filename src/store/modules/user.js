import router, {resetRouter} from '@/router';
import {
    getUserPicsAPI,
    loginAPI,
    testTokenAPI,
    getHistoryAPI,
} from "../../api/user";
import {message} from "ant-design-vue";
import {removeToken, setToken} from '@/utils/auth'

const state = {
    token: '',
    userId: '',//方便测试by ljy
    userInfo: {
        test: 'hhh'
    },
    picsInfo:{},//a
    userHistory:[],
};

const user = {
    state,
    mutations:{
        set_token(state, data) {
            state.token = data;
        },
        logout(state){
            state.token = '';
            state.userId = '';
            state.userInfo = {};
            state.picsInfo=[];//a
            resetRouter();
            removeToken();
            router.push('/login')
        },
        set_userId(state, data) {
            state.userId = data;
        },
        set_userInfo(state, data) {
            // state.userInfo = {...data};
            state.userInfo=data;
        },
        set_picsInfo(state,data){//a
            state.picsInfo=data;
        },
        set_userHistory(state,data){
            state.userHistory=data;
        },
    },
    actions:{
        login: async({commit, state}, data)=>{
            const res = await loginAPI(data);
            let resData = res.data;
            if(res.code >= 0) {
                commit('set_userId', resData.userId);
                commit('set_userInfo', resData);
                console.log('resData', resData)
                setToken(resData.token);
                console.log('登录成功啦')
                console.log('为什么总是报没有权限',resData.userType)
                // 根据用户身份类型来判断会跳转到哪个页面
                if(resData.userType!=='professional') {
                    console.log('hi')
                    console.log('state???????????', state.userInfo)
                    router.push('/search');
                }
                else{
                    router.push('/home');
                }
            } else {
                message.error(resData)
            }
        },
        testToken: async() => {
            const res = await testTokenAPI();
            message.success(res.data);
        },
        getUserPics: async({commit,state},data)=>{
            const res=await getUserPicsAPI(data);
            console.log('getUserPicsAPI',res);
            commit('set_picsInfo',res.data);
            console.log('state.picsInfo',state.picsInfo);
        },
        getHistory:async({commit},data)=>{
            const res=await getHistoryAPI(data);
            if(res===null){
                console.log('getHistoryAPI=null');
                message.error(res);
            }else if(res.code>=0){
                commit('set_userHistory',res);
            }else{
                console.log('getHistoryAPI.code<0');
                message.error(res);
            }
        }
    }
};

export default user

