import { MetaMaskInpageProvider } from '@metamask/providers';
import { setupHooks, Web3Hooks } from 'components/hooks/web3/setupHooks';
import { Contract, providers, ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
  ethereum: MetaMaskInpageProvider | null;
  provider: providers.Web3Provider | null;
  contract: Contract | null;
};

export type Web3State = {
  isLoading: boolean; //true while loading web3State
  hooks: Web3Hooks;
} & Web3Params;

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({} as any), //default position will not have any hooks so just put empty object
  };
};

// to create an instance of the smart contract, you need to know which network the smart contract is deployed to.
const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID; //make sure .env.development file is created with a network id before using it here.

//function for loading the contract
export const loadContract = async (
  name: string, // NftMarket
  provider: providers.Web3Provider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    return Promise.reject('Network ID is not defined!');
  }

  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json(); //basically NftMarket.json file (any name is good but Artifact is typical.)

  if (Artifact.networks[NETWORK_ID].address) {
    //if I have address of the smart contract that is deployed, load the contract.
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID].address,
      Artifact.abi, //from NftMarket.json file.
      provider
    );
    return contract;
  } else {
    return Promise.reject(`Contract: [${name}] cannot be loaded!`);
  }
};
