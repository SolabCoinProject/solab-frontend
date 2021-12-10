import Image from 'next/image';
import Link from 'next/link';

import { FaTelegramPlane } from 'react-icons/fa';
import { AiFillFacebook } from 'react-icons/ai';
import { BsTwitter, BsYoutube } from 'react-icons/bs';
import logo from '../../../assets/images/logo.svg';
import routes from '../../../config/routes';

const Footer: React.FC = () => {
    const companyItems = [
        {
            href: routes.app.home,
            content: 'Home',
            isComingSoon: false,
        },
        {
            href: routes.app.stake,
            content: 'Stake',
            isComingSoon: false,
        },
        {
            href: routes.app.projects,
            content: 'Projects',
            isComingSoon: true,
        },
    ];
    return (
        <div className='footer'>
            <hr className='p-px gradient-background-1' />
            <footer className='py-14'>
                <div className='max-w-6xl mx-auto px-4'>
                    <div className='grid grid-cols-1 lg:grid-cols-4'>
                        <div className='flex flex-col justify-between'>
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
                        <div>
                            <p className='text-sm font-bold mt-4 lg:mt-0'>
                                COMPANY
                            </p>
                            <ul className='mt-0 lg:mt-4'>
                                {companyItems.map((item) => (
                                    <li>
                                        <Link href={item.href}>
                                            <a
                                                className={`text-sm ${
                                                    item.isComingSoon
                                                        ? 'opacity-50 pointer-events-none'
                                                        : 'opacity-80'
                                                }`}
                                            >
                                                {item.content}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className='text-sm font-bold mt-4 lg:mt-0'>
                                RESOURCES
                            </p>
                            <ul className='mt-0 lg:mt-4'>
                                <li>
                                    <Link href='http://docs.solab.finance'>
                                        <a
                                            className='text-sm opacity-80'
                                            target='_blank'
                                        >
                                            Documentation
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#'>
                                        <a className='text-sm opacity-80'>
                                            Support
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className='text-sm font-bold mt-4 lg:mt-0'>
                                SUBSCRIBE TO OUR COMMUNITY UPDATES
                            </p>
                            <form className='mt-4'>
                                <input
                                    className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                    type='text'
                                    placeholder='Enter your email'
                                />
                                <button className='btn btn-pink'>
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
            <hr className='p-px gradient-background-1' />
            <div className='py-4'>
                <div className='max-w-6xl mx-auto px-4 flex justify-between'>
                    <Link href='#'>
                        <a className='opacity-80'>Terms & Condition</a>
                    </Link>
                    <p className='text-sm opacity-80'>
                        Copyright © 2021 Solab Finance{' '}
                    </p>
                    <div className='flex'>
                        <Link href='#'>
                            <a>
                                <FaTelegramPlane size='24px' />
                            </a>
                        </Link>
                        <Link href='#'>
                            <a>
                                <AiFillFacebook size='24px' className='ml-2' />
                            </a>
                        </Link>

                        <Link href='#'>
                            <a>
                                <BsTwitter size='24px' className='ml-2' />
                            </a>
                        </Link>
                        <Link href='#'>
                            <a>
                                <BsYoutube size='24px' className='ml-2' />
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
