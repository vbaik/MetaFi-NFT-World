import { FunctionComponent } from 'react';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { shortifyAddress } from '@ui/utils';

type WalletbarProps = {
  isLoading: boolean;
  isInstalled: boolean;
  account: string | undefined;
  connect: () => void; //function returns nothing
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Walletbar: FunctionComponent<WalletbarProps> = ({
  isInstalled,
  isLoading,
  connect,
  account,
}) => {
  if (isLoading) {
    return (
      <div>
        <button
          onClick={() => {}}
          type='button'
          className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Loading ...
        </button>
      </div>
    );
  }

  if (account) {
    return (
      <Menu as='div' className='ml-3 relative'>
        <div>
          <Menu.Button className='inline-flex w-full justify-center rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            {shortifyAddress(account)}
          </Menu.Button>
        </div>

        <Menu.Items className='z-10 origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg py-1 bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <Menu.Item>
            {({ active }) => (
              <Link href='/profile'>
                <a
                  className={classNames(
                    active ? 'bg-gray-100 ' : '',
                    'block px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:underline hover:underline-offset-4'
                  )}
                >
                  Profile
                </a>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link href='/my-room'>
                <a
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 hover:text-amber-600 hover:underline hover:underline-offset-4'
                  )}
                >
                  My Room
                </a>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    );
  }

  if (isInstalled) {
    return (
      <div>
        <button
          onClick={() => {
            connect();
          }}
          type='button'
          className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Connect Wallet
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => {
            window.open('https://metamask.io', '_ blank');
          }}
          type='button'
          className='inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Install MetaMask
        </button>
      </div>
    );
  }
};

export default Walletbar;
