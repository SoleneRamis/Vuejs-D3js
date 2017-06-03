import Vue from 'vue'
import Router from 'vue-router'
import Bars from '@/components/Bars'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bars',
      component: Bars
    }
  ]
})
