/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';

import { FaTimes, FaBars } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { SiDatabricks } from 'react-icons/si';
import { RiAccountCircleLine } from 'react-icons/ri';
import { BsShop } from 'react-icons/bs';

import logo from '../../../assets/images/logo.svg';
import { useAppSelector } from '../../../app/hooks';
import routes from '../../../config/routes';
import { appHeaderOptions } from '../../../features/layout/types';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { GiToken } from 'react-icons/gi';

const headerItems = [
    {
        href: routes.app.home,
        content: 'Home',
        option: appHeaderOptions.home,
        isComingSoon: false,
        icon: (
            <AiOutlineHome className='flex-shrink-0 h-6 w-6 text-solabWhite-500' />
        ),
    },
    {
        href: routes.app.idoSolab,
        content: 'IDO SOLAB',
        option: appHeaderOptions.idoSolab,
        isComingSoon: false,
        icon: <GiToken className='flex-shrink-0 h-6 w-6 text-solabWhite-500' />,
    },
    {
        href: routes.app.stake,
        content: 'Stake',
        option: appHeaderOptions.stake,
        isComingSoon: true,
        icon: (
            <SiDatabricks className='flex-shrink-0 h-6 w-6 text-solabWhite-500' />
        ),
    },
    {
        href: routes.app.projects,
        content: 'Projects',
        option: appHeaderOptions.projects,
        isComingSoon: true,
        icon: (
            <AiOutlineFundProjectionScreen className='flex-shrink-0 h-6 w-6 text-solabWhite-500' />
        ),
    },
    {
        href: routes.app.marketplace,
        content: 'Marketplace',
        option: appHeaderOptions.marketplace,
        isComingSoon: true,
        icon: <BsShop className='flex-shrink-0 h-6 w-6 text-solabWhite-500' />,
    },
];

const headerItemsRight = [
    {
        href: routes.app.myAccount,
        content: 'Account',
        option: appHeaderOptions.myAccount,
        isComingSoon: false,
        icon: (
            <RiAccountCircleLine className='flex-shrink-0 h-6 w-6 text-solabWhite-500' />
        ),
    },
];

const Header: React.FC = () => {
    const activeHeader = useAppSelector(
        (state) => state.layout.app.activeHeaderItem
    );
    return (
        <Popover className='sticky top-0 bg-solabGray-300 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6'>
                <div className='flex items-center py-4 lg:justify-start justify-between md:space-x-4'>
                    <div className='flex justify-start'>
                        <Link href={`${routes.app.home}`}>
                            <a className='leading-none'>
                                <span className='sr-only'>Solab</span>
                                <Image
                                    src={logo}
                                    alt='Solab logo'
                                    className='h-8 w-auto sm:h-10'
                                />
                            </a>
                        </Link>
                    </div>
                    <div className='-mr-2 -my-2 lg:hidden'>
                        <Popover.Button className='inline-flex items-center justify-center text-solabWhite-500'>
                            <span className='sr-only'>Open menu</span>
                            <FaBars className='h-6 w-6' />
                        </Popover.Button>
                    </div>
                    <Popover.Group
                        as='nav'
                        className='hidden lg:flex space-x-10'
                    >
                        {headerItems.map((item, index) => (
                            <Link href={item.href}>
                                <a className='relative'>
                                    <div
                                        className={`font-bold mt-1 ${
                                            item.option === activeHeader
                                                ? 'text-solabWhite-500'
                                                : 'text-solabGray-100'
                                        } ${
                                            item.isComingSoon
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'text-gradient-1-on-hover'
                                        }`}
                                    >
                                        {item.content}
                                        {item.option === activeHeader ? (
                                            <hr className='gradient-background-1 mt-1 py-px border-0' />
                                        ) : null}
                                    </div>
                                    {item.isComingSoon ? (
                                        <span className='absolute text-xxs w-max text-gradient-1 -top-1.5 left-full cursor-not-allowed'>
                                            Coming soon
                                        </span>
                                    ) : null}
                                </a>
                            </Link>
                        ))}
                    </Popover.Group>
                    <div className='hidden lg:flex items-center justify-end md:flex-1 lg:w-0'>
                        {/* <button className='btn btn-pink'>
                            Connect to wallet
                        </button> */}
                        <div className='mr-10'>
                            {headerItemsRight.map((item, index) => (
                                <Link href={item.href}>
                                    <a className='relative'>
                                        <div
                                            className={`font-bold mt-1 ${
                                                item.option === activeHeader
                                                    ? 'text-solabWhite-500'
                                                    : 'text-solabGray-100'
                                            } ${
                                                item.isComingSoon
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'text-gradient-1-on-hover'
                                            }`}
                                        >
                                            {item.content}
                                            {item.option === activeHeader ? (
                                                <hr className='gradient-background-1 mt-1 py-px border-0' />
                                            ) : null}
                                        </div>
                                        {item.isComingSoon ? (
                                            <span className='absolute text-xxs w-max text-gradient-1 -top-1.5 left-full cursor-not-allowed'>
                                                Coming soon
                                            </span>
                                        ) : null}
                                    </a>
                                </Link>
                            ))}
                        </div>
                        <WalletMultiButton />
                    </div>
                </div>
            </div>
            <Transition
                as={Fragment}
                enter='duration-200 ease-out'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='duration-100 ease-in'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
            >
                <Popover.Panel
                    focus
                    className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden'
                >
                    <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-solabGray-300 divide-y-2 divide-gray-50'>
                        <div className='pt-5 pb-6 px-5'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <Image
                                        src={logo}
                                        alt='Solab logo'
                                        className='h-8 w-auto sm:h-10'
                                    />
                                </div>
                                <div className='-mr-2'>
                                    <Popover.Button className='bg-white p-2 inline-flex items-center justify-center group'>
                                        <span className='sr-only'>
                                            Close menu
                                        </span>
                                        <FaTimes className='h-6 w-6 text-white-500' />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <nav className='grid gap-y-8'>
                                    {headerItems.map((item, index) => (
                                        <Link href={item.href} key={index}>
                                            <a
                                                className={`w-min mx-auto ${
                                                    item.isComingSoon
                                                        ? 'cursor-not-allowed'
                                                        : ''
                                                }`}
                                            >
                                                <div
                                                    className={`-m-3 p-3 flex items-center justify-center rounded-md group text-center ${
                                                        item.isComingSoon
                                                            ? 'opacity-50 pointer-events-none'
                                                            : null
                                                    }`}
                                                >
                                                    {item.icon}
                                                    <span className='ml-3 text-base font-medium text-solabWhite-500 relative'>
                                                        {item.content}
                                                        {item.isComingSoon ? (
                                                            <span className='absolute text-xxs w-max text-gradient-1 top-0 left-full cursor-not-allowed'>
                                                                Coming soon
                                                            </span>
                                                        ) : null}
                                                    </span>
                                                </div>
                                                {item.option ===
                                                activeHeader ? (
                                                    <hr className='gradient-background-1 mt-1 py-px border-0' />
                                                ) : null}
                                            </a>
                                        </Link>
                                    ))}
                                    <div>
                                        <WalletMultiButton className='w-1/2 mx-auto justify-center' />
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    );
};

export default Header;
