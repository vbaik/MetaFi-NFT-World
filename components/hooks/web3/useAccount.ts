import useSWR from 'swr';
import { CryptoHookFactory } from '@_types/hooks';

type AccountHookFactory = CryptoHookFactory<string>; //data는 string이고 parameter는 any니깐 표시 안써줘도 됨.
export type UseAccountHook = ReturnType<AccountHookFactory>; //return type of AccountHookFactory type

// deps means dependencies -> provider, ethereum, contract all from web3State
// hookFactory is a function that returns a function. So the format is () => () => {}
export const hookFactory: AccountHookFactory =
  ({ provider }) =>
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

    return swrRes;
  };
