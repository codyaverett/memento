---
name: Milkomeda Smart Contracts
created: 2022-11-16T15:11:43-06:00
updated: 2022-11-28T17:30:04-06:00
aliases: 
tags: l2, cardano, evm
---
# Milkomeda Smart Contracts
https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.6.10+commit.00c0fcaf.js

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

Encryptor:
https://keccak-256.4tools.net/

Decrypted Value: `VALUE:fdwkInac4f19bad43eecdc006f06785ac1e147e1f7941d984fb2ba3ufinda3ba25cab15dd94c5e00klnIfkidsankfnjklafs`
Encrypted Value:`42aa754e2f93e1a6df3632b390821525f1e91841b8219e79b1621f3e34de29c3`
