import router from './router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login'];
const normalUser=['/search','/searchList','/searchDetail','/experience']
import user from "./store/modules/user";
import {message} from "ant-design-vue";

router.beforeEach(async(to, from, next) => {
    NProgress.start();
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === '/login') {
            // 导向首页
            if(user.state.userInfo.userType==='normal'){
                next({path: '/search'});
            }
            else{
                next({path: '/'});
            }
            NProgress.done()
        } else {
            if(user.state.userInfo.userType==='normal'){
                if(normalUser.indexOf(to.path)!==-1){
                    next()
                }
                else{
                    message.error('没有权限访问')
                }
            }
            else{
                if(normalUser.indexOf(to.path)!==-1){
                    message.error('没有权限访问')
                }
                else{
                    next()
                }
            }
            NProgress.done()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done()
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
});
