pragma solidity >0.4.99 <0.6.0;

import "./Selling.sol";

contract SellingGenerator {

	address private owner;

	constructor() public {
		owner = msg.sender;
	}

	event newSelling(
	Selling _newContract);

	function sellingContractGenerator(address _seller, uint256 _price, string memory _productName) public {
		Selling _newContract = new Selling(_seller, _price, _productName);
		emit newSelling(_newContract);
	}
}