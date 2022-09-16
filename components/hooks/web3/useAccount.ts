import useSWR from "swr";
import { CryptoHookFactory } from "@_types/hooks";

// deps means dependencies -> provider, ethereum, contract all from web3State
// hookFactory is a function that returns a function. So the format is () => () => {}
export const hookFactory: CryptoHookFactory<string, string>= (deps) => (params) => {
  const swrRes = useSWR("web3/useAccount", () => {
    console.log({deps});
    console.log({params});
    // making request to get data so this part of f'n will happen async'sly
    return "Test User"
  })

  return swrRes;
}

export const useAccount = hookFactory({ethereum: undefined, provider: undefined}); //values are potentially undefined in the beginning