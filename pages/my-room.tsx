/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { BaseLayout, Room } from '../components';
import { Nft, NftMetaData } from '@_types/nft';
import { useOwnedNfts } from 'components/hooks/web3';

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

  return (
    <BaseLayout>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          left: '0px',
        }}
      >
        <Room />
      </div>
    </BaseLayout>
  );
};

export default MyRoom;
