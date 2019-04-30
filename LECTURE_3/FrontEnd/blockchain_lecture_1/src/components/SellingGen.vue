<template>
    <div>
        <br>
        <br>
        <hr>
        <br>
        <br>
        <div>
          <h3> Generate New Selling Contract! </h3>

            <b-form @submit="generateSellingContract" @reset="onReset" v-if="formShow">
                <b-form-group id="exampleInputGroup1"
                              label="商品名稱："
                              label-for="exampleInput1"
                              description="productName.">
                  <b-form-input id="exampleInput1"
                                type="text"
                                v-model="genForm.productName"
                                required
                                placeholder="請輸入商品名稱">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2"
                              label="售價："
                              label-for="exampleInput2">
                  <b-form-input id="exampleInput2"
                                type="text"
                                v-model="genForm.price"
                                required
                                placeholder="請輸入售價">
                  </b-form-input>
                </b-form-group>
                
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
              </b-form>
        </div>
        <div v-if="newAddressShow"> 
          <h3> New Selling Contract Address : {{ newContractAddress }}</h3>
          <b-button block variant="primary" :href=newContractPageURL > Go to the Selling Page! </b-button>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import {NETWORKS} from '../util/constants/networks'
import MetaMask from '@/components/MetaMask'

import Web3 from 'web3'
// Repair to asyncComputed

export default {
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from SellingGen.vue')
    this.$store.dispatch('registerWeb3')
    console.log('getSellingGeneratorInstance Action dispatched from SellingGen.vue')
    this.$store.dispatch('getSellingGeneratorInstance')
  },
  components:{
    metamaskInfo: MetaMask
  },

  asyncComputed:{

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
        genForm: {
          productName: '',
          price:null,
        },
        formShow: true,
        newAddressShow: false,
        newContractAddress: null,
        newContractPageURL:null
    }
  },

  methods: {
    // getGXTokenBalance(event) {
    //     this.GXTokenInstance = this.$store.state.GXTokenContractInstance().options.address
    //     this.PortalInstance = this.$store.state.PortalContractInstance().options.address
    //     this.$store.state.GXTokenContractInstance().methods.balanceOf(this.coinbase).call().then(_result => {this.GXTokenbalance = _result})
    // },

    generateSellingContract(event) {
      event.preventDefault();
      alert(JSON.stringify(this.genForm));
      this.$store.state.SellingGeneratorInstance().methods.sellingContractGenerator(this.coinbase,this.genForm.price,this.genForm.productName).send({from:this.coinbase}).then((_receipt) => {
        console.log(_receipt);
        this.newContractAddress = _receipt.events.newSelling.returnValues._newContract
        this.newContractPageURL = '/#/sell?contract=' + this.newContractAddress
        console.log("New Selling Contract : " + _receipt.events.newSelling.returnValues._newContract);
      }).then(() => { 
      this.newAddressShow = true
      this.formShow = false
    });

    },

    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.genForm.receiver = '';
      this.genForm.amount = null;
      this.newContractAddress = null;
      /* Trick to reset/clear native browser form validation state */
      this.formShow = false;
      this.$nextTick(() => { this.formShow = true });
    }

  }
}
</script>