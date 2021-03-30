import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'layout',
    redirect: '/home/list',
    component: ()=> import('@/components/Layout'),
    children: [
      {
        path: '/home/list',
        name: 'list',
        component: () => import('@/views/user/UserGraphList')
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: ()=> import('@/views/graph2.0/Editor'),
  },
];

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

export default router
