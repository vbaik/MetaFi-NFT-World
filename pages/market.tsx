import { useNetwork } from 'components/hooks/web3';
import type { NextPage } from 'next'; //NextPage type is next.js's built-in type that allows to properly type page components
import { BaseLayout, NftList } from '../components';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Market: NextPage = () => {
  const { network } = useNetwork();

  return (
    <BaseLayout>
      <div className='my-8'>
        <div className='relative'>
          {network.isConnectedToNetwork ? (
            <div>
              <h2 className='grid place-items-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-300 sm:text-4xl'>
                All NFTs for Sale
              </h2>
              <NftList />
            </div>
          ) : (
            <div className='flex items-center justify-center mt-16'>
              <ExclamationCircleIcon
                className='h-24 text-red-400 content-center '
                aria-hidden='true'
              />
              <div className='ml-3'>
                <h3 className='text-2xl font-medium text-red-800'>
                  Attention needed
                </h3>
                <div className='mt-3 text-lg text-yellow-700'>
                  <p>
                    {network.isLoading
                      ? 'Loading...'
                      : `Please connect to ${network.targetNetwork}.`}
                  </p>
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
