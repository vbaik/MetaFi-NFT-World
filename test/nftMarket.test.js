const NftMarket = artifacts.require('NftMarket');

contract('NftMarket', (accounts) => {
  let _contract = null;

  before(async () => {
    _contract = await NftMarket.deployed();
  });

  describe('Mint token', () => {
    const tokenURI = 'https://test.com'; //fake URI for testing
    before(async () => {
      await _contract.mintToken(tokenURI, {
        from: accounts[0], //address that is sending the transaction.
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
  });
});
 