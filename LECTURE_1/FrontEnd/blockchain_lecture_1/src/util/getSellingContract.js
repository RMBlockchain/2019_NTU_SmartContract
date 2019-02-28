import Web3 from 'web3'
import {address, ABI} from './constants/contracts/Selling'

var getSellingContract = function() {
	return new Promise(function (resolve, reject) {
	 let web3 = new Web3(window.web3.currentProvider)
	 let SellingContract = web3.eth.Contract(ABI,address)
	 resolve(SellingContract)
	})
}


export default getSellingContract 