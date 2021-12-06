import { useState } from 'react';
import Image from 'next/image';

import HorizontalTimeline from 'react-horizontal-timeline';
import { format, parseISO } from 'date-fns';

import Container from '../../components/app/layout/Container';

import banner from '../../assets/images/banner.gif';
import sampleTokenLogo from '../../assets/images/sample-token-logo.png';

const demoTimeLine = [
    {
        date: '2021-12-24',
        headline: 'Airdrop + whitelist lottery registration opens',
        content: [
            'On the 24th of Dec at 12PM (UTC) the Solab whitelist went live. You can register yourself for the public sale as well as for the airdrop.',
        ],
    },
    {
        date: '2022-01-01',
        headline: 'Public sale for lottery winners',
        content: [
            'This article contains instructions for lucky lottery winners on how to participate in the public sale on solanium.io.',
        ],
    },
    {
        date: '2022-01-07',
        headline: 'Airdrop + Public sale token distribution',
        content: [],
    },
    {
        date: '2022-01-31',
        headline: 'SLIM trading now live on Raydium',
        content: [
            'We have added liquidity on Raydium and the SOLAB token is now trade-able through the swapping interface!',
        ],
    },
    {
        date: '2022-02-15',
        headline: 'Solanium Staking live',
        content: [
            'Optimized non-fungible token exchange mechanism and registry table resolution.',
            'Updated the Python library for blockchain interoperability Researched and tested on-chain randomness generation.',
        ],
    },
];

const HomePage: React.FC = () => {
    const [timeLineIndex, setTimeLineIndex] = useState<number>(0);
    return (
        <Container>
            <div className='mt-20'>
                <div className='max-w-7xl mx-auto px-4'>
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
                        </div>
                        <div className='text-center hidden lg:block'>
                            <Image src={banner} className='mx-auto' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-12 bg-blue-300 p-4'>
                <div className='max-w-7xl mx-auto'>
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
                <div className='max-w-7xl mx-auto'>
                    <h1 className='title  text-center'>
                        Live & Upcoming Projects
                    </h1>
                    <p className='text-center'>Circulating Supply Locked</p>
                    <div className='grid grid-cols-1 lg:grid-cols-2 mt-12 gap-8'>
                        <div className='rounded-lg border-2 border-cyan-500 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
                                        A trading terminal for crypto exchanges
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
                                            <span className='ml-1'>TTT</span>
                                        </div>
                                        <div>
                                            <p className='text-sm'>Followers</p>
                                            <p className='text-xl'>53,241</p>
                                        </div>
                                    </div>
                                    <button className='btn btn-gradient mt-2.5'>
                                        More details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-lg border-2 border-cyan-500 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
                                        A trading terminal for crypto exchanges
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
                                            <span className='ml-1'>TTT</span>
                                        </div>
                                        <div>
                                            <p className='text-sm'>Followers</p>
                                            <p className='text-xl'>53,241</p>
                                        </div>
                                    </div>
                                    <button className='btn btn-gradient mt-2.5'>
                                        More details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-lg border-2 border-cyan-500 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
                                        A trading terminal for crypto exchanges
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
                                            <span className='ml-1'>TTT</span>
                                        </div>
                                        <div>
                                            <p className='text-sm'>Followers</p>
                                            <p className='text-xl'>53,241</p>
                                        </div>
                                    </div>
                                    <button className='btn btn-gradient mt-2.5'>
                                        More details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-lg border-2 border-cyan-500 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
                                        A trading terminal for crypto exchanges
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
                                            <span className='ml-1'>TTT</span>
                                        </div>
                                        <div>
                                            <p className='text-sm'>Followers</p>
                                            <p className='text-xl'>53,241</p>
                                        </div>
                                    </div>
                                    <button className='btn btn-gradient mt-2.5'>
                                        More details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-lg border-2 border-cyan-500 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
                                        A trading terminal for crypto exchanges
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
                                            <span className='ml-1'>TTT</span>
                                        </div>
                                        <div>
                                            <p className='text-sm'>Followers</p>
                                            <p className='text-xl'>53,241</p>
                                        </div>
                                    </div>
                                    <button className='btn btn-gradient mt-2.5'>
                                        More details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-lg border-2 border-cyan-500 p-2.5 grid grid-cols-1 lg:grid-cols-2 gap-8'>
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
                                        A trading terminal for crypto exchanges
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
                                            <span className='ml-1'>TTT</span>
                                        </div>
                                        <div>
                                            <p className='text-sm'>Followers</p>
                                            <p className='text-xl'>53,241</p>
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
            <div className='mt-12 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='title text-center'>ROADMAP</h1>
                    <div className='mx-auto w-2/4 border-2 border-pink-500 rounded-lg p-4 mt-24'>
                        <h2 className='title-2 text-cyan-500'>
                            {format(
                                parseISO(demoTimeLine[timeLineIndex]['date']),
                                'dd MMMM, yyyy'
                            )}
                        </h2>
                        <h3 className='text-tiny font-bold'>
                            {demoTimeLine[timeLineIndex]['headline']}
                        </h3>
                        <ul>
                            {demoTimeLine[timeLineIndex]['content'].map(
                                (item) => (
                                    <li className='text-sm'>{item}</li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className='h-28 mx-auto text-sm mt-8'>
                        <HorizontalTimeline
                            styles={{
                                background: '#000612',
                                foreground: '#FF50CE',
                                outline: '#1EE8BB',
                                // color: 'white',
                            }}
                            minEventPadding={60}
                            index={timeLineIndex}
                            indexClick={(index: number) => {
                                setTimeLineIndex(index);
                            }}
                            values={demoTimeLine.map(({ date }) => date)}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default HomePage;
