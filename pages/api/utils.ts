import { withIronSession, Session } from 'next-iron-session';
import contract from '../../public/contracts/NftMarket.json';
import { NextApiRequest, NextApiResponse } from 'next';

import { ethers } from 'ethers';
import { NftMarketContract } from '@_types/nftMarketContract';

const abi = contract.abi;

const NETWORKS = {
  '5777': 'Ganache',
};

type NETWORK = typeof NETWORKS;

const targetNetwork = process.env.NEXT_PUBLIC_NETWORK_ID as keyof NETWORK;

export const contractAddress = contract['networks'][targetNetwork]['address'];

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
      const provider = new ethers.providers.JsonRpcProvider(
        'http://127.0.0.1:7545'
      );

      //NftMarket contract
      const contract = new ethers.Contract(
        contractAddress,
        abi,
        provider
      ) as unknown as NftMarketContract;

      //to test if we can call functions from the smart contract:
      const name = await contract.name();
      console.log(name);

      resolve('Correct Address');
    } else {
      reject('Wrong Address');
    }
  });
};
