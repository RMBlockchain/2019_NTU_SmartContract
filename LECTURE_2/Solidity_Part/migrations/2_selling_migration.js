var Selling = artifacts.require("./Selling.sol");
var SellingGenerator = artifacts.require("./SellingGenerator.sol");

const sellingPrice = 1000000000000000; //WEI
const productName = 'Calculus Textbook';


module.exports = function(deployer, network, accounts) {
  deployer.deploy(Selling,accounts[0],sellingPrice,productName).then(function() {
  	return deployer.deploy(SellingGenerator)
  })
};