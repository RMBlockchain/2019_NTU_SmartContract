import Web3 from 'web3'
import {store} from '../store/'


let pollWeb3 = function (state) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)

  setInterval(() => {
    if (web3 && store.state.web3.web3Instance) {
      web3.eth.getCoinbase().then((_result) => {
          if (_result !== store.state.web3.coinbase) {
            let newCoinbase = _result
            web3.eth.getBalance(_result, function (err, newBalance) {
              if (err) {
                console.log(err)
              } else {
                store.dispatch('pollWeb3', {
                  coinbase: newCoinbase,
                  balance: parseInt(newBalance, 10)
                })
              }
            })
          } else {
            web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
              if (err) {
                console.log(err)
              } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
                store.dispatch('pollWeb3', {
                  coinbase: store.state.web3.coinbase,
                  balance: polledBalance
                })
              }
            })
          }
      })
    }
  }, 500)
}

export default pollWeb3