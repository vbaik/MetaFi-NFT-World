/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { BaseLayout } from '../components';
import { Nft, NftMetaData } from '@_types/nft';
import { useOwnedNfts } from 'components/hooks/web3';
import { LoadNft3dObject } from '@ui/threejs/utils';

const tabs = [{ name: 'My Collection', href: '#', current: true }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Profile: NextPage = () => {
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
      <div className='my-8'>
        <div className='relative'>
          <div className='text-center '>
            <h2 className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300 sm:text-4xl'>
              My NFTs
            </h2>
            <div className='flex justify-center'>
              {(nfts.data as Nft[]).map((nft) => (
                <button
                  key={nft.tokenId}
                  onClick={() => setActiveNft(nft)}
                  type='button'
                  className=' mx-4 items-center focus:bg-amber-200 p-2 px-3 rounded-lg '
                >
                  {nft.meta.name}
                </button>
              ))}
            </div>

            {/* Details sidebar */}
            <div className='flex justify-center'>
              <div className='w-max bg-white p-8 mt-10'>
                {activeNft && ( //only actived when activeNft is true
                  <div className=''>
                    <LoadNft3dObject url={activeNft.meta.image} />
                    <div className='mt-4 flex items-start justify-between'>
                      <div>
                        <h2 className='text-lg font-medium text-gray-900'>
                          {activeNft.meta.name}
                        </h2>
                        <p className='text-sm font-medium text-gray-500'>
                          {activeNft.meta.description}
                        </p>
                      </div>
                    </div>

                    <div className='flex'>
                      <button
                        disabled={activeNft.isListed}
                        onClick={() => {
                          nfts.listNft(activeNft.tokenId, activeNft.price); //Todo: price should be able to set by the user.
                        }}
                        type='button'
                        className='disabled:text-gray-400 disabled:cursor-not-allowed flex-1 ml-3 bg-amber-500 disabled:bg-gray-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-600'
                      >
                        {activeNft.isListed ? 'Already Listed' : 'List NFT'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Profile;
