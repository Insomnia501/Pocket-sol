// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC6551Registry.sol";

contract ERC6551NFT is ERC721, Ownable {
    ERC6551Registry public registry;
    address public erc6551AccountImplementation;
    uint256 tokenId;

    event AccountCreated(uint256 tokenId);

    constructor(
        string memory name,
        string memory symbol,
        address _registryAddress,
        address _erc6551AccountImplementation
    ) ERC721(name, symbol) {
        registry = ERC6551Registry(_registryAddress);
        erc6551AccountImplementation = _erc6551AccountImplementation;
        tokenId = 0;
    }

    function mintWithAccount(address to) public {
        uint256 newTokenId = getTokenId() + 1;// ERC721没有totalSupply，奇怪，先这么弄着
        _mint(to, newTokenId);

        // Create an ERC6551 account for the new NFT
        uint256 salt = newTokenId; // Using tokenId as salt for simplicity
        address newAccount = registry.createAccount(
            erc6551AccountImplementation,
            block.chainid,
            address(this),
            newTokenId,
            salt,
            "" // No initialization data for the new account in this example
        );

        // Optionally, you can store the newAccount address in a mapping or emit an event
        emit AccountCreated(newTokenId);
    }

    function getTokenId() internal returns (uint256) {
        tokenId += 1;
        return tokenId;
    }
}

    
