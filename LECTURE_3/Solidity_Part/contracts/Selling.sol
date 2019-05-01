pragma solidity >0.4.99 <0.6.0;

import "./PecuCoin.sol";

contract Selling {

	PecuCoin public tokenContract;

	address public seller;

	mapping(address => bool) public buyer;

	uint256 public sellCount;

	uint256 public price;

	string public productName;

	bool public contractActive;

	event Sold(
		address _buyer);

	constructor(PecuCoin _tokenCotract, address _seller, uint256 _price, string memory _productName) public {
		tokenContract = _tokenCotract;
		seller = _seller;
		price = _price;
		productName = _productName;
		contractActive = true;
	}

	function buyItems() public {
		// pay firstPartAmount
		// record the buyer
		require(contractActive);
		//require(msg.value == price);
		require(tokenContract.transferFrom(msg.sender, address(this), price));
		buyer[msg.sender] = true;
		sellCount = sellCount + 1;
		emit Sold(msg.sender);
	}

}