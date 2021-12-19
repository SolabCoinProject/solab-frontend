import Image from 'next/image';
import Link from 'next/link';

import { FaTelegramPlane } from 'react-icons/fa';
import { AiFillFacebook } from 'react-icons/ai';
import { BsTwitter, BsYoutube, BsMedium } from 'react-icons/bs';
import logo from '../../../assets/images/logo.svg';
import routes from '../../../config/routes';

const Footer: React.FC = () => {
    const companyItems = [
        {
            href: routes.app.home,
            content: 'About us',
            isComingSoon: false,
        },
        {
            href: '/Whitepaper.pdf',
            content: 'Whitepaper',
            isComingSoon: false,
        },
        {
            href: routes.app.projects,
            content: 'Apply for IDO',
            isComingSoon: true,
        },
    ];
    return (
        <div className='footer mt-32'>
            <footer
                className='bg-solabGray-300 bg-no-repeat bg-left bg-image-earth'
                style={{
                    backgroundSize: 'auto 100%',
                }}
            >
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='flex items-center justify-between py-16 border-b border-solabGray-50'>
                        <div>
                            <p className='font-bold'>
                                Subscribe to our community updates
                            </p>
                            <p className='text-solabGray-100'>
                                Stay up to date with all our launchpads and
                                other updates by subscribing to our mailing
                                list.
                            </p>
                        </div>
                        <div>
                            <form className='relative'>
                                <input className='border border-solabGray-50 bg-solabGray-300 rounded py-5 w-96 focus:border-solabCyan-500 focus:ring-solabCyan-500 focus-visible:border-solabCyan-500 focus-visible:ring-solabCyan-500' />
                                <button
                                    className='py-3 px-4 bg-solabCyan-500 rounded-lg absolute right-2 top-1/2'
                                    style={{
                                        transform: 'translateY(-50%)',
                                    }}
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-5 py-16'>
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
                            <p className='text-base font-bold mt-4 lg:mt-0 text-solabWhite-500'>
                                Company
                            </p>
                            <ul className='mt-0 lg:mt-4'>
                                {companyItems.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href}>
                                            <a className='text-solabGray-100 text-sm'>
                                                {item.content}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className='text-base font-bold mt-4 lg:mt-0'>
                                Help
                            </p>
                            <ul className='mt-0 lg:mt-4'>
                                <li>
                                    <Link href='http://docs.solab.finance'>
                                        <a
                                            className='text-sm text-solabGray-100'
                                            target='_blank'
                                        >
                                            Documentation
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='https://docs.solab.finance/terms-and-conditions'>
                                        <a className='text-sm text-solabGray-100'>
                                            Term & Conditions
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='https://docs.solab.finance/privacy-policy'>
                                        <a className='text-sm text-solabGray-100'>
                                            Privacy Policy
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#'>
                                        <a className='text-sm text-solabGray-100'>
                                            Contact us
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className='text-base font-bold mt-4 lg:mt-0'>
                                Features
                            </p>
                            <ul className='mt-0 lg:mt-4'>
                                <li>
                                    <Link href='http://docs.solab.finance'>
                                        <a
                                            className='text-sm text-solabGray-100'
                                            target='_blank'
                                        >
                                            Stake
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#'>
                                        <a className='text-sm text-solabGray-100'>
                                            Projects
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#'>
                                        <a className='text-sm text-solabGray-100'>
                                            NFT Marketplace
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#'>
                                        <a className='text-sm text-solabGray-100'>
                                            Contact us
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className='flex gap-4 justify-center items-center'>
                            <Link href='https://t.me/solabcommunity'>
                                <a className='p-1 border border-solabGray-50'>
                                    <FaTelegramPlane size='24px' />
                                </a>
                            </Link>
                            <Link href='https://www.facebook.com/SolabFinance/'>
                                <a className='p-1 border border-solabGray-50'>
                                    <AiFillFacebook size='24px' />
                                </a>
                            </Link>
                            <Link href='https://twitter.com/solablaunchpad'>
                                <a className='p-1 border border-solabGray-50'>
                                    <BsTwitter size='24px' />
                                </a>
                            </Link>
                            <Link href='https://www.youtube.com/channel/UCr3Na0s-WMzOqfN9rL0TP-A'>
                                <a className='p-1 border border-solabGray-50'>
                                    <BsYoutube size='24px' />
                                </a>
                            </Link>
                            <Link href='https://medium.com/@solabfinance'>
                                <a className='p-1 border border-solabGray-50'>
                                    <BsMedium size='24px' />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
            <div className='py-4'>
                <p className='text-xs text-solabGray-100 text-center'>
                    Copyright © 2021 Solab Finance{' '}
                </p>
            </div>
        </div>
    );
};

export default Footer;
