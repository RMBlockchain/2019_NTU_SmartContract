<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <MetaMask/>

  </div>
</template>

<script>
import MetaMask from '@/components/MetaMask'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello Smart Contract!',
    }
  },
  components:{
        "MetaMask": MetaMask
      },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
