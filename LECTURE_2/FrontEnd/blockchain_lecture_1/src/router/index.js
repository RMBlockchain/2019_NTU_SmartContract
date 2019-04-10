import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Selling from '@/components/Selling'
import SellingGen from '@/components/SellingGen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Selling
    },
    {
      path: '/sellinggen',
      name: 'SellingGen',
      component: SellingGen
    }
  ]
})
