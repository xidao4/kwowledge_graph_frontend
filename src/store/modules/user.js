import router, {resetRouter} from '@/router';
import {loginAPI, testTokenAPI} from "../../api/user";
import {message} from "ant-design-vue";
import {removeToken, setToken} from '@/utils/auth'

const state = {
    token: '',
    userId: '',
    userInfo: {
        username: 'test'
    }
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
            resetRouter();
            removeToken();
            router.push('/login')
        },
        set_userId(state, data) {
            state.userId = data;
        },
        set_userInfo(state, data) {
            state.userInfo = {...data};
        },
    },
    actions:{
        login: async({commit}, data)=>{
            const res = await loginAPI(data);
            let resData = res.data;
            if(res.code >= 0) {
                commit('set_userId', resData.userId);
                commit('set_userInfo', resData);
                setToken(resData.token);
                router.push('/home');
            } else {
                message.error(resData)
            }
        },
        testToken: async() => {
            const res = await testTokenAPI();
            message.success(res.data);
        }
    }
};

export default user

