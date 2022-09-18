import { useHooks } from 'components/providers/web3';

export const useAccount = () => {
  const hooks = useHooks(); //get hooks from state
  const swrRes = hooks.useAccount(); 
  return {
    account: swrRes,
  };
};
