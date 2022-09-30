import { CryptoHookFactory } from '@_types/hooks';
import { Nft } from '@_types/nft';
import { ethers } from 'ethers';
import useSWR from 'swr';

type UseOwnedNftsResponse = {};
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>;

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>;

export const hookFactory: OwnedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useOwnedNfts' : null,
      async () => {
        const nfts = [] as Nft[];
        const allNftsOwned = await contract!.getOwnedNfts();
        // console.log('all NFTs owned by the user -->', allNftsOwned);

        for (let i = 0; i < allNftsOwned.length; i++) {
          const eachNftItem = allNftsOwned[i];
          const tokenURI = await contract!.tokenURI(eachNftItem.tokenId);
          const metaDataResponse = await fetch(tokenURI);
          const meta = await metaDataResponse.json();

          nfts.push({
            price: parseFloat(ethers.utils.formatEther(eachNftItem.price)),
            tokenId: eachNftItem.tokenId.toNumber(),
            creator: eachNftItem.creator,
            isListed: eachNftItem.isListed,
            meta,
          });
        }

        return nfts;
      }
    );
    return {
      ...swr,
      data: data || [],
    };
  };
