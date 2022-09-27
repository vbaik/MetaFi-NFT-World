// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftMarket is ERC721URIStorage {
  using Counters for Counters.Counter;

  //public variables:
  uint public listingFee = 0.025 ether; //cost for listing an item.
 
  //private variables:
  Counters.Counter private _listedItems; //total number of listed NFT items in the NFTmarket.
  Counters.Counter private _tokenIds; //total number of NFT created from the smart contract.
  uint256[] private _allNfts; //store all the tokenIds in an array.

  mapping(string => bool) private _usedTokenURIs; // https://whatever.com => true
  mapping(uint => NftItem) private _idToNftItem; //tokenId => struct NftItem 
  mapping(uint => uint) private _idToNftIndex; // mapping of tokenId => index in arrray _allNfts

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

  constructor() ERC721("CreaturesNFT", "CNFT") {} // ERC721(쓰고싶은 name of collection of NFTs, token name )
  
  function mintToken(string memory tokenURI, uint price) public payable returns (uint) {
    require(!tokenURIExists(tokenURI), "Token URI already exists");
    require(msg.value == listingFee, "Price must be equal to listing price");

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

  function buyNft(uint tokenId) public payable {
    uint price = _idToNftItem[tokenId].price;
    address owner = ERC721.ownerOf(tokenId);

    require(msg.sender != owner, "You already own this NFT");
    require(msg.value == price, "Please submit the asking price");

    _idToNftItem[tokenId].isListed = false; //unlisted
    _listedItems.decrement();

    _transfer(owner, msg.sender, tokenId);
    payable(owner).transfer(msg.value);
  }
  
  function totalSupply() public view returns (uint) {
    return _allNfts.length;
  }

  function tokenByIndex(uint index) public view returns (uint) {
    require(index < totalSupply(), "Index out of bounds");
    return _allNfts[index]; 
  }

  function getAllNftsForSale() public view returns (NftItem[] memory) {
    uint allItemsCounts = totalSupply();
    uint currentIndex = 0;
    NftItem[] memory items = new NftItem[](_listedItems.current());

    for (uint i = 0; i < allItemsCounts; i++) {
      uint tokenId = tokenByIndex(i);
      NftItem storage item = _idToNftItem[tokenId];

      if (item.isListed == true) {
        items[currentIndex] = item;
        currentIndex += 1;
      }
    }
    
    return items; //returns array of all isListed == true items
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

  function _beforeTokenTransfer(
    address from,
    address to,
    uint tokenId
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, tokenId);

    // minting token
    if (from == address(0)) {
      _addTokenToAllTokensEnumaration(tokenId);
    }
  }

  function _addTokenToAllTokensEnumaration(uint tokenId) private {
    _idToNftIndex[tokenId] = _allNfts.length;
    _allNfts.push(tokenId);
  }

}

