/* eslint-disable @next/next/no-img-element */

import type { NextPage } from 'next';
import { useState, useEffect, createContext } from 'react';
import { BaseLayout } from '../components';
import { Nft, NftMetaData } from '@_types/nft';
import { useOwnedNfts } from 'components/hooks/web3';
import { LoadNft3dObject } from '@ui/threejs/utils';
import { useRouter } from 'next/router';
import { spawn } from 'child_process';
import { Model2 } from '@ui/threejs/Room';
import { redirect } from 'next/dist/server/api-utils';

const tabs = [{ name: 'My Collection', href: '#', current: true }];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const SpawnedItemContext = createContext('url');

const Profile: NextPage = () => {
  const { nfts } = useOwnedNfts();
  const router = useRouter();
  const [activeNft, setActiveNft] = useState<Nft>();
  const [url, setUrl] = useState('');

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
            <div className='flex justify-center mt-5'>
              {(nfts.data as Nft[]).map((nft) => (
                <button
                  key={nft.tokenId}
                  onClick={() => setActiveNft(nft)}
                  type='button'
                  className=' mt-5 mx-3 text-pink-700 items-center focus:bg-amber-500 p-2 px-3 rounded-lg focus:text-white border-2 border-amber-500'
                >
                  {nft.meta.name}
                </button>
              ))}
            </div>

            {/* Details sidebar */}
            <div className='flex justify-center'>
              <div className='p-8 mt-10 max-w-lg'>
                {activeNft && ( //only actived when activeNft is true
                  <SpawnedItemContext.Provider value={url}>
                    <div className=''>
                      <LoadNft3dObject url={activeNft.meta.image} />
                      <div className='mt-4'>
                        <div>
                          <h2 className='text-2xl font-Gugi text-pink-600'>
                            {activeNft.meta.name}
                          </h2>
                          <p className='text-2xl font-light text-amber-600 mb-5 font-Gaegu mt-5'>
                            {activeNft.meta.description}
                          </p>
                        </div>
                      </div>

                      <div>
                        <button
                          disabled={activeNft.isListed}
                          onClick={() => {
                            nfts.listNft(activeNft.tokenId, activeNft.price); //Todo: price should be able to set by the user.
                          }}
                          type='button'
                          className='disabled:text-gray-400 disabled:cursor-not-allowed flex-1 ml-3 bg-amber-500 disabled:bg-gray-300 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                        >
                          {activeNft.isListed ? 'Already Listed' : 'List NFT'}
                        </button>
                        {/* <button
                          onClick={() => {
                            setUrl(activeNft.meta.image);
                            router.push('/my-room');
                          }}
                          type='button'
                          className='flex-1 ml-3 bg-pink-500 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'
                        >
                          Spawn
                        </button> */}
                      </div>
                    </div>
                  </SpawnedItemContext.Provider>
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
