import Vue from 'vue'
import Router from 'vue-router'
import Axes from '@/components/Axes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Axes',
      component: Axes
    }
  ]
})
