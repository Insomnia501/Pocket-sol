//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC6551Registry.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


// Pocket合约 ERC721标准

contract Pocket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    ERC6551Registry public registry;
    address public erc6551AccountImplementation;

    event AccountCreated(uint256 tokenId, address newAccount);

    constructor(
        string memory name,
        string memory symbol,
        address _registryAddress,
        address _erc6551AccountImplementation
    ) ERC721(name, symbol) {
        registry = ERC6551Registry(_registryAddress);
        erc6551AccountImplementation = _erc6551AccountImplementation;
    }

    function mintPocket(address recipient, string memory tokenURI)
        public onlyOwner
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Create an ERC6551 account for the new NFT
        uint256 salt = newItemId; // TODO:Using tokenId as salt for simplicity
        address newAccount = registry.createAccount(
            erc6551AccountImplementation,
            block.chainid,
            address(this),
            newItemId,
            salt,
            "" // No initialization data for the new account in this example
        );

        // Optionally, you can store the newAccount address in a mapping or emit an event
        emit AccountCreated(newItemId, newAccount);
    }
}
