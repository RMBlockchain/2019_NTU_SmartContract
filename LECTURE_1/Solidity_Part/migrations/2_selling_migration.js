var Selling = artifacts.require("./Selling.sol");

const sellingPrice = 1000000000000000; //WEI
const productName = 'Calculus Textbook';


module.exports = function(deployer, network, accounts) {
  deployer.deploy(Selling,accounts[0],sellingPrice,productName)
};