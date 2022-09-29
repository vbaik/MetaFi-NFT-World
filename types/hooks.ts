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
/*밑에꺼 더 짧게 
  export type CryptoHandlerHook = (params: string) => SWRResponse;
이렇게 써도됨.*/
export type CryptoHandlerHook<D = any, R = any, P = any> = (
  params?: P
) => CryptoSWRResponse<D, R>;

//type for hookFactory
//D = data, P = parameters, R = response
export type CryptoHookFactory<D = any, R = any, P = any> = {
  //hookFactory function: returns another function --> format은 (): ()
  //Partial써야 values in the Web3Dependencies may not be all available in the beginning하는걸 recognize 할수있음.
  (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, R, P>;
};

/*위의 코드를 짧게 밑에처럼 쓸수도 있지만 그렇게 하면 CryptoHandlerHook 타입이 다른곳에서 따로 필요할때 못쓰니깐 위에처럼 나누는것이 좋음.
export type CryptoHookFactory<D = any, P = any> = {
  (d: Partial<Web3Dependencies>): (params: P) => SWRResponse<D>;
};
*/
