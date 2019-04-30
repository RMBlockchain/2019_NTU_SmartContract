var Selling = artifacts.require("./Selling.sol");
var SellingGenerator = artifacts.require("./SellingGenerator.sol");
var PecuCoin = artifacts.require("./PecuCoin.sol");

const sellingPrice = 1000000000000000; //WEI
const productName = 'Calculus Textbook';



module.exports = function(deployer, network, accounts) {
	deployer.deploy(PecuCoin,1000000000000).then(function() {
		return deployer.deploy(SellingGenerator, PecuCoin.address);
	});
};