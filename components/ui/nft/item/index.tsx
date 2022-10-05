import { FunctionComponent } from 'react';
import { Nft } from '../../../../types/nft';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds } from '@react-three/drei';
import { Model, SelectToZoom } from '@ui/threejs/utils';
import { shortifyAddress } from '@ui/utils';

type NftItemProps = {
  item: Nft;
  buyNft: (token: number, value: number) => Promise<void>;
};

function Nft3dObject({ url }) {
  return (
    <Canvas camera={{ position: [2, -3, 3], fov: 50 }}>
      <hemisphereLight color='white' groundColor='blue' intensity={0.75} />
      <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
      <Bounds fit clip observe margin={1.2}>
        <SelectToZoom>
          <Model position={[0, 0.25, 0]} url={url} />
        </SelectToZoom>
      </Bounds>
      <OrbitControls
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
    </Canvas>
  );
}

const NftItem: FunctionComponent<NftItemProps> = ({ item, buyNft }) => {
  return (
    <div>
      <div className='flex-shrink-0'>
        <Nft3dObject url='https://gateway.pinata.cloud/ipfs/QmQbfg1XbWgsvC8cNpkPiodEXimXXjvLK2kDZHkLDWAGfa' />
      </div>
      <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
        <div className='flex-1'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center mt-2'>
              <div>
                <img
                  className='inline-block h-9 w-9 rounded-full'
                  src='/images/default_avatar.png'
                  alt=''
                />
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900'>
                  Creator
                </p>
                <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700'>
                  {shortifyAddress(item.creator)}
                </p>
              </div>
            </div>
            <p className='text-sm font-medium text-indigo-600'>Creatures NFT</p>
          </div>
          <div className='block mt-2'>
            <p className='text-xl font-semibold text-gray-900'>
              {item.meta.name}
            </p>
            <p className='mt-3 mb-3 text-base text-gray-500'>
              {item.meta.description}
            </p>
          </div>
        </div>
        <div className='overflow-hidden mb-4'>
          <dl className='-mx-4 -mt-4 flex flex-wrap'>
            <div className='flex flex-col px-4 pt-4'>
              <dt className='order-2 text-sm font-medium text-gray-500'>
                Price
              </dt>
              <dd className='order-1 text-xl font-extrabold text-indigo-600'>
                <div className='flex justify-center items-center'>
                  {item.price}
                  <img
                    className='h-6'
                    src='/images/small-eth.webp'
                    alt='ether icon'
                  />
                </div>
              </dd>
            </div>
            {item.meta.attributes.map((attribute) => (
              <div
                key={attribute.trait_type}
                className='flex flex-col px-4 pt-4'
              >
                <dt className='order-2 text-sm font-medium text-gray-500'>
                  {attribute.trait_type}
                </dt>
                <dd className='order-1 text-xl font-extrabold text-indigo-600'>
                  {attribute.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <button
            onClick={() => {
              buyNft(item.tokenId, item.price);
            }}
            type='button'
            className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Buy
          </button>
          {/* <button
            type='button'
            className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            Preview
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NftItem;
