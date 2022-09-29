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
import { MetaMaskInpageProvider } from '@metamask/providers';
import { NftMarketContract } from '@_types/nftMarketContract';

//밑에꺼 꼭 넣어야 children에서 에러안남.
//In the new version of React, when you pass children, you need to explicitly specify a type for it:
interface Props {
  children: React.ReactNode;
}

const pageReload = () => {
  window.location.reload();
};

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
  const isLocked = !(await ethereum._metamask.isUnlocked()); //if unlocked is false, we want to reverse the answer for isLocked so it's true.
  if (isLocked) {
    //if metaMasked is logged out
    pageReload();
  }
};

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on('chainChanged', pageReload);
  ethereum.on('accountsChanged', handleAccount(ethereum));
};

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener('chainChanged', pageReload);
  ethereum?.removeListener('accountsChanged', handleAccount);
};

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent<Props> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  useEffect(() => {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as any
        );
        //load contract
        const contract = await loadContract('NftMarket', provider); //(name of smart contract, provider)

        //start listening if there is a chain change.
        setGlobalListeners(window.ethereum);

        setWeb3Api(
          createWeb3State({
            ethereum: window.ethereum, //need to create definition of ethereum in utils.ts
            provider,
            contract: contract as unknown as NftMarketContract,
            isLoading: false,
          })
        );
      } catch (e: any) {
        console.error('No web3 wallet installed --> ', e.message);
        //create a new web3state (api = previous data from api)
        setWeb3Api((api) =>
          createWeb3State({ ...(api as any), isLoading: false })
        );
      }
    }
    initWeb3();

    //once done listening the chain change, remove the listner.
    return () => removeGlobalListeners(window.ethereum);
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
