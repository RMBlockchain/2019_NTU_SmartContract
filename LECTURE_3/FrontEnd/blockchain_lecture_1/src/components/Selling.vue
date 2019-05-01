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
        <div v-if='buyingSuccess'>
          <h3> Buying Success ! </h3>
          <h4> Receipt: </h4>
          <h5> {{ buyingReceipt }}</h5>
          <b-button-group size="lg">
            <b-button v-on:click="getItem">領取商品</b-button>
          </b-button-group>
          <div v-if='verifiedBuyingSuccess'>
            <h3> {{ itemDownloadLink }}</h3>
          </div>
        </div>
        <div v-if='spinnerShow'>
          <b-spinner label="Loading..." />
        </div>
        <div v-if='productInfoShow'>
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
                      {{ getSellingContractProductInfo.price }} PEC
                  </p>

                  <h5> 已購買</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.bought }} 
                  </p>

              </b-card>
            </div>
            <br>
            <div>
              <b-button-group size="lg">
                <b-button v-on:click="buyItem">購買商品</b-button>
              </b-button-group>
              <b-button-group size="lg">
                <b-button v-on:click="getItem">領取商品</b-button>
              </b-button-group>
            </div>
        </div>
        <hr>
        
    </div>

</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {NETWORKS} from '../util/constants/networks'
import MetaMask from '@/components/MetaMask'

import Web3 from 'web3'

export default {
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from ContractTest.vue')
    this.$store.dispatch('registerWeb3')
    console.log('LOADING Selling Contract Instance ')
    this.$store.dispatch('getSellingContractInstance')
    console.log('LOADING Selling Contract Instance ')
    this.$store.dispatch('getSellingContractInstance',this.$route.query.contract)
    console.log('dispatching getPecuCoinContractInstance')
    this.$store.dispatch('getPecuCoinContractInstance')
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
      spinnerShow:false,
      productInfoShow:true,
      buyingSuccess:false,
      buyingReceipt:null,
      verifiedBuyingSuccess:false,
      itemDownloadLink:null,

    }
  },

  methods: {
    async getItem(event) {
      event.preventDefault()
      console.log("getItem")
      // Sign a message 
      let web3 = window.web3
      web3 = new Web3(web3.currentProvider)
      const message = "Hello World!"
      const messageHex = web3.utils.utf8ToHex(message)
      console.log(messageHex)
      let accounts = await web3.eth.getAccounts()
      console.log(accounts)
      let signature = await web3.eth.personal.sign(messageHex, accounts[0],"testPass")
      console.log(signature)
      // Send to backend
      const address = this.coinbase

      const path ='http://'+location.hostname+':5003/retrievebuying?address='+address+'&signature='+signature
      console.log(path)

      let _response = await axios.get(path)
      console.log(_response)
      if (_response.data == 1) {
        console.log("Verified Buying Success")
      }else{
        console.log("Verified Buying Fail")
      }

    },

    buyItem(event) {
      // Need to add error handling
      // Should update web3js for the bug
      // waiting for NPM update
      event.preventDefault()
      this.productInfoShow = false
      this.spinnerShow = true
      console.log("buyItem")
      const address = this.coinbase
      const productName = this.getSellingContractProductInfo.productName
      const productID = 0
      const quantity = 1
      const amount = this.getSellingContractProductInfo.price
      const path ='http://'+location.hostname+':5003/registerbuying?address='+address+'&productName='+productName+'&productID='+productID+'&quantity='+quantity+'&amount='+amount

      this.$store.state.PecuCoinContractInstance().methods.approve(this.getSellingContractAddr,this.getSellingContractProductInfo.price).send({from:this.coinbase}).then((_receipt) => {
        console.log("APPROVE RECEIPT")
        console.log(_receipt)
        return this.$store.state.SellingContractInstance().methods.buyItems().send({from:this.coinbase})
      }).then((_receipt) => {
        console.log(_receipt)
        this.spinnerShow = false
        this.buyingSuccess = true

      })



      // this.$store.state.SellingContractInstance().methods.buyItems().send({from:this.coinbase,value:this.getSellingContractProductInfo.price}).then((_receipt) => {
      //   console.log(_receipt)
      //   // update to mongoDB
      //   // call API
      //   // window.location.replace(path)
      //   // return axios.get(path)
      //   return 0
      // }).then((_response) => {
      //   //console.log(_response.data)
      //   this.buyingReceipt = _response.data
      //   this.spinnerShow = false
      //   this.buyingSuccess = true
      // })



    }
  }
}
</script>