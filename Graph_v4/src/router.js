import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import Start from './containers/Start'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name : 'Start',
    component: Start
  }
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
