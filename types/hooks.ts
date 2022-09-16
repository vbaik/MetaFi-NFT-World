import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract, providers } from 'ethers';
import { SWRResponse } from 'swr';

export type Web3Dependencies = {
  provider: providers.Web3Provider; //from ethers
  contract: Contract; //from ethers
  ethereum: MetaMaskInpageProvider; //from metamask
};

export type CryptoSWRResponse = SWRResponse; //from swr

//funtion that returns swrResponse.
/*밑에꺼 더 짧게 
  export type CryptoHandlerHook = (params: string) => SWRResponse;
이렇게 써도됨.*/
export type CryptoHandlerHook = (params: string) => CryptoSWRResponse;

//type for hookFactory
export type CryptoHookFactory = {
  //hookFactory function: returns another function --> format은 (): ()
  //Partial써야 values in the Web3Dependencies may not be all available in the beginning하는걸 recognize 할수있음.
  (d: Partial<Web3Dependencies>): CryptoHandlerHook;
};
