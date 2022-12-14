import { CryptoHookFactory } from '@_types/hooks';
import { Nft } from '@_types/nft';
import { ethers } from 'ethers';
import useSWR from 'swr';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

type UseOwnedNftsResponse = {
  listNft: (tokenId: number, price: number) => Promise<void>;
};
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

    const _contract = contract;
    const listNft = useCallback(
      async (tokenId: number, price: number) => {
        try {
          const result = await _contract!.placeNftForSale(
            tokenId,
            ethers.utils.parseEther(price.toString()), //price converted to wei
            {
              value: ethers.utils.parseEther((0.05).toString()), //fixed listing fee in wei
            }
          );
          await toast.promise(result!.wait(), {
            pending: 'Processing transaction',
            success: 'NFT has been listed.',
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
      listNft,
    };
  };
