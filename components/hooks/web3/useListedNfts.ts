import { CryptoHookFactory } from '@_types/hooks';
import { Nft } from '@_types/nft';
import { ethers } from 'ethers';
import useSWR from 'swr';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

type UseListedNftsResponse = {
  buyNft: (token: number, value: number) => Promise<void>;
};
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

    const _contract = contract;
    const buyNft = useCallback(
      async (tokenId: number, value: number) => {
        try {
          const result = await _contract!.buyNft(tokenId, {
            value: ethers.utils.parseEther(value.toString()),
          });
          await toast.promise(result!.wait(), {
            pending: 'Processing transaction',
            success: 'NFT is now yours! Go to Profile page.',
            error: 'Processing error',
          });
        } catch (e: any) {
          console.error(e.message);
        }
      },
      [_contract]
    );
    return {
      ...swr,
      data: data || [],
      buyNft,
    };
  };
