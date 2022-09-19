import useSWR from 'swr';
import { useEffect } from 'react';

import { CryptoHookFactory } from '@_types/hooks';

type UseAccountResponse = {
  connect: () => void; // function that returns nothing.
  isLoading: boolean; // true of Web3State is loading.
  isInstalled: boolean; // checks if MetaMask is installed
};

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>;
export type UseAccountHook = ReturnType<AccountHookFactory>; //return type of AccountHookFactory type

// deps means dependencies -> provider, ethereum, contract all from web3State
// hookFactory is a function that returns a function. So the format is () => () => {}
export const hookFactory: AccountHookFactory =
  ({ provider, ethereum, isLoading }) =>
  () => {
    const { data, mutate, isValidating, ...swr } = useSWR(
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
        shouldRetryOnError: false,
      }
    );

    useEffect(() => {
      ethereum?.on('accountsChanged', handleAccountsChanged);
      return () => {
        ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      };
    });

    const handleAccountsChanged = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      if (accounts.length === 0) {
        //when we don't have any accounts
        console.error('Please, connect to Web3 wallet');
      } else if (accounts[0] !== data) {
        //if the current account is not the same as the old account
        alert('accounts has changed');
        mutate(accounts[0]); //provide new data to our hook function
      }
    };

    const connect = async () => {
      try {
        ethereum?.request({ method: 'eth_requestAccounts' }); //this will open the MetaMask to connect your wallet if account is not connected.
      } catch (e) {
        console.error(e);
      }
    };

    return {
      ...swr,
      data,
      mutate,
      connect,
      isValidating,
      isLoading: isLoading || isValidating,
      isInstalled: ethereum?.isMetaMask || false, //true of MetaMask is installed in the browser
    };
  };
