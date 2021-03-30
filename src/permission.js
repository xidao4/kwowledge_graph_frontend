import router from './router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login'];
router.beforeEach(async(to, from, next) => {
    NProgress.start();
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === '/login') {
            // 导向首页
            next({path: '/'});
            NProgress.done()
        } else {
            next();
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
