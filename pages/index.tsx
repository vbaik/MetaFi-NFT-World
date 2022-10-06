import { useNetwork } from 'components/hooks/web3';
import type { NextPage } from 'next'; //NextPage type is next.js's built-in type that allows to properly type page components
import { BaseLayout, NftList, LandingPage, Navbar } from '../components';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Home: NextPage = () => {
  const { network } = useNetwork();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Navbar />
      <LandingPage />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate3d(-50%,-50%,0)',
        }}
      >
        <h1 className='font-medium text-slate-700 text-5xl '>
          Enter into your
        </h1>
        <h1 className='font-medium text-transparent text-9xl  bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-200'>
          <Link href='/market'>NFT</Link>
        </h1>
        <h1 className='font-medium text-slate-700 text-5xl text-right'>
          World
        </h1>
      </div>
    </div>
  );
};

export default Home;
