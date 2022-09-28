const NftMarket = artifacts.require('NftMarket');
const { ethers } = require('ethers');

contract('NftMarket', (accounts) => {
  let _contract = null;
  let _nftPrice = ethers.utils.parseEther('0.3').toString(); //convert ETH to wei
  let _listingFee = ethers.utils.parseEther('0.025').toString();

  before(async () => {
    _contract = await NftMarket.deployed();
  });

  describe('Mint token', () => {
    const tokenURI = 'https://test.com'; //fake URI for testing
    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0], //address that is sending the transaction.
        value: _listingFee, //msg.value
      });
    });

    it('owner of the first token should be address[0]', async () => {
      const owner = await _contract.ownerOf(1); // (1) = tokenId of 1 since we are creating one NFT for testing.
      assert.equal(
        owner,
        accounts[0],
        'Owner of token is not matching address[0]'
      );
    });

    it('first token should point to the correct tokenURI', async () => {
      const actualTokenURI = await _contract.tokenURI(1);
      assert.equal(actualTokenURI, tokenURI, 'tokenURI is not correctly set');
    });

    it('should not be possible to create a NFT with used tokenURI', async () => {
      try {
        await _contract.mintToken(tokenURI, _nftPrice, {
          from: accounts[0],
        });
      } catch (error) {
        assert(error, 'NFT was minted with previously used tokenURI');
      }
    });

    it('should have one listed item', async () => {
      const listedItemCount = await _contract.listedItemsCount();
      assert.equal(
        listedItemCount.toNumber(),
        1,
        'Listed items count is not 1'
      );
    });

    it('should have create NFT item', async () => {
      const nftItem = await _contract.getNftItem(1); //item you would like to get. so far we only created 1 NFT item.

      assert.equal(nftItem.tokenId, 1, 'Token id is not 1');
      assert.equal(nftItem.price, _nftPrice, 'Nft price is not correct');
      assert.equal(nftItem.creator, accounts[0], 'Creator is not account[0]');
      assert.equal(nftItem.isListed, true, 'Token is not listed');
    });
  });

  describe('Buy NFT', () => {
    before(async () => {
      await _contract.buyNft(1, {
        from: accounts[1],
        value: _nftPrice,
      });
    });

    it('should unlist the item', async () => {
      const listedItem = await _contract.getNftItem(1);
      assert.equal(listedItem.isListed, false, 'Item is still listed');
    });

    it('should decrease listed items count', async () => {
      const listedItemsCount = await _contract.listedItemsCount();
      assert.equal(
        listedItemsCount.toNumber(),
        0,
        'Count has not been decrement'
      );
    });

    it('should change the owner', async () => {
      const currentOwner = await _contract.ownerOf(1);
      assert.equal(currentOwner, accounts[1], 'Item is still listed');
    });
  });

  // to check if _beforeTokenTransfer from NftMarket.sol is working properly.
  describe('Token transfers', () => {
    const tokenURI = 'https://test-json-2.com';

    //minting the 2nd token so we have more than one for testing.
    before(async () => {
      await _contract.mintToken(tokenURI, _nftPrice, {
        from: accounts[0],
        value: _listingFee,
      });
    });

    it('should have two NFTs created', async () => {
      const totalSupply = await _contract.totalSupply();
      assert.equal(
        totalSupply.toNumber(), //convert bigNumber to regular number
        2,
        'Total supply of token is not correct.'
      );
    });

    it('should be able to retreive NFT by index', async () => {
      const nftId1 = await _contract.tokenByIndex(0);
      const nftId2 = await _contract.tokenByIndex(1);

      assert.equal(nftId1.toNumber(), 1, 'NFT id is wrong.');
      assert.equal(nftId2.toNumber(), 2, 'NFT id is wrong.');
    });

    it('should have one listed NFT', async () => {
      const allNfts = await _contract.getAllNftsForSale();
      assert.equal(allNfts[0].tokenId, 2, 'Nft has a wrong id');
    });

    it('account[1] should have one owned NFT', async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[1] });
      assert.equal(ownedNfts[0].tokenId, 1, 'Nft has a wrong id');
    });

    it('account[0] should have one owned NFT', async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[0] });
      console.log(ownedNfts);
      assert.equal(ownedNfts[0].tokenId, 2, 'Nft has a wrong id');
    });
  });

  //to check if deleting and transfering NFT is is working properly.
  describe('Token transfer to new owner', () => {
    before(async () => {
      await _contract.transferFrom(accounts[0], accounts[1], 2);
    });

    it('accounts[0] should own 0 tokens', async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[0] });
      console.log('account[0] owned Nfts --->', ownedNfts);
      assert.equal(ownedNfts.length, 0, 'Invalid length of tokens');
    });

    it('accounts[1] should own 2 tokens', async () => {
      const ownedNfts = await _contract.getOwnedNfts({ from: accounts[1] });
      console.log('account[1] owned Nfts --->', ownedNfts);
      assert.equal(ownedNfts.length, 2, 'Invalid length of tokens');
    });
  });
});
