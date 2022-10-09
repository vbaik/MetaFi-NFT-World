import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract, providers } from 'ethers';
import { SWRResponse } from 'swr';
import { NftMarketContract } from './nftMarketContract';

export type Web3Dependencies = {
  provider: providers.Web3Provider; //from ethers
  contract: NftMarketContract; //from ethereum-abi-types-generator library
  ethereum: MetaMaskInpageProvider; //from metamask
  isLoading: boolean;
};

export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D> & R; //from swr

//funtion that returns swrResponse.
/*you can write like below:
  export type CryptoHandlerHook = (params: string) => SWRResponse;
*/
export type CryptoHandlerHook<D = any, R = any, P = any> = (
  params?: P
) => CryptoSWRResponse<D, R>;

//type for hookFactory
//D = data, P = parameters, R = response
export type CryptoHookFactory<D = any, R = any, P = any> = {
  //hookFactory function: returns another function --> structure is (): ()
  //'Partial' should be included since values in the Web3Dependencies may not be all available in the beginning.
  (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, R, P>;
};

/*you can write above code as a shortend form (as below) but you can't use CryptoHandlerHook type elsewhere.
export type CryptoHookFactory<D = any, P = any> = {
  (d: Partial<Web3Dependencies>): (params: P) => SWRResponse<D>;
};
*/
