import Vue from 'vue'
import VueRouter from 'vue-router'
import UserGraph from '../views/graph/UserGraph'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'UserGraph',
    component: UserGraph,

  }
];

const router = new VueRouter({
  routes
});

export default router
