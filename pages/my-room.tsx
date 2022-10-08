/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { BaseLayout, Room } from '../components';
import { Nft, NftMetaData } from '@_types/nft';
import { useOwnedNfts } from 'components/hooks/web3';
import axios from 'axios';
import RoomThreeJs from '../components/ui/threejs/RoomThreeJs';

const tabs = [{ name: 'Your Collection', href: '#', current: true }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const MyRoom: NextPage = () => {
  const { nfts } = useOwnedNfts();
  const [activeNft, setActiveNft] = useState<Nft>();

  useEffect(() => {
    if (nfts.data && nfts.data.length > 0) {
      //called only when we have nft data
      setActiveNft(nfts.data[0]);
    }
    return () => setActiveNft(undefined);
  }, [nfts.data]);

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

  useEffect(() => {
    RoomThreeJs();
  }, []);

  return (
    <BaseLayout>
      <div
        style={{
          width: '1000px',
          height: '700px',
        }}
        id='scene3d'
      ></div>
    </BaseLayout>
  );
};

export default MyRoom;
