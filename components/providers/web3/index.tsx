import { createContext, FunctionComponent, useContext, useState } from 'react';
import { Web3Params, Web3State, createDefaultState } from './utils';

//밑에꺼 꼭 넣어야 children에서 에러안남.
//In the new version of React, when you pass children, you need to explicitly specify a type for it:
interface Props {
  children: React.ReactNode;
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Props> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
