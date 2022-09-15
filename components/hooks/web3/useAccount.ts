import useSWR from "swr";

// deps means dependencies -> provider, ethereum, contract all from web3State
// hookFactory is a function that returns a function. So the format is () => () => {}
export const hookFactory = (deps: any) => (params: any) => {
  const swrRes = useSWR("web3/useAccount", () => {
    console.log({deps});
    console.log({params});
    // making request to get data so this part of f'n will happen async'sly
    return "Test User"
  })

  return swrRes;
}

export const useAccount = hookFactory({ethereum: null, provider: null});