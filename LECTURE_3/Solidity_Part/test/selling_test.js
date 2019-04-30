var Selling = artifacts.require("./Selling.sol");
var SellingGenerator = artifacts.require("./SellingGenerator.sol");
var PecuCoin = artifacts.require("./PecuCoin.sol");


contract('Selling', function(accounts) {
	var sellingGeneratorContractInstance;
	var tokenContractInstance;

	it('Check Address', function() {
		return PecuCoin.deployed().then(function(instance) {
			tokenContractInstance = instance;
			return SellingGenerator.deployed();
		}).then(function(instance) {
			sellingGeneratorContractInstance = instance;
			return sellingGeneratorContractInstance.tokenContract();
		}).then(function(_tokenContract) {
			assert.equal(_tokenContract,tokenContractInstance.address,"Correct Token Contract");
		});
	});
})
