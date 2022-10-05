//shorten wallet address
export function shortifyAddress(address: string) {
  return `${address.slice(0,4)}...${address.slice(-2)}`;
}
