import { withIronSession, Session } from 'next-iron-session';
import contract from '../../public/contracts/NftMarket.json';
import { NextApiRequest, NextApiResponse } from 'next';

import { ethers } from 'ethers';
import { NftMarketContract } from '@_types/nftMarketContract';
import * as util from 'ethereumjs-util';

const abi = contract.abi;

const NETWORKS = {
  '5777': 'Ganache',
  '53': 'Coinex-testnet',
};

type NETWORK = typeof NETWORKS;

const providerRpcUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.COINEX_TESTNET_URL
    : 'http://127.0.0.1:7545';

// const targetNetwork =
//   process.env.NODE_ENV === 'production'
//     ? process.env.NEXT_PUBLIC_NETWORK_ID
//     : '5777';
const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK;

export const contractAddress = contract['networks'][targetNetwork]['address'];
export const pinataApiKey = process.env.PINATA_API_KEY as string;
export const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY as string;

//wrapper function so we can store sessions on the server.
export function withSession(handler: any) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'nft-auth-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
}

//to check address we get from POST request:
export const addressCheckMiddleware = async (
  req: NextApiRequest & { session: Session },
  res: NextApiResponse
) => {
  return new Promise(async (resolve, reject) => {
    const message = req.session.get('message-session');

    if (message) {
      const provider = new ethers.providers.JsonRpcProvider(providerRpcUrl);

      //NftMarket contract
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        provider
      ) as unknown as NftMarketContract;

      //to test if we can call functions from the smart contract:
      const name = await contract.name();

      //unsigned msg formatted to signed message structure:
      let nonce: string | Buffer =
        '\x19Ethereum Signed Message:\n' +
        JSON.stringify(message).length +
        JSON.stringify(message);

      nonce = util.keccak(Buffer.from(nonce, 'utf-8')); //converted to bytes

      const { v, r, s } = util.fromRpcSig(req.body.signature); //extract parts of the signature
      const pubKey = util.ecrecover(util.toBuffer(nonce), v, r, s); //public key of user
      const addrBuffer = util.pubToAddress(pubKey);
      const userAddressFromUnsignedMsg = util.bufferToHex(addrBuffer); // from unsigned message

      if (userAddressFromUnsignedMsg === req.body.address) {
        resolve('Correct Address');
      }
    } else {
      reject('Wrong Address');
    }
  });
};
