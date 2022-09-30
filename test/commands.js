/*because we have to copy and paste the code below, disable Prettier for this file.*/

const instance = await NftMarket.deployed();

//mintToken(tokenURI, price of NFT {value: listingFee, from: first account of Ganache})
//minting token1:
instance.mintToken('https://gateway.pinata.cloud/ipfs/Qmb4aom5xNRE5CBRHZsxCsYSdcmX8zfHXgM7ovZxLp3CqL', '500000000000000000', {value: '25000000000000000', from: accounts[0]});

//minting token2:
instance.mintToken('https://gateway.pinata.cloud/ipfs/QmPfoHCpmTmoLf27i7zG7fdZnWXygWYbKrkvrPhRyNeZrM', '300000000000000000', {value: '25000000000000000', from: accounts[0]});
