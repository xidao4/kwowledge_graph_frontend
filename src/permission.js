import router from './router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login','/experience','/search'];
const normalUser=['/searchDetail','/searchList']
const professionalUser=['/home/list','/editor']
import user from "./store/modules/user";
import {message} from "ant-design-vue";

router.beforeEach(async(to, from, next) => {
    NProgress.start();
    const hasToken = getToken();
    //测试用by ydl，之后要删掉
    console.log('看看state里面的???',user)
    console.log('permission',user.state.userInfo.userType)
    if (hasToken) {
        if (to.path === '/login') {
            // 导向首页
            if(user.state.userInfo.userType==='normal'){
                next({path: '/searchDetail'});
            }
            else{
                next({path: '/home'});
            }
            NProgress.done()
        }
        else if(whiteList.indexOf(to.path)!==-1){
            next()
            NProgress.done()
        }
        else {
            if(user.state.userInfo.userType==='normal'){
                if(normalUser.indexOf(to.path)!==-1){
                    next()
                }
                else{
                    console.log('要去的！',to.path)
                    message.error('没有权限访问!')
                    next({path: '/experience'});
                }
            }
            else{
                if(professionalUser.indexOf(to.path)!==-1){
                    next()
                }
                else{
                    message.error('没有权限访问')
                    next({path: '/experience'});
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
