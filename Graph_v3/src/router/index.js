import Vue from 'vue'
import Router from 'vue-router'
import Arcs from '@/components/Arcs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Arcs',
      component: Arcs
    }
  ]
})
