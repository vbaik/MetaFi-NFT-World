import useSWR from 'swr';
import { CryptoHookFactory } from '@_types/hooks';

const NETWORKS: { [k: string]: string } = {
  1: 'Ethereum Main Network',
  3: 'Ropsten Test Network',
  4: 'Rinkeby Test Network',
  5: 'Goerli Test Network',
  42: 'Kovan Test Network',
  53: 'Coinex Test Network',
  56: 'Binance Smart Chain',
  1337: 'Ganache Local Network',
};

const targetId = process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string;
const targetNetwork = NETWORKS[targetId];

type UseNetworkResponse = {
  isLoading: boolean; // true of Web3State is loading.'
  isSupported: boolean; // shows if the connected network is supported by my app. (currently only supported network is Ganache)
  targetNetwork: string; //Ganache network (for this app)
  isConnectedToNetwork: boolean;
};

type NetworkHookFactory = CryptoHookFactory<string, UseNetworkResponse>;
export type UseNetworkHook = ReturnType<NetworkHookFactory>; //return type of AccountHookFactory type

export const hookFactory: NetworkHookFactory =
  ({ provider, isLoading }) =>
  () => {
    const { data, isValidating, ...swr } = useSWR(
      provider ? 'web3/useNetwork' : null,
      async () => {
        const chainId = (await provider!.getNetwork()).chainId;

        if (!chainId) {
          throw 'Cannot retreive network. Please refresh browser or connect to another network.';
        }

        return NETWORKS[chainId];
      },
      {
        revalidateOnFocus: false,
      }
    );

    const isSupported = data === targetNetwork;

    return {
      ...swr,
      data,
      isValidating,
      isLoading: isLoading as boolean,
      isSupported,
      isConnectedToNetwork: !isLoading && isSupported, //true when we are not loading and network is supported.
      targetNetwork,
    };
  };
