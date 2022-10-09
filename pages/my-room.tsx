/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { BaseLayout, Room } from '../components';
import { Nft, NftMetaData } from '@_types/nft';
import { useOwnedNfts } from 'components/hooks/web3';
import axios from 'axios';

const MyRoom: NextPage = () => {
  useEffect(() => {
    async function fetchRoomAssetData() {
      const roomAssetsResponse = await axios.get(
        '/api/roomassets?walletAddress=633f8199cc86bf3057feebfd45'
      );
      console.log(roomAssetsResponse);

      const roomAssetsPostResponse = await axios.post('/api/roomassets', {
        walletAddress: '633f8199cc86bf3057feebfd45',
        pinataCid: 'QmcTKByJtyb9Hh1yBjTcX76eTFcwMA3wMsmKkyG9gJ49t9',
        xPos: 100,
        yPos: 200,
        zPos: 300,
      });
    }
    fetchRoomAssetData();
  }, []);

  return (
    <BaseLayout>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          left: '0px',
          top: '60px',
        }}
      >
        <Room />
      </div>
    </BaseLayout>
  );
};

export default MyRoom;
