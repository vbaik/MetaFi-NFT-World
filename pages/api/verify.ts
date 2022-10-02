import { v4 as uuidv4 } from 'uuid';
import { Session } from 'next-iron-session';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  withSession,
  contractAddress,
  addressCheckMiddleware,
  pinataApiKey,
  pinataSecretApiKey,
} from './utils';
import { NftMetaData } from '@_types/nft';
import axios from 'axios';

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === 'GET') {
      try {
        const message = { contractAddress, id: uuidv4() };
        req.session.set('message-session', message);
        await req.session.save();

        // //to test if message is set properly in the session:
        // console.log(req.session.get('message-session'));

        res.json(message);
      } catch {
        res.status(422).send({ message: 'Cannot generate a message!' });
      }
    } else if (req.method === 'POST') {
      try {
        const nft = req.body.nft as NftMetaData;
        //need to make sure image, name, description, attributes are inputted in the form.
        if (!nft.name || !nft.description || !nft.attributes) {
          return res
            .status(422)
            .send({ message: 'Some of the data are missing in the form!' });
        }
        //now check the address:
        await addressCheckMiddleware(req, res);

        //upload json to Pinata:
        const jsonRes = await axios.post(
          'https://api.pinata.cloud/pinning/pinJSONToIPFS',
          {
            pinataMetadata: {
              name: uuidv4(), //any custom name you want
            },
            pinataContent: nft,
          },
          {
            headers: {
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
            },
          }
        );

        return res.status(200).send(jsonRes.data);
      } catch {
        res.status(422).send({ message: 'Cannot create JSON' });
      }
    } else {
      res.status(200).json({ message: 'Invalid api route' });
    }
  }
);
