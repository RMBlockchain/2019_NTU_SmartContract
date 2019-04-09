<template>
  <div>
    <b-nav fill tabs>
        <b-navbar-brand href="#"> SmartStore !</b-navbar-brand>
        <b-nav-item v-for="item in navItems" :key="item.id" :to="item.path" >{{item.linkTitle}}</b-nav-item>
    </b-nav>
    
  </div>

</template>

<script>
import MetaMask from '@/components/MetaMask'
export default {
  name: 'NavBar',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from NavBar.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'MetaMask': MetaMask
  },
  data: function () {
    return {
      navItems:[
      {
        id:0,
        path:"/#",
        linkTitle:"Home",
      },
      {
        id:1,
        path:"/sell",
        linkTitle:"Sell",
      },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>