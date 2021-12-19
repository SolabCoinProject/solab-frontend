import type { NextPage } from 'next';
import Container from '../components/app/layout/Container';
import Link from 'next/link';
// import Image from 'next/image';
import { FaTelegramPlane } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
// import banner from '../assets/images/banner.gif';
// import sampleTokenLogo from '../assets/images/sample-token-logo.png';

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import NumberFormat from 'react-number-format';
import { useAppDispatch } from '../app/hooks';
import { updateActiveHeaderItem } from '../features/layout/layoutSlice';
import { appHeaderOptions } from '../features/layout/types';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { web3 } from '@project-serum/anchor';
// import { PublicKey } from '@solana/web3.js';
// import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
// import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
// import { getOrCreateAssociatedTokenAccount } from '../libs/getOrCreateAssociatedTokenAccount';
// import { createTransferInstruction } from '../libs/createTransferInstructions';
import { Tab } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
SwiperCore.use([Pagination, Autoplay]);

const Home: NextPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateActiveHeaderItem(appHeaderOptions.home));
    }, [dispatch]);
    const { publicKey, sendTransaction, signTransaction } = useWallet();
    const { connection } = useConnection();

    // useEffect(() => {
    //     const testTrans = async (publicKey: web3.PublicKey | null) => {
    //         if (publicKey) {
    //             const secret = new Uint8Array([
    //                 131, 54, 83, 145, 34, 243, 108, 28, 182, 94, 233, 14, 151,
    //                 248, 24, 155, 152, 219, 131, 47, 33, 165, 142, 129, 160,
    //                 172, 87, 128, 248, 136, 242, 222, 12, 229, 171, 71, 117,
    //                 167, 197, 255, 107, 105, 89, 228, 161, 185, 250, 10, 190,
    //                 151, 51, 154, 115, 16, 40, 68, 244, 156, 108, 132, 165, 152,
    //                 161, 250,
    //             ]);
    //             const from = web3.Keypair.fromSecretKey(secret);
    //             const toPub = new web3.PublicKey(
    //                 'HzNpMU4mTrGgAxD8DtrS2bmwVJukUzhsB3hQtUW8H6qt'
    //             );
    //             let transaction = new web3.Transaction().add(
    //                 web3.SystemProgram.transfer({
    //                     fromPubkey: from.publicKey,
    //                     toPubkey: toPub,
    //                     lamports: 100000000,
    //                 })
    //             );
    //             var signature = await web3.sendAndConfirmTransaction(
    //                 connection,
    //                 transaction,
    //                 [from]
    //             );
    //             await connection.confirmTransaction(signature, 'processed');
    //         }
    //     };
    //     testTrans(publicKey);
    // }, [publicKey]);

    // const onClick = useCallback(async () => {
    //     if (!publicKey) throw new WalletNotConnectedError();
    //     const to = new web3.PublicKey(
    //         'sM1kEqVVENecnsRagWDfhjgq3LKceF8hhVmV7HeHRZB'
    //     );

    //     const transaction = new web3.Transaction().add(
    //         web3.SystemProgram.transfer({
    //             fromPubkey: publicKey,
    //             toPubkey: to,
    //             lamports: 100000,
    //         })
    //     );
    //     const signature = await sendTransaction(transaction, connection);
    //     await connection.confirmTransaction(signature, 'processed');
    //     const detail = await connection.getTransaction(signature);
    //     console.log(detail);
    //     const accounts = detail?.transaction.message.accountKeys;
    //     accounts?.map((account) => {
    //         console.log(account.toBase58());
    //     });
    // }, [publicKey, sendTransaction, connection]);
    // const test = new web3.

    // const handleClick = useCallback(async () => {
    //     try {
    //         if (!publicKey || !signTransaction)
    //             throw new WalletNotConnectedError();
    //         const toPub = new web3.PublicKey(
    //             'HzNpMU4mTrGgAxD8DtrS2bmwVJukUzhsB3hQtUW8H6qt'
    //         );
    //         const mint = new web3.PublicKey(
    //             'Cs3ywW9tRrsbkGLqiYPaZ4wPXecEB1vNfnnAR6pbmfBm'
    //         );
    //         const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    //             connection,
    //             publicKey,
    //             mint,
    //             publicKey,
    //             signTransaction
    //         );

    //         const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    //             connection,
    //             publicKey,
    //             mint,
    //             toPub,
    //             signTransaction
    //         );
    //         const transaction = new web3.Transaction().add(
    //             createTransferInstruction(
    //                 fromTokenAccount.address, // source
    //                 toTokenAccount.address, // dest
    //                 publicKey,
    //                 100000 * web3.LAMPORTS_PER_SOL,
    //                 [],
    //                 TOKEN_PROGRAM_ID
    //             )
    //         );

    //         const blockHash = await connection.getRecentBlockhash();
    //         transaction.feePayer = await publicKey;
    //         transaction.recentBlockhash = await blockHash.blockhash;
    //         const signed = await signTransaction(transaction);

    //         await connection.sendRawTransaction(signed.serialize());
    //     } catch (err: any) {
    //         console.log(err.message);
    //     }
    // }, [publicKey, sendTransaction, connection, signTransaction]);

    return (
        <Container>
            <div className='banner pt-20 max-w-7xl mx-auto'>
                <div className='px-4'>
                    <div className='grid lg:grid-cols-7 auto-cols-fr'>
                        <div className='col-span-4'>
                            <h1 className='text-solabWhite-500 text-3xl sm:text-4xl'>
                                {/* <button
                                    className='btn btn-pink'
                                    onClick={onClick}
                                >
                                    Send transaction
                                </button> */}
                                {/* <DateTimePicker
                                    onChange={onChange}
                                    value={value}
                                    format='yyyy-MM-dd HH:mm:ss'
                                /> */}
                                <span className='font-bold leading-4'>
                                    Fundraising platform
                                </span>
                                <span className='font-medium leading-4'>
                                    {' '}
                                    on Solana
                                </span>
                            </h1>
                            <p className='text-base w-4/5 text-solabGray-100'>
                                Solab is the go-to platform for the Solana
                                blockchain. Invest in the hottest Solana
                                projects, stake your tokens, trade on our DEX,
                                manage your Solana wallet and participate in our
                                (future) governance.
                            </p>
                            <button className='bg-solabCyan-500 text-solabBlack-500 py-4 px-16 rounded mt-10 hover:opacity-80'>
                                Buy Solab
                            </button>

                            <div className='mt-9 flex'>
                                <Link href='https://t.me/solabcommunity'>
                                    <a className='flex items-center group'>
                                        <FaTelegramPlane className='text-2xl text-solabBlue-500' />
                                        <span className='ml-2 group-hover:text-solabBlue-500 text-xs underline'>
                                            Join us on Telegram
                                        </span>
                                    </a>
                                </Link>
                                <Link href='https://twitter.com/solablaunchpad'>
                                    <a className='flex items-center ml-2 group'>
                                        <BsTwitter className='text-2xl text-solabBlue-500' />
                                        <span className='ml-2 group-hover:text-solabBlue-500 text-xs underline'>
                                            Follow our Twitter
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-24 p-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 sm:grid-cols-3 auto-rows-fr gap-8'>
                        <div className='text-center border border-solabGray-50 py-4'>
                            <h1 className='text-solabCyan-500 text-2xl lg:text-3xl'>
                                10
                            </h1>
                            <p className='text-sm text-solabGray-100'>
                                FUNDED PROJECTS
                            </p>
                        </div>
                        <div className='text-center border border-solabGray-50 py-4'>
                            <h1 className='text-solabCyan-500 text-2xl lg:text-3xl'>
                                <NumberFormat
                                    thousandsGroupStyle='thousand'
                                    value={10262938}
                                    displayType='text'
                                    thousandSeparator={true}
                                />
                            </h1>
                            <p className='text-sm text-solabGray-100'>
                                FUNDS RAISES
                            </p>
                        </div>
                        <div className='text-center border border-solabGray-50 py-4'>
                            <h1 className='text-solabCyan-500 text-2xl lg:text-3xl'>
                                2
                            </h1>
                            <p className='text-sm text-solabGray-100'>
                                UPCOMING PROJECTS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-32 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-center text-3xl font-bold'>Projects</h1>
                    <p className='text-center font-light text-solabGray-100'>
                        Check new Solana project launches on our platform.
                    </p>
                    <div className='mt-12'>
                        <Tab.Group>
                            <Tab.List className='border-b border-solabGray-50 gap-x-6 flex'>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <div
                                            className={`w-min whitespace-nowrap cursor-pointer`}
                                        >
                                            <span
                                                className={`${
                                                    selected
                                                        ? 'font-bold'
                                                        : 'text-solabGray-100'
                                                }`}
                                            >
                                                ALL
                                            </span>
                                            {selected ? (
                                                <hr className='gradient-background-1 mt-1 py-px border-0' />
                                            ) : null}
                                        </div>
                                    )}
                                </Tab>
                                <Tab as={Fragment}>
                                    {({ selected }) => (
                                        <div
                                            className={`w-min whitespace-nowrap cursor-pointer`}
                                        >
                                            <span
                                                className={`${
                                                    selected
                                                        ? 'font-bold'
                                                        : 'text-solabGray-100'
                                                }`}
                                            >
                                                UPCOMING
                                            </span>
                                            {selected ? (
                                                <hr className='gradient-background-1 mt-1 py-px border-0' />
                                            ) : null}
                                        </div>
                                    )}
                                </Tab>
                            </Tab.List>
                            <Tab.Panels className='mt-8'>
                                <Tab.Panel>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                            <div
                                                style={{
                                                    backgroundImage: `url('/sample-project-thumbnail.png')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-48 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('/sample-token-logo.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Retro
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $Retro
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Nitro League is a unique,
                                                mobile-first, play-to-earn
                                                racing game with cutting-edge
                                                gameplay mechanics and graphics.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Open date
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        TBA
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Price per token
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='px-4 mt-4 text-right'>
                                                <Link href='#'>
                                                    <a className='text-gradient-1'>
                                                        View detail
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
            <div className='mt-32 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-center text-3xl font-bold'>
                        Tiered System
                    </h1>
                    <div className='mt-12'>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                <p className='text-center font-bold mt-10 text-xxl'>
                                    Tier 1
                                </p>
                                <div className='mt-8 mx-auto w-44 h-44 p-px gradient-background-1 rounded-lg'>
                                    <div
                                        className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                        style={{
                                            backgroundImage: `url('/tier-demo.png')`,
                                        }}
                                    ></div>
                                </div>
                                <h1 className='text-center font-bold text-2xl mt-11'>
                                    <NumberFormat
                                        thousandsGroupStyle='thousand'
                                        value={10000}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix=' LAB'
                                    />
                                </h1>
                                <div className='mt-8 px-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Lottery tickets
                                        </span>
                                        <span className='text-solabGray-100'>
                                            10
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Max Individual Allocation
                                        </span>
                                        <span className='text-solabGray-100'>
                                            <NumberFormat
                                                thousandsGroupStyle='thousand'
                                                value={60}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix=' USDC'
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                <p className='text-center font-bold mt-10 text-xxl'>
                                    Tier 1
                                </p>
                                <div className='mt-8 mx-auto w-44 h-44 p-px gradient-background-1 rounded-lg'>
                                    <div
                                        className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                        style={{
                                            backgroundImage: `url('/tier-demo.png')`,
                                        }}
                                    ></div>
                                </div>
                                <h1 className='text-center font-bold text-2xl mt-11'>
                                    <NumberFormat
                                        thousandsGroupStyle='thousand'
                                        value={10000}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix=' LAB'
                                    />
                                </h1>
                                <div className='mt-8 px-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Lottery tickets
                                        </span>
                                        <span className='text-solabGray-100'>
                                            10
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Max Individual Allocation
                                        </span>
                                        <span className='text-solabGray-100'>
                                            <NumberFormat
                                                thousandsGroupStyle='thousand'
                                                value={60}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix=' USDC'
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                <p className='text-center font-bold mt-10 text-xxl'>
                                    Tier 1
                                </p>
                                <div className='mt-8 mx-auto w-44 h-44 p-px gradient-background-1 rounded-lg'>
                                    <div
                                        className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                        style={{
                                            backgroundImage: `url('/tier-demo.png')`,
                                        }}
                                    ></div>
                                </div>
                                <h1 className='text-center font-bold text-2xl mt-11'>
                                    <NumberFormat
                                        thousandsGroupStyle='thousand'
                                        value={10000}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix=' LAB'
                                    />
                                </h1>
                                <div className='mt-8 px-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Lottery tickets
                                        </span>
                                        <span className='text-solabGray-100'>
                                            10
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Max Individual Allocation
                                        </span>
                                        <span className='text-solabGray-100'>
                                            <NumberFormat
                                                thousandsGroupStyle='thousand'
                                                value={60}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix=' USDC'
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:mt-12 mt-8'>
                            <div className='hidden lg:col-span-2 lg:block'></div>
                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5 lg:col-span-4'>
                                <p className='text-center font-bold mt-10 text-xxl'>
                                    Tier 1
                                </p>
                                <div className='mt-8 mx-auto w-44 h-44 p-px gradient-background-1 rounded-lg'>
                                    <div
                                        className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                        style={{
                                            backgroundImage: `url('/tier-demo.png')`,
                                        }}
                                    ></div>
                                </div>
                                <h1 className='text-center font-bold text-2xl mt-11'>
                                    <NumberFormat
                                        thousandsGroupStyle='thousand'
                                        value={10000}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix=' LAB'
                                    />
                                </h1>
                                <div className='mt-8 px-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Lottery tickets
                                        </span>
                                        <span className='text-solabGray-100'>
                                            10
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Max Individual Allocation
                                        </span>
                                        <span className='text-solabGray-100'>
                                            <NumberFormat
                                                thousandsGroupStyle='thousand'
                                                value={60}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix=' USDC'
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5 lg:col-span-4'>
                                <p className='text-center font-bold mt-10 text-xxl'>
                                    Tier 1
                                </p>
                                <div className='mt-8 mx-auto w-44 h-44 p-px gradient-background-1 rounded-lg'>
                                    <div
                                        className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                        style={{
                                            backgroundImage: `url('/tier-demo.png')`,
                                        }}
                                    ></div>
                                </div>
                                <h1 className='text-center font-bold text-2xl mt-11'>
                                    <NumberFormat
                                        thousandsGroupStyle='thousand'
                                        value={10000}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix=' LAB'
                                    />
                                </h1>
                                <div className='mt-8 px-4'>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Lottery tickets
                                        </span>
                                        <span className='text-solabGray-100'>
                                            10
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='font-bold'>
                                            Max Individual Allocation
                                        </span>
                                        <span className='text-solabGray-100'>
                                            <NumberFormat
                                                thousandsGroupStyle='thousand'
                                                value={60}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix=' USDC'
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='hidden lg:col-span-2 lg:block'></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-32 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-center text-3xl font-bold'>Press</h1>
                    <Swiper
                        pagination={{
                            clickable: true,
                        }}
                        className='pb-12 mt-8'
                        autoplay={true}
                        slidesPerView={2}
                        spaceBetween={10}
                        loop={true}
                        breakpoints={{
                            '768': {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            '1024': {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <Link href='#'>
                                <a>
                                    <div
                                        className='w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-content.s3.sa-east-1.amazonaws.com/p1.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='#'>
                                <a>
                                    <div
                                        className='w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-content.s3.sa-east-1.amazonaws.com/p2.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='#'>
                                <a>
                                    <div
                                        className='w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-content.s3.sa-east-1.amazonaws.com/p4.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='#'>
                                <a>
                                    <div
                                        className='w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-content.s3.sa-east-1.amazonaws.com/p5.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='#'>
                                <a>
                                    <div
                                        className='w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-content.s3.sa-east-1.amazonaws.com/p6.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className='mt-32 px-4'>
                <div className='max-w-6xl mx-auto'>
                    <h1 className='text-center text-3xl font-bold'>Roadmap</h1>
                    <div className='mt-8'>
                        <VerticalTimeline>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#0F1217',
                                    color: '#E2E4E9',
                                    border: '1px solid #1F2733',
                                }}
                                contentArrowStyle={{
                                    borderRight: 'none',
                                }}
                                date='24 Dec, 2021'
                                dateClassName='text-cyan-500 p-0 hidden'
                                iconClassName='bg-solabCyan-500 text-yellow-500 w-4 h-4'
                            >
                                <h3 className='text-2xl text-solabCyan-500'>
                                    Dec, 2021
                                </h3>
                                <ul className='list-disc pl-5'>
                                    <li className='text-base'>
                                        Tier system release
                                    </li>
                                    <li className='text-base'>
                                        First Solab Project launch
                                    </li>
                                    <li className='text-base'>
                                        Airdrop + Whitelist lottery registration
                                        opens
                                    </li>
                                    <li className='text-base'>
                                        KYC Integration
                                    </li>
                                </ul>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#0F1217',
                                    color: '#E2E4E9',
                                    border: '1px solid #1F2733',
                                }}
                                contentArrowStyle={{
                                    borderRight: 'none',
                                }}
                                date='24 Dec, 2021'
                                dateClassName='text-cyan-500 p-0 hidden'
                                iconClassName='bg-solabCyan-500 text-yellow-500 w-4 h-4'
                            >
                                <h3 className='text-2xl text-solabCyan-500'>
                                    Q1, 2022
                                </h3>
                                <ul className='list-disc pl-5'>
                                    <li className='text-base'>
                                        SOLAB trading now live on Raydium
                                    </li>
                                    <li className='text-base'>
                                        Partnership development
                                    </li>
                                </ul>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#0F1217',
                                    color: '#E2E4E9',
                                    border: '1px solid #1F2733',
                                }}
                                contentArrowStyle={{
                                    borderRight: 'none',
                                }}
                                date='24 Dec, 2021'
                                dateClassName='text-cyan-500 p-0 hidden'
                                iconClassName='bg-solabCyan-500 text-yellow-500 w-4 h-4'
                            >
                                <h3 className='text-2xl text-solabCyan-500'>
                                    Q2, 2022
                                </h3>
                                <ul className='list-disc pl-5'>
                                    <li className='text-base'>
                                        Token Swap feature release
                                    </li>
                                    <li className='text-base'>
                                        NFT marketplace
                                    </li>
                                </ul>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#0F1217',
                                    color: '#E2E4E9',
                                    border: '1px solid #1F2733',
                                }}
                                contentArrowStyle={{
                                    borderRight: 'none',
                                }}
                                date='24 Dec, 2021'
                                dateClassName='text-cyan-500 p-0 hidden'
                                iconClassName='bg-solabCyan-500 text-yellow-500 w-4 h-4'
                            >
                                <h3 className='text-2xl text-solabCyan-500'>
                                    Q3, 2021
                                </h3>
                                <ul className='list-disc pl-5'>
                                    <li className='text-base'>
                                        Solab game studio release
                                    </li>
                                    <li className='text-base'>Mystery boxes</li>
                                </ul>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className='vertical-timeline-element--work vertical-timeline.vertical-timeline-custom-line'
                                contentStyle={{
                                    background: '#0F1217',
                                    color: '#E2E4E9',
                                    border: '1px solid #1F2733',
                                }}
                                contentArrowStyle={{
                                    borderRight: 'none',
                                }}
                                date='24 Dec, 2021'
                                dateClassName='text-cyan-500 p-0 hidden'
                                iconClassName='bg-solabCyan-500 text-yellow-500 w-4 h-4'
                            >
                                <h3 className='text-2xl text-solabCyan-500'>
                                    Q4, 2021
                                </h3>
                                <ul className='list-disc pl-5'>
                                    <li className='text-base'>
                                        Mobile App development
                                    </li>
                                </ul>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Home;
