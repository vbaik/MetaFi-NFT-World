import { useNetwork } from 'components/hooks/web3';
import type { NextPage } from 'next'; //NextPage type is next.js's built-in type that allows to properly type page components
import { BaseLayout, NftList } from '../components';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Market: NextPage = () => {
  const { network } = useNetwork();

  return (
    <BaseLayout>
      <div className='relative bg-white-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
        <div className='absolute inset-0'>
          <div className='bg-white h-1/3 sm:h-2/3' />
        </div>
        <div className='relative'>
          <div className='text-center'>
            <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
              Your NFT World
            </h2>
            <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
              Create • Sell • Buy NFTs in Your Own Space!
            </p>
          </div>
          {network.isConnectedToNetwork ? (
            <NftList />
          ) : (
            <div className='rounded-md bg-yellow-50 p-4 mt-10'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <ExclamationCircleIcon
                    className='h-5 w-5 text-red-400'
                    aria-hidden='true'
                  />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-red-800'>
                    Attention needed
                  </h3>
                  <div className='mt-2 text-sm text-yellow-700'>
                    <p>
                      {network.isLoading
                        ? 'Loading...'
                        : `Please connect to ${network.targetNetwork}.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Market;
