import { CryptoHookFactory } from '@_types/hooks';
import { Nft } from '@_types/nft';
import { ethers } from 'ethers';
import useSWR from 'swr';

type UseListedNftsResponse = {};
type ListedNftsHookFactory = CryptoHookFactory<Nft[], UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export const hookFactory: ListedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useListedNfts' : null, //if we have contract as a dependency then get NFTs
      async () => {
        const nfts = [] as Nft[];
        const allNftsForSale = await contract!.getAllNftsForSale();

        for (let i = 0; i < allNftsForSale.length; i++) {
          const eachNftItem = allNftsForSale[i];
          const tokenURI = await contract!.tokenURI(eachNftItem.tokenId);
          const metaDataResponse = await fetch(tokenURI); //fetch data from Pinata
          const meta = await metaDataResponse.json();

          nfts.push({
            price: parseFloat(ethers.utils.formatEther(eachNftItem.price)), //convert big number -> number
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
