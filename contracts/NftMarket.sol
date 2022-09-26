// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftMarket is ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private _listedItems; //total number of listed NFT items in the NFTmarket.
  Counters.Counter private _tokenIds; //total number of NFT created from the smart contract.
  
  uint public listingPrice = 0.025 ether; //cost for listing an item.

  struct NftItem {
    uint tokenId;
    uint price;
    address creator;
    bool isListed;
  }

  event NftItemCreated (
    uint tokenId,
    uint price,
    address creator,
    bool isListed
  );

  mapping(string => bool) private _usedTokenURIs; // https://whatever.com => true
  mapping(uint => NftItem) private _idToNftItem;


  constructor() ERC721("CreaturesNFT", "CNFT") {} // ERC721(쓰고싶은 name of collection of NFTs, token name )
  
  function mintToken(string memory tokenURI, uint price) public payable returns (uint) {
    require(!tokenURIExists(tokenURI), "Token URI already exists");
    require(msg.value == listingPrice, "Price must be equal to listing price");

    _tokenIds.increment();
    _listedItems.increment();

    uint newTokenId = _tokenIds.current();

    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    _createNftItem(newTokenId, price);
    _usedTokenURIs[tokenURI] = true;

    return newTokenId;
  }

  function getNftItem(uint tokenId) public view returns (NftItem memory) {
    return _idToNftItem[tokenId];
  }

  function listedItemsCount() public view returns (uint) {
    return _listedItems.current();
  }

  function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }


  function _createNftItem(uint tokenId, uint price) private {
    require(price > 0, "Price must be at least 1 wei");

    _idToNftItem[tokenId] = NftItem(
      tokenId,
      price,
      msg.sender,
      true
    );

    emit NftItemCreated(tokenId, price, msg.sender, true);
  }


}

