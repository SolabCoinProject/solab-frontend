/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';

import { FaTimes, FaBars } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { SiDatabricks } from 'react-icons/si';

import logo from '../../../assets/images/logo.svg';
import { useAppSelector } from '../../../app/hooks';
import routes from '../../../config/routes';
import { appHeaderOptions } from '../../../features/layout/types';

const Header: React.FC = () => {
    const activeHeader = useAppSelector(
        (state) => state.layout.app.activeHeaderItem
    );
    const headerItems = [
        {
            href: routes.app.home,
            content: 'HOME',
            option: appHeaderOptions.home,
            isComingSoon: false,
            icon: (
                <AiOutlineHome className='flex-shrink-0 h-6 w-6 text-white-500 group-hover:text-pink-300' />
            ),
        },
        {
            href: routes.app.stake,
            content: 'STAKE',
            option: appHeaderOptions.stake,
            isComingSoon: false,
            icon: (
                <SiDatabricks className='flex-shrink-0 h-6 w-6 text-white-500 group-hover:text-pink-300' />
            ),
        },
        {
            href: routes.app.projects,
            content: 'PROJECTS',
            option: appHeaderOptions.projects,
            isComingSoon: true,
            icon: (
                <AiOutlineFundProjectionScreen className='flex-shrink-0 h-6 w-6 text-white-500 group-hover:text-pink-300' />
            ),
        },
    ];
    return (
        <Popover className='sticky top-0 bg-blue-500 z-50'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='flex justify-between items-center py-4 md:justify-start md:space-x-10'>
                    <div className='flex justify-start lg:w-0 lg:flex-1'>
                        <Link href='#'>
                            <a href='#'>
                                <span className='sr-only'>Solab</span>
                                <Image
                                    src={logo}
                                    alt='Solab logo'
                                    className='h-8 w-auto sm:h-10'
                                />
                            </a>
                        </Link>
                    </div>
                    <div className='-mr-2 -my-2 md:hidden'>
                        <Popover.Button className='gradient-background-1 rounded-md p-2 inline-flex items-center justify-center text-white-500 hover:text-pink-500'>
                            <span className='sr-only'>Open menu</span>
                            <FaBars className='h-6 w-6' />
                        </Popover.Button>
                    </div>
                    <Popover.Group
                        as='nav'
                        className='hidden md:flex space-x-10'
                    >
                        {headerItems.map((item, index) => (
                            <div className='relative' key={index}>
                                <Link href={item.href}>
                                    <a
                                        className={`text-tiny font-bold text-white-500 hover:text-pink-500 ${
                                            item.option === activeHeader
                                                ? 'border-b-4 border-pink-500 '
                                                : null
                                        } ${
                                            item.isComingSoon
                                                ? 'opacity-50 pointer-events-none'
                                                : null
                                        }`}
                                    >
                                        {item.content}
                                    </a>
                                </Link>
                                {item.isComingSoon ? (
                                    <span className='absolute text-xxs w-max bg-white-500 text-pink-500 rounded-sm px-1 ml-1'>
                                        Coming soon
                                    </span>
                                ) : null}
                            </div>
                        ))}
                    </Popover.Group>
                    <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0'>
                        <button className='btn btn-pink'>
                            Connect to wallet
                        </button>
                    </div>
                </div>
            </div>
            <hr className='p-px gradient-background-1' />

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
                    className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
                >
                    <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-blue-500 divide-y-2 divide-gray-50'>
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
                                        <FaTimes className='h-6 w-6 text-white-500 group-hover:text-pink-500' />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className='mt-6'>
                                <nav className='grid gap-y-8'>
                                    {headerItems.map((item, index) => (
                                        <Link href={item.href} key={index}>
                                            <a
                                                className={`-m-3 p-3 flex items-center justify-center rounded-md group hover:bg-blue-500 text-center ${
                                                    item.isComingSoon
                                                        ? 'opacity-50 pointer-events-none'
                                                        : null
                                                }`}
                                            >
                                                {item.icon}
                                                <span className='ml-3 text-base font-medium text-white-500 group-hover:text-pink-300 relative'>
                                                    {item.content}
                                                    {item.isComingSoon ? (
                                                        <span className='absolute text-xxs w-max bg-white-500 text-pink-500 rounded-sm px-1 ml-1'>
                                                            Coming soon
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </a>
                                        </Link>
                                    ))}
                                    <button className='btn btn-pink'>
                                        Connect to wallet
                                    </button>
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
