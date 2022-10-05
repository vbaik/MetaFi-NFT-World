import { FunctionComponent } from 'react';
import { Nft } from '../../../../types/nft';
import { LoadNft3dObject } from '@ui/threejs/utils';
import { shortifyAddress } from '@ui/utils';

type NftItemProps = {
  item: Nft;
  buyNft: (token: number, value: number) => Promise<void>;
};

const NftItem: FunctionComponent<NftItemProps> = ({ item, buyNft }) => {
  return (
    <div>
      <div className='flex-shrink-0'>
        <LoadNft3dObject url={item.meta.image} />
      </div>
      <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-700 group-hover:text-gray-900 inline'>
            {`Creator:  `}
          </p>
          <p className='text-xs font-medium text-gray-500 group-hover:text-gray-700 inline'>
            {shortifyAddress(item.creator)}
          </p>

          <div className='block mt-2'>
            <p className='text-xl font-semibold text-gray-900'>
              {item.meta.name}
            </p>
            <p className='mt-3 mb-3 text-base text-gray-500'>
              {item.meta.description}
            </p>
          </div>
        </div>
        <div>
          <div className='flex justify-between'>
            <p className='text-xl font-extrabold text-indigo-600'>
              {`${item.price} CET`}
            </p>
            <button
              onClick={() => {
                buyNft(item.tokenId, item.price);
              }}
              type='button'
              className='disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed mr-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Buy
            </button>
          </div>
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
