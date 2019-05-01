import Web3 from 'web3'
import {address, ABI} from './constants/contracts/PecuCoin'

let getPecuCoinContract = new Promise(function (resolve, reject) {
 let web3 = new Web3(window.web3.currentProvider)
 let PecuCoinContract = web3.eth.Contract(ABI,address)
 // let GXTokenContractInstance = GXTokenContract.at(address)
 // casinoContractInstance = () => casinoContractInstance
 resolve(PecuCoinContract)
})

export default getPecuCoinContract