# Milkomeda network

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.10;

contract FrontRunMe {

	event success();
	event fail();

	bytes32 public secretHash;

	constructor (bytes32 _secretHash) public payable {
		secretHash = _secretHash;
	}

	function take(string calldata _secret) external {

		if(keccak256(abi.encodePacked(_secret)) == secretHash) {
			uint256 _myBalance = address(this).balance;
			msg.sender.transfer(_myBalance);
			emit success();
		} else {
			emit fail();
		}
	}
}
```

VALUE:fdwkInac4f19bad43eecdc006f06785ac1e147e1f7941d984fb2ba3ufinda3ba25cab15dd94c5e00klnIfkidsankfnjklafs