/*because we have to copy and paste the code below, disable Prettier for this file.*/

const instance = await NftMarket.deployed();

//mintToken(tokenURI, price of NFT {value: listingFee, from: first account of Ganache})
//minting token1:
instance.mintToken('https://gateway.pinata.cloud/ipfs/QmbiE5ZdZb97C7WuCmbSQ6o7yHn4FRroojwmGDLtevPHC7', '500000000000000000', {value: '25000000000000000', from: accounts[0]});

//minting token2:
instance.mintToken('https://gateway.pinata.cloud/ipfs/QmbTp4n88Yjj931Gg4qz4LYLuCSdQwCv6sn5u8fzs16KsB', '300000000000000000', {value: '25000000000000000', from: accounts[0]});
