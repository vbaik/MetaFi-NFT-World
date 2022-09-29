import { CryptoHookFactory } from '@_types/hooks';
import { Nft } from '@_types/nft';
import useSWR from 'swr';

type UseListedNftsResponse = {};
type ListedNftsHookFactory = CryptoHookFactory<any, UseListedNftsResponse>;

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>;

export const hookFactory: ListedNftsHookFactory =
  ({ contract }) =>
  () => {
    const { data, ...swr } = useSWR(
      contract ? 'web3/useListedNfts' : null, //if we have contract as a dependency then get NFTs
      async () => {
        const allNftsforSale = (await contract!.getAllNftsForSale()) as Nft[];
        const nfts = [] as any;
        return nfts;
      }
    );
    return {
      ...swr,
      data: data || [],
    };
  };
