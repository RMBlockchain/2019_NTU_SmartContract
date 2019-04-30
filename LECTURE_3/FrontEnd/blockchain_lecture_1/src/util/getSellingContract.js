import Web3 from 'web3'
import {ABI} from './constants/contracts/Selling'

var getSellingContract = function(address) {
	return new Promise(function (resolve, reject) {
	 let web3 = new Web3(window.web3.currentProvider)
	 let SellingContract = web3.eth.Contract(ABI,address)
	 resolve(SellingContract)
	})
}

// function getSellingContract(address) {
// 	return new Promise(function (resolve, reject) {
// 	 let web3 = new Web3(window.web3.currentProvider)
// 	 let SellingContract = web3.eth.Contract(ABI,address)
// 	 resolve(SellingContract)
// 	})
// }

// function getSellingContract(address) {
// 	let web3 = new Web3(window.web3.currentProvider)
// 	let SellingContract = new web3.eth.Contract(ABI,address)
// 	return SellingContract
// }

function testFunction(address) {
	// console.log(address)
	// console.log('ABI : ')
	// console.log(ABI)
	let web3 = new Web3(window.web3.currentProvider)
	let SellingContract = new web3.eth.Contract(ABI,address)
	// console.log('( Before Return )SellingContract : ')
	// console.log(SellingContract)
	return SellingContract
}

export default getSellingContract 