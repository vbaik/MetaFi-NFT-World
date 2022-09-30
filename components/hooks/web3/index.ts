import { useHooks } from 'components/providers/web3';

export const useAccount = () => {
  const hooks = useHooks(); //get hooks from state
  const swrRes = hooks.useAccount();
  return {
    account: swrRes,
  };
};

export const useNetwork = () => {
  const hooks = useHooks(); //get hooks from state
  const swrRes = hooks.useNetwork();
  return {
    network: swrRes,
  };
};

export const useListedNfts = () => {
  const hooks = useHooks();
  const swrRes = hooks.useListedNfts();
  return {
    nfts: swrRes,
  };
};

export const useOwnedNfts = () => {
  const hooks = useHooks();
  const swrRes = hooks.useOwnedNfts();
  return {
    nfts: swrRes,
  };
};
