/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import ActiveLink from '../link';
import { useAccount, useNetwork } from 'components/hooks/web3';
import Walletbar from './Walletbar';

const navigation = [
  { name: 'NFT Market', href: '/market', current: true },
  { name: 'Mint NFT', href: '/nft/create', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { account } = useAccount();
  const { network } = useNetwork();

  return (
    <Disclosure as='nav' className='bg-transparent'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-screen-lg px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>

              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <ActiveLink
                    href='/'
                    activeClass='bg-transparent-900 text-white'
                  >
                    <img
                      className='hidden lg:block h-10 w-auto'
                      src='/images/NFTWORLD-logo.png'
                      alt='Workflow'
                    />
                  </ActiveLink>
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      //this way, link doesn't auto refresh when clicked so it's much faster.
                      <ActiveLink
                        href={item.href}
                        key={item.name}
                        activeClass='bg-transparent-900 text-white'
                      >
                        <a
                          className='text-slate-800 hover:bg-pink-500 hover:text-white px-3 py-2 rounded-md text-l font-medium'
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </ActiveLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <div className='text-gray-300 self-center mr-2'>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-orange-100 text-slate-800'>
                    <svg
                      className='-ml-0.5 mr-1.5 h-2 w-2 text-pink-400'
                      fill='currentColor'
                      viewBox='0 0 8 8'
                    >
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                    {network.isLoading
                      ? 'Loading...'
                      : account.isInstalled
                      ? network.data
                      : 'Install Web3 Wallet'}
                  </span>
                </div>
                <Walletbar
                  isInstalled={account.isInstalled}
                  isLoading={account.isLoading}
                  connect={account.connect}
                  account={account.data}
                />
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
