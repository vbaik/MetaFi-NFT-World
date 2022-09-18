import useSWR from 'swr';
import { CryptoHookFactory } from '@_types/hooks';

type UseAccountResponse = {
  connect: () => void; // function that returns nothing.
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>; 
export type UseAccountHook = ReturnType<AccountHookFactory>; //return type of AccountHookFactory type

// deps means dependencies -> provider, ethereum, contract all from web3State
// hookFactory is a function that returns a function. So the format is () => () => {}
export const hookFactory: AccountHookFactory =
  ({ provider, ethereum }) =>
  () => {
    const swrRes = useSWR(
      provider ? 'web3/useAccount' : null,
      async () => {
        const accounts = await provider!.listAccounts();
        const account = accounts[0]; //first address from Metamask and that is the connected address.

        if (!account) {
          throw 'Cannot retreive account! Please, connect to web3 wallet.';
        }

        return account;
      },
      {
        revalidateOnFocus: false,
      }
    );

    const connect = async () => {
      try {
        ethereum?.request({ method: 'eth_requestAccounts' }); //this will open the MetaMask to connect your wallet if account is not connected.
      } catch (e) {
        console.error(e);
      }
    };

    return {
      ...swrRes,
      connect,
    };
  };
