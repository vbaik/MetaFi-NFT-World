import type { NextPage } from 'next'; //NextPage type is next.js's built-in type that allows to properly type page components
import { BaseLayout, NftList } from '../components';
import nftData from '../content/meta.json';
import { NftMetaData } from '@_types/nft';
import { useWeb3 } from 'components/providers/web3';

const Home: NextPage = () => {
  const { test } = useWeb3();

  return (
    <BaseLayout>
      {test}
      <div className='relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
        <div className='absolute inset-0'>
          <div className='bg-white h-1/3 sm:h-2/3' />
        </div>
        <div className='relative'>
          <div className='text-center'>
            <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
              Amazing Creatures NFTs
            </h2>
            <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
              Mint a NFT to get unlimited ownership forever!
            </p>
          </div>
          <NftList nftData={nftData as NftMetaData[]} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
