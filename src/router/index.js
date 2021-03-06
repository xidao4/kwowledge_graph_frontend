import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/experience'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
    path: '/experience',
    name: 'experience',
    component: ()=> import('@/views/graph2.0/components/ExperienceHome'),
  },
  {
    path: '/search',
    name: 'search',
    component: ()=> import('@/views/graph2.0/components/SearchKG'),
  },
  {
    path: '/searchList',
    name: 'searchList',
    component: ()=> import('@/views/graph2.0/components/SearchList'),
  },
  {
    path: '/searchDetail',
    name: 'searchDetail',
    component: ()=> import('@/views/graph2.0/components/SearchDetail'),
  },
  {
    path: '/editor',
    name: 'editor',
    component: ()=> import('@/views/graph2.0/Editor'),
  },
  {
    path: '/largeGraph',
    name: 'largeGraph',
    component: ()=> import('@/views/graph2.0/components/LargeGraph'),
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
