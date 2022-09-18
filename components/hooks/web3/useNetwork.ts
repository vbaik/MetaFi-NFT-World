import useSWR from 'swr';
import { useEffect } from 'react';

import { CryptoHookFactory } from '@_types/hooks';
import { isValidChainId } from '@metamask/providers/dist/utils';

type UseNetworkResponse = {
  isLoading: boolean; // true of Web3State is loading.
};

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>;
export type UseNetworkHook = ReturnType<NetworkHookFactory>; //return type of AccountHookFactory type

export const hookFactory: NetworkHookFactory =
  ({ provider, isLoading }) =>
  () => {
    const { data, isValidating, ...swr } = useSWR(
      provider ? 'web3/useNetwork' : null,
      async () => {
        return "Testing Network";
      },
      {
        revalidateOnFocus: false,
      }
    );

    return {
      ...swr,
      data,
      isValidating,
      isLoading: isLoading || isValidating,
    };
  };
