var Selling = artifacts.require("./Selling.sol");


contract('Selling', function(accounts) {
	var sellingContractInstance;

	it('Check Address', function() {
		return Selling.deployed().then(function(instance) {
			sellingContractInstance = instance;
			return sellingContractInstance.seller();
		}).then(function(_seller) {
			assert.equal(_seller,accounts[0],"Correct Seller");
		})
	});
})
