import { createContext, FunctionComponent, useContext, useState } from 'react';

import { MetaMaskInpageProvider } from '@metamask/providers';
import { Contract, providers } from 'ethers';

export type Web3State = {
  ethereum?: MetaMaskInpageProvider;
  provider?: providers.Web3Provider;
  contract?: Contract;
};

//밑에꺼 꼭 넣어야 children에서 에러안남.
//In the new version of React, when you pass children, you need to explicitly specify a type for it:
interface Props {
  children: React.ReactNode;
}

const Web3Context = createContext<Web3State>(null);

const Web3Provider: FunctionComponent<Props> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(null);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
