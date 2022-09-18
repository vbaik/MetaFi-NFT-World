import {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  Web3State,
  createDefaultState,
  loadContract,
  createWeb3State,
} from './utils';
import { ethers } from 'ethers';
import { setupHooks } from 'components/hooks/web3/setupHooks';

//밑에꺼 꼭 넣어야 children에서 에러안남.
//In the new version of React, when you pass children, you need to explicitly specify a type for it:
interface Props {
  children: React.ReactNode;
}

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Props> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any
      );
      //load contract
      const contract = await loadContract('NftMarket', provider); //(name of smart contract, provider)

      setWeb3Api(
        createWeb3State({
          ethereum: window.ethereum, //need to create definition of ethereum in utils.ts
          provider,
          contract,
          isLoading: false,
        })
      );
    }
    initWeb3();
  }, []); //called only once when the component is initialized 그래서 []를 2nd arg로 넣은것임..

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export default Web3Provider;
