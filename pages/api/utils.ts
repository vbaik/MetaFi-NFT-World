import { withIronSession, Session } from 'next-iron-session';
import contract from '../../public/contracts/NftMarket.json';
import { NextApiRequest, NextApiResponse } from 'next';

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
  return new Promise((resolve, reject) => {
    const message = req.session.get('message-session');
    console.log('decoded message --> ', message);

    if (message) {
      resolve('Correct Address');
    } else {
      reject('Wrong Address');
    }
  });
};
