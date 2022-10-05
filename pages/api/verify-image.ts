import { FileReq } from '@_types/nft';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-iron-session';
import {
  addressCheckMiddleware,
  pinataApiKey,
  pinataSecretApiKey,
  withSession,
} from './utils';
import FormData from 'form-data';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default withSession(
  async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const { glb, fileName, contentType } = req.body as FileReq;

      if (!glb || !fileName || !contentType) {
        return res.status(422).send({ message: 'Image data are missing' });
      }

      await addressCheckMiddleware(req, res);

      //for uploading image to Pinata
      // const buffer = Buffer.from(Object.values(file));
      const formData = new FormData(); //gets uploaded to Pinata
      formData.append('file', glb, {
        contentType,
        filename: fileName + '-' + uuidv4(),
      });
      const fileRes = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );
      res.status(200).send(fileRes.data);
    } else {
      res.status(422).send({ message: 'Invalid endpoint' });
    }
  }
);
