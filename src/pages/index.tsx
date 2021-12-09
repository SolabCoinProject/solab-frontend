import type { NextPage } from 'next';
import Container from '../components/app/layout/Container';
import Link from 'next/link';
import Image from 'next/image';
import { FaTelegramPlane } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import banner from '../assets/images/banner.gif';
import sampleTokenLogo from '../assets/images/sample-token-logo.png';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { useAppDispatch } from '../app/hooks';
import {
    appHeaderOptions,
    updateActiveHeaderItem,
} from '../features/layout/layoutSlice';
import { useEffect } from 'react';

const Home: NextPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateActiveHeaderItem(appHeaderOptions.home));
    }, [dispatch]);
    return (
        <Container>
            <div className='mt-20'>
                <div className='max-w-6xl mx-auto px-4'>
                    <div className='grid lg:grid-cols-2 auto-cols-fr'>
                        <div>
                            <h1 className='title '>
                                Fundraising platform on Solana
                            </h1>
                            <p className=' text-base'>
                                Solanium is the go-to platform for the Solana
                                blockchain. Invest in the hottest Solana
                                projects, stake your tokens, trade on our DEX,
                                manage your Solana wallet and participate in our
                                (future) governance.
                            </p>
                            <button className='btn btn-lg btn-gradient mt-3 mr-4'>
                                Buy on Solab
                            </button>
                            <button className='btn btn-lg btn-gradient mt-3'>
                                Stake
                            </button>
                            <div className='mt-11 flex'>
                                <Link href='#'>
                                    <a className='flex items-center group'>
                                        <FaTelegramPlane className='text-2xl text-blue-light' />
                                        <span className='ml-2 group-hover:text-blue-light'>
                                            Join us on Telegram
                                        </span>
                                    </a>
                                </Link>
                                <Link href='#'>
                                    <a className='flex items-center ml-2 group'>
                                        <BsTwitter className='text-2xl text-blue-light' />
                                        <span className='ml-2 group-hover:text-blue-light'>
                                            Follow our Twitter
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className='text-center hidden lg:block'>
                            <Image src={banner} className='mx-auto' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-12 bg-blue-300 p-4'>
                <div className='max-w-6xl mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-3 auto-rows-fr'>
                        <div className='text-center'>
                            <h1 className='text-cyan-500 title'>$16.2B</h1>
                            <p className='text-sm'>TOTAL VALUE STAKED</p>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-cyan-500 title'>27,262,938</h1>
                            <p className='text-sm'>SOLAB STAKED</p>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-cyan-500 title'>25%</h1>
                            <p className='text-sm'>AVERAGE APY</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-12 px-4 bg-image bg-image-1'>
                <div className='max-w-6xl mx-auto'>
                    <h1 className='title  text-center'>
                        Live & Upcoming Projects
                    </h1>
                    <p className='text-center'>Circulating Supply Locked</p>
                    <div className='grid grid-cols-1 lg:grid-cols-2 mt-12 gap-8'>
                        <div className='gradient-background-1 rounded-lg p-px flex items-center'>
                            <div className='rounded-lg bg-blue-900 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto'>
                                <div
                                    className='relative bg-image rounded-lg w-full h-60 lg:h-auto'
                                    style={{
                                        backgroundImage: `url('/sample-project-thumbnail.png')`,
                                    }}
                                >
                                    <span className='bg-pink-500 rounded-lg p-0.5 font-sm absolute top-1 right-1'>
                                        1 day until whitelist ends
                                    </span>
                                </div>
                                <div className='flex flex-col justify-between mt-3'>
                                    <div>
                                        <h2 className='title-2'>TabTrader</h2>
                                        <h2 className='text-sm'>
                                            A trading terminal for crypto
                                            exchanges
                                        </h2>
                                    </div>
                                    <div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex items-center justify-center'>
                                                <Image
                                                    src={sampleTokenLogo}
                                                    width={32}
                                                    height={32}
                                                />
                                                <span className='ml-1'>
                                                    TTT
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-sm'>
                                                    Followers
                                                </p>
                                                <p className='text-xl'>
                                                    53,241
                                                </p>
                                            </div>
                                        </div>
                                        <button className='btn btn-gradient mt-2.5'>
                                            More details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-background-1 rounded-lg p-px flex items-center'>
                            <div className='rounded-lg bg-blue-900 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto'>
                                <div
                                    className='relative bg-image rounded-lg w-full h-60 lg:h-auto'
                                    style={{
                                        backgroundImage: `url('/sample-project-thumbnail.png')`,
                                    }}
                                >
                                    <span className='bg-pink-500 rounded-lg p-0.5 font-sm absolute top-1 right-1'>
                                        1 day until whitelist ends
                                    </span>
                                </div>
                                <div className='flex flex-col justify-between mt-3'>
                                    <div>
                                        <h2 className='title-2'>TabTrader</h2>
                                        <h2 className='text-sm'>
                                            A trading terminal for crypto
                                            exchanges
                                        </h2>
                                    </div>
                                    <div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex items-center justify-center'>
                                                <Image
                                                    src={sampleTokenLogo}
                                                    width={32}
                                                    height={32}
                                                />
                                                <span className='ml-1'>
                                                    TTT
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-sm'>
                                                    Followers
                                                </p>
                                                <p className='text-xl'>
                                                    53,241
                                                </p>
                                            </div>
                                        </div>
                                        <button className='btn btn-gradient mt-2.5'>
                                            More details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-background-1 rounded-lg p-px flex items-center'>
                            <div className='rounded-lg bg-blue-900 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto'>
                                <div
                                    className='relative bg-image rounded-lg w-full h-60 lg:h-auto'
                                    style={{
                                        backgroundImage: `url('/sample-project-thumbnail.png')`,
                                    }}
                                >
                                    <span className='bg-pink-500 rounded-lg p-0.5 font-sm absolute top-1 right-1'>
                                        1 day until whitelist ends
                                    </span>
                                </div>
                                <div className='flex flex-col justify-between mt-3'>
                                    <div>
                                        <h2 className='title-2'>TabTrader</h2>
                                        <h2 className='text-sm'>
                                            A trading terminal for crypto
                                            exchanges
                                        </h2>
                                    </div>
                                    <div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex items-center justify-center'>
                                                <Image
                                                    src={sampleTokenLogo}
                                                    width={32}
                                                    height={32}
                                                />
                                                <span className='ml-1'>
                                                    TTT
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-sm'>
                                                    Followers
                                                </p>
                                                <p className='text-xl'>
                                                    53,241
                                                </p>
                                            </div>
                                        </div>
                                        <button className='btn btn-gradient mt-2.5'>
                                            More details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-background-1 rounded-lg p-px flex items-center'>
                            <div className='rounded-lg bg-blue-900 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto'>
                                <div
                                    className='relative bg-image rounded-lg w-full h-60 lg:h-auto'
                                    style={{
                                        backgroundImage: `url('/sample-project-thumbnail.png')`,
                                    }}
                                >
                                    <span className='bg-pink-500 rounded-lg p-0.5 font-sm absolute top-1 right-1'>
                                        1 day until whitelist ends
                                    </span>
                                </div>
                                <div className='flex flex-col justify-between mt-3'>
                                    <div>
                                        <h2 className='title-2'>TabTrader</h2>
                                        <h2 className='text-sm'>
                                            A trading terminal for crypto
                                            exchanges
                                        </h2>
                                    </div>
                                    <div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex items-center justify-center'>
                                                <Image
                                                    src={sampleTokenLogo}
                                                    width={32}
                                                    height={32}
                                                />
                                                <span className='ml-1'>
                                                    TTT
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-sm'>
                                                    Followers
                                                </p>
                                                <p className='text-xl'>
                                                    53,241
                                                </p>
                                            </div>
                                        </div>
                                        <button className='btn btn-gradient mt-2.5'>
                                            More details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-background-1 rounded-lg p-px flex items-center'>
                            <div className='rounded-lg bg-blue-900 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto'>
                                <div
                                    className='relative bg-image rounded-lg w-full h-60 lg:h-auto'
                                    style={{
                                        backgroundImage: `url('/sample-project-thumbnail.png')`,
                                    }}
                                >
                                    <span className='bg-pink-500 rounded-lg p-0.5 font-sm absolute top-1 right-1'>
                                        1 day until whitelist ends
                                    </span>
                                </div>
                                <div className='flex flex-col justify-between mt-3'>
                                    <div>
                                        <h2 className='title-2'>TabTrader</h2>
                                        <h2 className='text-sm'>
                                            A trading terminal for crypto
                                            exchanges
                                        </h2>
                                    </div>
                                    <div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex items-center justify-center'>
                                                <Image
                                                    src={sampleTokenLogo}
                                                    width={32}
                                                    height={32}
                                                />
                                                <span className='ml-1'>
                                                    TTT
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-sm'>
                                                    Followers
                                                </p>
                                                <p className='text-xl'>
                                                    53,241
                                                </p>
                                            </div>
                                        </div>
                                        <button className='btn btn-gradient mt-2.5'>
                                            More details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='gradient-background-1 rounded-lg p-px flex items-center'>
                            <div className='rounded-lg bg-blue-900 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto'>
                                <div
                                    className='relative bg-image rounded-lg w-full h-60 lg:h-auto'
                                    style={{
                                        backgroundImage: `url('/sample-project-thumbnail.png')`,
                                    }}
                                >
                                    <span className='bg-pink-500 rounded-lg p-0.5 font-sm absolute top-1 right-1'>
                                        1 day until whitelist ends
                                    </span>
                                </div>
                                <div className='flex flex-col justify-between mt-3'>
                                    <div>
                                        <h2 className='title-2'>TabTrader</h2>
                                        <h2 className='text-sm'>
                                            A trading terminal for crypto
                                            exchanges
                                        </h2>
                                    </div>
                                    <div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex items-center justify-center'>
                                                <Image
                                                    src={sampleTokenLogo}
                                                    width={32}
                                                    height={32}
                                                />
                                                <span className='ml-1'>
                                                    TTT
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-sm'>
                                                    Followers
                                                </p>
                                                <p className='text-xl'>
                                                    53,241
                                                </p>
                                            </div>
                                        </div>
                                        <button className='btn btn-gradient mt-2.5'>
                                            More details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-12 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <h1 className='title text-center'>ROADMAP</h1>
                    <div>
                        <VerticalTimeline>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#000639',
                                    color: '#F5F6FA',
                                    border: '2px solid #1EE8BB',
                                }}
                                contentArrowStyle={{
                                    borderRight: '7px solid  #1EE8BB',
                                }}
                                date='24 Dec, 2021'
                                dateClassName='text-cyan-500 p-0'
                                iconClassName='bg-pink-500 text-yellow-500 w-6 h-6'
                            >
                                <h3 className='text-tiny font-bold'>
                                    Airdrop + whitelist lottery registration
                                    opens
                                </h3>
                                <ul>
                                    <li className='text-sm'>
                                        On the 24th of Dec at 12PM (UTC) the
                                        Solab whitelist went live. You can
                                        register yourself for the public sale as
                                        well as for the airdrop.
                                    </li>
                                </ul>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#000639',
                                    color: '#F5F6FA',
                                    border: '2px solid #1EE8BB',
                                }}
                                contentArrowStyle={{
                                    borderRight: '7px solid  #1EE8BB',
                                }}
                                date='1 Jan, 2022'
                                dateClassName='text-cyan-500 p-0'
                                iconClassName='bg-pink-500 text-yellow-500 w-6 h-6'
                            >
                                <h3 className='text-tiny font-bold'>
                                    Public sale for lottery winners
                                </h3>
                                <ul>
                                    <li className='text-sm'>
                                        This article contains instructions for
                                        lucky lottery winners on how to
                                        participate in the public sale on
                                        solanium.io.
                                    </li>
                                </ul>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#000639',
                                    color: '#F5F6FA',
                                    border: '2px solid #1EE8BB',
                                }}
                                contentArrowStyle={{
                                    borderRight: '7px solid  #1EE8BB',
                                }}
                                date='7 Jan, 2022'
                                dateClassName='text-cyan-500 p-0'
                                iconClassName='bg-pink-500 text-yellow-500 w-6 h-6'
                            >
                                <h3 className='text-tiny font-bold'>
                                    Airdrop + Public sale token distribution
                                </h3>
                                <ul></ul>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#000639',
                                    color: '#F5F6FA',
                                    border: '2px solid #1EE8BB',
                                }}
                                contentArrowStyle={{
                                    borderRight: '7px solid  #1EE8BB',
                                }}
                                date='31 Jan, 2022'
                                dateClassName='text-cyan-500 p-0'
                                iconClassName='bg-pink-500 text-yellow-500 w-6 h-6'
                            >
                                <h3 className='text-tiny font-bold'>
                                    SLIM trading now live on Raydium
                                </h3>
                                <ul>
                                    <li className='text-sm'>
                                        We have added liquidity on Raydium and
                                        the SOLAB token is now trade-able
                                        through the swapping interface!
                                    </li>
                                </ul>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#000639',
                                    color: '#F5F6FA',
                                    border: '2px solid #1EE8BB',
                                }}
                                contentArrowStyle={{
                                    borderRight: '7px solid  #1EE8BB',
                                }}
                                date='15 Feb, 2022'
                                dateClassName='text-cyan-500 p-0'
                                iconClassName='bg-pink-500 text-yellow-500 w-6 h-6'
                            >
                                <h3 className='text-tiny font-bold'>
                                    Solanium Staking live
                                </h3>
                                <ul>
                                    <li className='text-sm'>
                                        Optimized non-fungible token exchange
                                        mechanism and registry table resolution.
                                    </li>
                                    <li className='text-sm'>
                                        Updated the Python library for
                                        blockchain interoperability Researched
                                        and tested on-chain randomness
                                        generation.
                                    </li>
                                </ul>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </div>
                </div>
            </div>

            <div className='mt-24 bg-blue-300 px-4'>
                <div className='max-w-6xl mx-auto py-12'>
                    <h1 className='title font-bold text-center'>Tokenomics</h1>
                    <div className='mt-14'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            <div className='p-6 flex flex-col justify-between gradient-background-2 rounded-lg'>
                                <h2 className='title-3'>
                                    Public Sale Token Price
                                </h2>
                                <p className='text-xl mt-12'>
                                    $0.001 (BUSD/USDT)
                                </p>
                            </div>
                            <div className='p-6 flex flex-col justify-between gradient-background-3 rounded-lg'>
                                <h2 className='title-3'>
                                    Maximum Token Supply
                                </h2>
                                <p className='text-xl mt-12'>
                                    $0.001 (BUSD/USDT)
                                </p>
                            </div>
                            <div className='p-6 flex flex-col justify-between gradient-background-3 rounded-lg'>
                                <h2 className='title-3'>
                                    Circulating Supply at Listing
                                </h2>
                                <p className='text-xl mt-12'>
                                    $0.001 (BUSD/USDT)
                                </p>
                            </div>
                            <div className='p-6 flex flex-col justify-between gradient-background-2 rounded-lg'>
                                <h2 className='title-3'>
                                    Public Sale Token Price
                                </h2>
                                <p className='text-xl mt-12'>
                                    $0.001 (BUSD/USDT)
                                </p>
                            </div>
                            <div className='p-6 flex flex-col justify-between gradient-background-3 rounded-lg lg:col-span-2'>
                                <h2 className='title-3 text-center'>
                                    Public Sale Token Price
                                </h2>
                                <div className='px-24 grid grid-cols-1 lg:grid-cols-3'>
                                    <div>
                                        <p className='text-xl text-center'>
                                            Team: 15%
                                        </p>
                                        <p className='text-xl text-center'>
                                            Advisors: 7%
                                        </p>
                                        <p className='text-xl text-center'>
                                            Liquidity: 12%
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-xl text-center'>
                                            Ecosytem: 12%
                                        </p>
                                        <p className='text-xl text-center'>
                                            Reserve: 5%
                                        </p>
                                        <p className='text-xl text-center'>
                                            Staking/Rewards: 14%
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-xl text-center'>
                                            Private sale: 20%
                                        </p>
                                        <p className='text-xl text-center'>
                                            Public sale: 14%
                                        </p>
                                        <p className='text-xl text-center'>
                                            Airdrop: 1%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='p-px gradient-background-1' />
            <div className='mt-24 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <h1 className='title font-bold text-center'>
                        Tiered System
                    </h1>
                    <div className='mt-16 flex justify-center items-center flex-wrap gap-8 text-center'>
                        <div className='lg:w-3/10 w-full py-12 border-2 border-cyan-500 rounded-lg'>
                            <h2 className='title-2 text-cyan-500'>Bronze</h2>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-6' />
                            <p className='mt-5'>Staking Requirement</p>
                            <h2 className='title-2 mt-6'>1000</h2>
                            <p className='mt-6 text-sm'>
                                Staking Length Required
                            </p>
                            <p className='mt-3 font-bold'>
                                3 hours before Allocation Round opens
                            </p>
                            <p className='mt-3 text-sm'>
                                Whitelist Requirement Twitter
                            </p>
                            <p className='mt-3 font-bold'>
                                Like, Comment & Retweet
                            </p>
                            <p className='mt-6 text-sm'>Lottery Tickets</p>
                            <p className='mt-6 font-bold'>1</p>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-12' />
                        </div>
                        <div className='lg:w-3/10 w-full py-12 border-2 border-cyan-500 rounded-lg'>
                            <h2 className='title-2 text-cyan-500'>Silver</h2>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-6' />
                            <p className='mt-5'>Staking Requirement</p>
                            <h2 className='title-2 mt-6'>2500</h2>
                            <p className='mt-6 text-sm'>
                                Staking Length Required
                            </p>
                            <p className='mt-3 font-bold'>
                                3 hours before Allocation Round opens
                            </p>
                            <p className='mt-3 text-sm'>
                                Whitelist Requirement Twitter
                            </p>
                            <p className='mt-3 font-bold'>
                                Like, Comment & Retweet
                            </p>
                            <p className='mt-6 text-sm'>Lottery Tickets</p>
                            <p className='mt-6 font-bold'>3</p>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-12' />
                        </div>
                        <div className='lg:w-3/10 w-full py-12 border-2 border-cyan-500 rounded-lg'>
                            <h2 className='title-2 text-cyan-500'>Gold</h2>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-6' />
                            <p className='mt-5'>Staking Requirement</p>
                            <h2 className='title-2 mt-6'>2500</h2>
                            <p className='mt-6 text-sm'>
                                Staking Length Required
                            </p>
                            <p className='mt-3 font-bold'>
                                3 hours before Allocation Round opens
                            </p>
                            <p className='mt-3 text-sm'>
                                Whitelist Requirement Twitter
                            </p>
                            <p className='mt-3 font-bold'>
                                Like, Comment & Retweet
                            </p>
                            <p className='mt-6 text-sm'>Lottery Tickets</p>
                            <p className='mt-6 font-bold'>5</p>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-12' />
                        </div>
                        <div className='lg:w-3/10 w-full py-12 border-2 border-cyan-500 rounded-lg'>
                            <h2 className='title-2 text-cyan-500'>Platinum</h2>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-6' />
                            <p className='mt-5'>Staking Requirement</p>
                            <h2 className='title-2 mt-6'>7500</h2>
                            <p className='mt-6 text-sm'>
                                Staking Length Required
                            </p>
                            <p className='mt-3 font-bold'>
                                3 hours before Allocation Round opens
                            </p>
                            <p className='mt-3 text-sm'>
                                Whitelist Requirement Twitter
                            </p>
                            <p className='mt-3 font-bold'>
                                Like, Comment & Retweet
                            </p>
                            <p className='mt-6 text-sm'>Lottery Tickets</p>
                            <p className='mt-6 font-bold'>7</p>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-12' />
                        </div>
                        <div className='lg:w-3/10 w-full py-12 border-2 border-cyan-500 rounded-lg'>
                            <h2 className='title-2 text-cyan-500'>Diamond</h2>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-6' />
                            <p className='mt-5'>Staking Requirement</p>
                            <h2 className='title-2 mt-6'>10000</h2>
                            <p className='mt-6 text-sm'>
                                Staking Length Required
                            </p>
                            <p className='mt-3 font-bold'>
                                3 hours before Allocation Round opens
                            </p>
                            <p className='mt-3 text-sm'>
                                Whitelist Requirement Twitter
                            </p>
                            <p className='mt-3 font-bold'>
                                Like, Comment & Retweet
                            </p>
                            <p className='mt-6 text-sm'>Lottery Tickets</p>
                            <p className='mt-6 font-bold'>10</p>
                            <hr className='p-px gradient-background-1 w-1/2 mx-auto mt-12' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-24 bg-image bg-image-2'>
                <div className='max-w-6xl mx-auto py-24 text-center'>
                    <h1 className='title font-bold'>Apply for incubation</h1>
                    <button className='btn btn-gradient btn-lg mt-32'>
                        Apply now
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default Home;
