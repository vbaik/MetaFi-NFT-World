// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftMarket is ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _listedItems; //total number of listed NFT items in the NFTmarket.
  Counters.Counter private _tokenIds; //total number of NFT created from the smart contract.
  constructor() ERC721("CreaturesNFT", "CNFT") {} // ERC721(쓰고싶은 name of collection of NFTs, token name )

  mapping(string => bool) private _usedTokenURIs; // https://whatever.com => true

  
  function mintToken(string memory tokenURI) public payable returns (uint) {
    require(!tokenURIExists(tokenURI), "Token URI already exists");

    _tokenIds.increment();
    _listedItems.increment(); 

    uint newTokenId = _tokenIds.current();

    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    _usedTokenURIs[tokenURI] = true;

    return newTokenId;
  }

   function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }
}

