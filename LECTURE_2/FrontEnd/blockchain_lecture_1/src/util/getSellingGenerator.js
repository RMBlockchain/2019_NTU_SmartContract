import Web3 from 'web3'
import {address, ABI} from './constants/contracts/SellingGenerator'

var getSellingGenerator = function() {
	return new Promise(function (resolve, reject) {
	 let web3 = new Web3(window.web3.currentProvider)
	 let SellingGenerator = web3.eth.Contract(ABI,address)
	 resolve(SellingGenerator)
	})
}


export default getSellingGenerator