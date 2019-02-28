<template>
    <div>
        <h1> Sell Contract! </h1>
        <metamaskInfo/>
        <p> SellingContract : {{ getSellingContractAddr }}</p>
        <br>
        <br>
        <hr>
        <br>
        <br>
        <div>
          <h3> 商品介紹 </h3>
            <div>
              <b-card :title='getSellingContractProductInfo.productName'>
                  <!-- <h4 slot="header">Hello World</h4> -->
                  <h5> 出售者</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.seller }}
                  </p>

                  <h5> 合約狀態</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.contractActive }}
                  </p>

                  <h5> 售價</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.price }} WEI
                  </p>

                  <h5> 已購買</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.bought }} 
                  </p>

              </b-card>
            </div>
        </div>
        <hr>
        <div>
          <b-button-group size="lg">
            <b-button v-on:click="buyItem">購買商品</b-button>
          </b-button-group>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
import {NETWORKS} from '../util/constants/networks'
import MetaMask from '@/components/MetaMask'
export default {
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from ContractTest.vue')
    this.$store.dispatch('registerWeb3')
    console.log('LOADING Selling Contract Instance ')
    this.$store.dispatch('getSellingContractInstance')
  },
  mounted() {
  },

  components:{
    metamaskInfo: MetaMask
  },
  asyncComputed: {
    async getSellingContractAddr() {
      let addr = await this.$store.state.SellingContractInstance().options.address
      return addr
    },
    async getSellingContractProductInfo() {
      let seller = await this.$store.state.SellingContractInstance().methods.seller().call()
      console.log("Seller:")
      console.log(seller)
      let productName = await this.$store.state.SellingContractInstance().methods.productName().call()
      console.log("productName:")
      console.log(productName)
      let contractActive = await this.$store.state.SellingContractInstance().methods.contractActive().call()
      console.log("contractActive:")
      console.log(contractActive)
      let price = await this.$store.state.SellingContractInstance().methods.price().call()
      console.log("price:")
      console.log(price)
      //fix when change account this cannot auto render
      // fix error handling
      // let bought = await this.$store.state.SellingContractInstance().methods.buyer(this.coinbase).call()
      // console.log("bought:")
      // console.log(bought)
      return {
        seller: seller,
        productName: productName,
        contractActive: contractActive,
        price: price,
        bought:true
      }
    }
  },

  computed: {
    ...mapState({
    isInjected: state => state.web3.isInjected,
    network: state => NETWORKS[state.web3.networkId],
    coinbase: state => state.web3.coinbase,
  }),
  }
  ,

  data () {
    return {
    }
  },

  methods: {
    buyItem(event) {
      // Need to add error handling
      // Should update web3js for the bug
      // waiting for NPM update
      event.preventDefault()
      console.log("buyItem")
      const address = this.coinbase
      const productName = this.getSellingContractProductInfo.productName
      const productID = 0
      const quantity = 1
      const amount = this.getSellingContractProductInfo.price
      const path ='http://'+location.hostname+':5003/registerbuying?address='+address+'&productName='+productName+'&productID='+productID+'&quantity='+quantity+'&amount='+amount
      this.$store.state.SellingContractInstance().methods.buyItems().send({from:this.coinbase,value:this.getSellingContractProductInfo.price}).then((_receipt) => {
        console.log(_receipt)
        // update to mongoDB
        // call API
        window.location.replace(path)
      })
      
  
    }
  }
}
</script>