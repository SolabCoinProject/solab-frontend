import type { NextPage } from 'next';
import Container from '../components/app/layout/Container';
import Link from 'next/link';
// import Image from 'next/image';
import { FaTelegramPlane } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
// import banner from '../assets/images/banner.gif';
// import sampleTokenLogo from '../assets/imageshttps://solab-media.s3.ap-southeast-1.amazonaws.com/content/sample-token-logo.png';

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import NumberFormat from 'react-number-format';
import { useAppDispatch, useAppSelector } from '../app/hooks';
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
import { tierActions } from '../features/tier/tierSlice';
SwiperCore.use([Pagination, Autoplay]);

import { ITier } from '../features/tier/types';

const Home: NextPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateActiveHeaderItem(appHeaderOptions.home));
    }, [dispatch]);
    useEffect(() => {
        dispatch(tierActions.fetchTiersApp());
    }, []);

    const tiers = useAppSelector((state) => state.tier.app.tiers);

    const { publicKey, sendTransaction, signTransaction } = useWallet();
    const { connection } = useConnection();

    const getTiersSlice = () => {
        const chunkedTiers: ITier[][] = [];
        const copyTier: ITier[] = [...tiers];
        while (copyTier.length > 0) {
            chunkedTiers.push(copyTier.splice(0, 3));
        }
        return chunkedTiers;
    };

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
                                The Solab platform is a decentralized platform
                                on the Solana blockchain. Featuring an
                                industry-leading launchpad with guaranteed
                                allocations, token vesting, token generator, an
                                NFT marketplace, and more.
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
                                TBA
                            </h1>
                            <p className='text-sm text-solabGray-100'>
                                FUNDED PROJECTS
                            </p>
                        </div>
                        <div className='text-center border border-solabGray-50 py-4'>
                            <h1 className='text-solabCyan-500 text-2xl lg:text-3xl'>
                                {/* <NumberFormat
                                    thousandsGroupStyle='thousand'
                                    value={10262938}
                                    displayType='text'
                                    thousandSeparator={true}
                                /> */}
                                TBA
                            </h1>
                            <p className='text-sm text-solabGray-100'>
                                FUNDS RAISES
                            </p>
                        </div>
                        <div className='text-center border border-solabGray-50 py-4'>
                            <h1 className='text-solabCyan-500 text-2xl lg:text-3xl'>
                                TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/syzy-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/syzy-thumnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Syzygy
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $SYZG
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Build a new planet. Let's fight
                                                all the space monsters.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/savolmain-3.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/salvor-thumbnail-3.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Salvor
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $SALVR
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                The strength of the super
                                                monsters will show the level of
                                                the player. Build your own
                                                monster island.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/destiny-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/destiny-thumbnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        The Destiny
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $DESTN
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Look for everything useful on
                                                the island to help you survive.
                                                The strongest is the last one
                                                standing.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/azura-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/azura-thumbnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Azura
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $AZR
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                With a limited military force,
                                                defend the base until
                                                reinforcements arrive. The
                                                country will honor you
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/phara-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/phara-thumbnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Pharawin
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $PHAR
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                As loyal soldiers, protect the
                                                peace of the earth against
                                                hostile forces in space.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/taira-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/taira-thumbnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Taira
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $TAIR
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                As a samurai warrior of the
                                                Taira clan, fight against the
                                                Fujiwara and Minamoto clans even
                                                if it costs you death.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/syzy-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/syzy-thumnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Syzygy
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $SYZG
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Build a new planet. Let's fight
                                                all the space monsters.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/savolmain-3.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/salvor-thumbnail-3.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Salvor
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $SALVR
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                The strength of the super
                                                monsters will show the level of
                                                the player. Build your own
                                                monster island.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/destiny-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/destiny-thumbnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        The Destiny
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $DESTN
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                Look for everything useful on
                                                the island to help you survive.
                                                The strongest is the last one
                                                standing.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/azura-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/azura-thumbnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Azura
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $AZR
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                With a limited military force,
                                                defend the base until
                                                reinforcements arrive. The
                                                country will honor you
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/phara-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/phara-thumbnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Pharawin
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $PHAR
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                As loyal soldiers, protect the
                                                peace of the earth against
                                                hostile forces in space.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                    backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/taira-main.jpeg')`,
                                                }}
                                                className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                            >
                                                <span className='absolute bg-solabWhite-700 text-solabBlack-500 top-3 left-2 px-0.5 rounded font-medium'>
                                                    Upcoming
                                                </span>
                                            </div>
                                            <div className='m-4 flex gap-x-4'>
                                                <div
                                                    className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                    style={{
                                                        backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/projects/taira-thumbnail.png')`,
                                                    }}
                                                ></div>
                                                <div className='flex flex-col justify-center'>
                                                    <p className='font-bold'>
                                                        Taira
                                                    </p>
                                                    <p className='text-solabGray-100'>
                                                        $TAIR
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='px-4 text-solabGray-100 text-sm'>
                                                As a samurai warrior of the
                                                Taira clan, fight against the
                                                Fujiwara and Minamoto clans even
                                                if it costs you death.
                                            </div>
                                            <div className='mt-4 px-4'>
                                                <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                    <span className='font-bold'>
                                                        Raise amount
                                                    </span>
                                                    <span className='text-solabGray-100'>
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={500000}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                                                        {/* <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={0.00012}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            prefix='$'
                                                        /> */}
                                                        TBA
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
                        {getTiersSlice().map((chunkTier) => {
                            if (chunkTier.length === 3) {
                                return (
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 auto-cols-max'>
                                        {chunkTier.map((tier) => (
                                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                <p className='text-center font-bold mt-10 text-xxl'>
                                                    {tier.name}
                                                </p>
                                                <div className='mt-8 mx-auto w-44 h-44 p-px gradient-background-1 rounded-lg'>
                                                    <div
                                                        className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                                        style={{
                                                            backgroundImage: `url('${tier.thumbnail}')`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <h1 className='text-center font-bold text-2xl mt-11'>
                                                    <NumberFormat
                                                        thousandsGroupStyle='thousand'
                                                        value={
                                                            tier.requiredLabAmount
                                                        }
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
                                                            {tier.hasGuaranteedAllocation
                                                                ? 'Guaranteed Allocation'
                                                                : tier.lotteryTickets}
                                                        </span>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-bold'>
                                                            Max Individual
                                                            Allocation
                                                        </span>
                                                        <span className='text-solabGray-100'>
                                                            <NumberFormat
                                                                thousandsGroupStyle='thousand'
                                                                value={
                                                                    tier.usdcLimit
                                                                }
                                                                displayType='text'
                                                                thousandSeparator={
                                                                    true
                                                                }
                                                                suffix=' USDC'
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            } else if (chunkTier.length === 2) {
                                return (
                                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:mt-12 mt-8'>
                                        <div className='hidden lg:col-span-2 lg:block'></div>
                                        {chunkTier.map((tier) => (
                                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5 lg:col-span-4'>
                                                <p className='text-center font-bold mt-10 text-xxl'>
                                                    {tier.name}
                                                </p>
                                                <div className='mt-8 mx-auto w-44 h-44 p-px gradient-background-1 rounded-lg'>
                                                    <div
                                                        className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                                        style={{
                                                            backgroundImage: `url('${tier.thumbnail}')`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <h1 className='text-center font-bold text-2xl mt-11'>
                                                    <NumberFormat
                                                        thousandsGroupStyle='thousand'
                                                        value={
                                                            tier.requiredLabAmount
                                                        }
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
                                                            {tier.hasGuaranteedAllocation
                                                                ? 'Guaranteed Allocation'
                                                                : tier.lotteryTickets}
                                                        </span>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-bold'>
                                                            Max Individual
                                                            Allocation
                                                        </span>
                                                        <span className='text-solabGray-100'>
                                                            <NumberFormat
                                                                thousandsGroupStyle='thousand'
                                                                value={
                                                                    tier.usdcLimit
                                                                }
                                                                displayType='text'
                                                                thousandSeparator={
                                                                    true
                                                                }
                                                                suffix=' USDC'
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='hidden lg:col-span-2 lg:block'></div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:mt-12 mt-8'>
                                        <div className='hidden  lg:block'></div>
                                        {chunkTier.map((tier) => (
                                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                <p className='text-center font-bold mt-10 text-xxl'>
                                                    {tier.name}
                                                </p>
                                                <div className='mt-8 mx-auto w-44 h-44 p-px gradient-background-1 rounded-lg'>
                                                    <div
                                                        className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                                        style={{
                                                            backgroundImage: `url('${tier.thumbnail}')`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <h1 className='text-center font-bold text-2xl mt-11'>
                                                    <NumberFormat
                                                        thousandsGroupStyle='thousand'
                                                        value={
                                                            tier.requiredLabAmount
                                                        }
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
                                                            {tier.hasGuaranteedAllocation
                                                                ? 'Guaranteed Allocation'
                                                                : tier.lotteryTickets}
                                                        </span>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <span className='font-bold'>
                                                            Max Individual
                                                            Allocation
                                                        </span>
                                                        <span className='text-solabGray-100'>
                                                            <NumberFormat
                                                                thousandsGroupStyle='thousand'
                                                                value={
                                                                    tier.usdcLimit
                                                                }
                                                                displayType='text'
                                                                thousandSeparator={
                                                                    true
                                                                }
                                                                suffix=' USDC'
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className='hidden lg:block'></div>
                                    </div>
                                );
                            }
                        })}
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
                        slidesPerView={1}
                        spaceBetween={10}
                        loop={true}
                        breakpoints={{
                            '640': {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
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
                            <Link href='https://finance.yahoo.com/news/solab-finance-solab-2022-game-162100649.html'>
                                <a>
                                    <div
                                        className='sm:w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/p1.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='https://apnews.com/press-release/pr-newswire/5708439be8f1fbe6ce131a5af45dca0d'>
                                <a>
                                    <div
                                        className='sm:w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/p2.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='https://www.benzinga.com/pressreleases/21/12/n24758980/solab-finance-solab-a-2022-game-changing-launchpad-is-launching-an-ido-for-their-native-token'>
                                <a>
                                    <div
                                        className='sm:w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/p4.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='https://www.morningstar.com/news/pr-newswire/20211223hk15705/solab-finance-solab-a-2022-game-changing-launchpad-is-launching-an-ido-for-their-native-token'>
                                <a>
                                    <div
                                        className='sm:w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/morning-star-logo.svg')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='https://www.marketwatch.com/press-release/solab-finance-solab-a-2022-game-changing-launchpad-is-launching-an-ido-for-their-native-token-2021-12-23'>
                                <a>
                                    <div
                                        className='sm:w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/p6.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='https://www.prnewswire.com/news-releases/solab-finance-solab-a-2022-game-changing-launchpad-is-launching-an-ido-for-their-native-token-301450469.html'>
                                <a>
                                    <div
                                        className='sm:w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/pr-news.png')`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '80% auto',
                                            backgroundPosition: 'center',
                                        }}
                                    ></div>
                                </a>
                            </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Link href='https://markets.businessinsider.com/news/stocks/solab-finance-solab-a-2022-game-changing-launchpad-is-launching-an-ido-for-their-native-token-1031064521'>
                                <a>
                                    <div
                                        className='sm:w-64 h-24 bg-solabWhite-700 rounded'
                                        style={{
                                            backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/markets-insider.svg')`,
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
                        <VerticalTimeline animate={false}>
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
                                    Q3, 2022
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
