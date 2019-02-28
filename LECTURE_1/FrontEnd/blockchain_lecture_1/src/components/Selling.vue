<template>
    <div>
        <h1> Sell Contract! </h1>
        <metamaskInfo/>
        <p> ContractAddress : {{ pageInfoContractAddress }}</p>
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

                  <h5> 物品狀態</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.canSell }}
                  </p>

                  <h5> 合約狀態</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.contractActive }}
                  </p>

                  <h5> 訂金</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.firstPartAmount }} GXT
                  </p>

                  <h5> 購買日期</h5>
                  <p class="card-text">
                      1970-01-01
                  </p>

                  <h5> 尾款</h5>
                  <p class="card-text">
                      {{ getSellingContractProductInfo.secondPartAmount }} GXT
                  </p>
              </b-card>
            </div>
        </div>
        <hr>
        <div>
          <b-button-group size="lg">
            <b-button v-on:click="reserveItem">預定商品</b-button>
            <b-button v-on:click="confirmItem">確認購買</b-button>
            <b-button v-on:click="cancelItem">取消交易</b-button>
          </b-button-group>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
import {NETWORKS} from '../util/constants/networks'
// import {getSellingContract, testFunction} from '../util/getSellingContract'
import MetaMask from '@/components/MetaMask'
export default {
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from ContractTest.vue')
    this.$store.dispatch('registerWeb3')
    // console.log('dispatching getGXTokenContractInstance')
    // this.$store.dispatch('getGXTokenContractInstance')
    // console.log('LOADING Selling Contract Instance ')
    // this.$store.dispatch('getSellingContractInstance',this.$route.query.contract)
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
      let canSell = await this.$store.state.SellingContractInstance().methods.canSell().call()
      console.log("canSell:")
      console.log(canSell)
      let contractActive = await this.$store.state.SellingContractInstance().methods.contractActive().call()
      console.log("contractActive:")
      console.log(contractActive)
      let firstPartAmount = await this.$store.state.SellingContractInstance().methods.firstPartAmount().call()
      console.log("firstPartAmount:")
      console.log(firstPartAmount)
      let secondPartAmount = await this.$store.state.SellingContractInstance().methods.secondPartAmount().call()
      console.log("secondPartAmount:")
      console.log(secondPartAmount)
      return {
        seller: seller,
        productName: productName,
        canSell: canSell,
        contractActive: contractActive,
        firstPartAmount: firstPartAmount,
        secondPartAmount: secondPartAmount
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
        pageInfoContractAddress: this.$route.query.contract,
        sendForm: {
          receiver: '',
          amount: ''
        },
        sendFormShow: true,
    }
  },

  methods: {
    reserveItem(event) {
      // Need to add error handling
      // Should update web3js for the bug
      // waiting for NPM update
      console.log("reserveItem")
      // this.$store.state.GXTokenContractInstance().methods.approve(this.getSellingContractAddr,this.getSellingContractProductInfo.firstPartAmount).send({from:this.coinbase}).then((_receipt) => {
      //   console.log("APPROVE RECEIPT")
      //   console.log(_receipt)
      //   return this.$store.state.SellingContractInstance().methods.buyItems().send({from:this.coinbase})
      // })
      
    },
    confirmItem(event) {
      // Need to add error handling
      console.log("confirmItem")
      // this.$store.state.GXTokenContractInstance().methods.approve(this.getSellingContractAddr,this.getSellingContractProductInfo.secondPartAmount).send({from:this.coinbase}).then((_receipt) => {
      //   console.log("APPROVE RECEIPT")
      //   console.log(_receipt)
      //   return this.$store.state.SellingContractInstance().methods.finishBuyItems().send({from:this.coinbase})
      // })
    },
    cancelItem(event) {
      // Need to add error handling
      console.log("cancelItem")
      // this.$store.state.SellingContractInstance().methods.cancelTransaction().send({from:this.coinbase})
    },


    onSendReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.sendForm.receiver = '';
      this.sendForm.amount = null;
      /* Trick to reset/clear native browser form validation state */
      this.sendFormShow = false;
      this.$nextTick(() => { this.sendFormShow = true });
    }

  }
}
</script>