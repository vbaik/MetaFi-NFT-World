import { useListedNfts, useOwnedNfts } from 'components/hooks/web3';
import { FunctionComponent } from 'react';
import NftItem from '../item';

const NftList: FunctionComponent = () => {
  const { nfts } = useListedNfts();
  const ownedNfts = useOwnedNfts().nfts.data;
  const ownedTokenIds = ownedNfts?.map((nft) => nft.tokenId);

  return (
    <div className='mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none md:grid-cols-2'>
      {nfts.data?.map((nft) => (
        <div
          key={nft.meta.image}
          className='flex flex-col rounded-lg shadow-lg overflow-hidden'
        >
          <NftItem
            item={nft}
            buyNft={nfts.buyNft}
            ownedTokenIds={ownedTokenIds}
          />
        </div>
      ))}
    </div>
  );
};

export default NftList;
