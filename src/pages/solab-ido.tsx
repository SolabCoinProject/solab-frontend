import {Tab} from '@headlessui/react';
import {web3} from '@project-serum/anchor';
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {WalletNotConnectedError} from '@solana/wallet-adapter-base';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import copy from 'copy-to-clipboard';
import {differenceInSeconds, format, isAfter, isBefore} from 'date-fns';
import {ErrorMessage, Form, Formik} from 'formik';
import type {NextPage} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Fragment, useCallback, useEffect, useState} from 'react';
import Countdown from 'react-countdown';
import ReactHtmlParser from 'react-html-parser';
import {AiOutlineCheck, AiOutlineCheckCircle} from 'react-icons/ai';
import {GoPrimitiveDot} from 'react-icons/go';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import {Tab as ReactTab, TabList, TabPanel, Tabs} from 'react-tabs';
import {toast} from 'react-toastify';
import SwiperCore, {FreeMode, Navigation, Pagination, Thumbs} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import loaderCyan from '../assets/images/loader-cyan.svg';
import Container from '../components/app/layout/Container';
import {recaptchaSiteKey, url} from '../config/app';
import routes from '../config/routes';
import toastConfigs from '../config/toast';
import {usdcPubKey} from '../config/token';
import solabProjectConstants, {getSocialIcon,} from '../features/solabProject/contants';
import {solabProjectActions} from '../features/solabProject/solabProjectSlice';
import TaskModal from '../features/solabProject/TaskModal';
import {kycVerified} from '../features/user/constants';
import {createTransferInstruction} from '../libs/createTransferInstructions';
import {getOrCreateAssociatedTokenAccount} from '../libs/getOrCreateAssociatedTokenAccount';
import ReCAPTCHA from 'react-google-recaptcha';
import {appHeaderOptions} from '../features/layout/types';
import {updateActiveHeaderItem} from '../features/layout/layoutSlice';

SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

const SolabIDO: NextPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateActiveHeaderItem(appHeaderOptions.idoSolab));
    }, [dispatch]);
    const solabProject = useAppSelector(
        (state) => state.solabProject.app.solabProject
    );
    const user = useAppSelector((state) => state.user.app.user);
    const solabRegisterInfo = useAppSelector(
        (state) => state.solabProject.app.solabRegisteredInfo
    );
    const isPurchaseProcessing = useAppSelector(
        (state) => state.solabProject.app.isPurchaseProcessing
    );
    const isFollowingProject = useAppSelector(
        (state) => state.solabProject.app.isFollowingProject
    );
    const reloadRegisterInfo = useAppSelector(
        (state) => state.solabProject.app.reloadRegisterInfo
    );

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isCaptchaDone, setIsCaptchaDone] = useState<boolean>(true);

    const {publicKey, sendTransaction, signTransaction} = useWallet();
    const {connection} = useConnection();
    const router = useRouter();

    useEffect(() => {
        dispatch(solabProjectActions.fetchSolabProject());
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(
                solabProjectActions.fetchRegisterInfo({userId: user._id})
            );
        } else {
            dispatch(
                solabProjectActions.fetchRegisterInfo({
                    userId: 'disconnected',
                })
            );
        }
    }, [user]);
    useEffect(() => {
        if (reloadRegisterInfo && user) {
            dispatch(
                solabProjectActions.fetchRegisterInfo({userId: user._id})
            );
        }
    }, [reloadRegisterInfo]);

    const countDownRenderFunc = ({
                                     hours,
                                     minutes,
                                     seconds,
                                     completed,
                                     days,
                                 }) => {
        return (
            <div className='w-11/12 mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-center text-xl lg:text-2xl font-bold'>
                            {days}
                        </h2>
                        <span className='text-solabGray-100 text-xs lg:text-base'>
                            Days
                        </span>
                    </div>
                    <span className='font-bold text-xl lg:text-2xl'>:</span>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-center text-xl lg:text-2xl font-bold'>
                            {hours}
                        </h2>
                        <span className='text-solabGray-100 text-xs lg:text-base'>
                            Hours
                        </span>
                    </div>
                    <span className='font-bold text-xl lg:text-2xl'>:</span>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-center text-xl lg:text-2xl font-bold'>
                            {minutes}
                        </h2>
                        <span className='text-solabGray-100 text-xs lg:text-base'>
                            Minutes
                        </span>
                    </div>
                    <span className='font-bold text-xl lg:text-2xl'>:</span>
                    <div className='flex flex-col items-center justify-center'>
                        <h2 className='text-center text-xl lg:text-2xl font-bold'>
                            {seconds}
                        </h2>
                        <span className='text-solabGray-100 text-xs lg:text-base'>
                            Sec
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    const getProjectPhraseAndCountDown = () => {
        const result = {
            status: '',
            countDown: '' as any,
        };
        if (solabProject) {
            if (solabProject.isClosed) {
                result.status = 'Closed';
            } else if (isBefore(new Date(), new Date(solabProject.idoStartDate))) {
                const seconds = differenceInSeconds(
                    new Date(solabProject.idoStartDate),
                    new Date()
                );
                result.status = 'Social Task';
                result.countDown = (
                    <>
                        <h3 className='text-center text-solabGray-100 text-lg md:text-xl'>
                            Prefunding starts in
                        </h3>
                        <Countdown
                            date={Date.now() + seconds * 1000}
                            autoStart={true}
                            renderer={countDownRenderFunc}
                        />
                        <p className='text-solabGray-100 text-center text-base mt-1'>
                            Prefunding starts on{' '}
                            {format(
                                new Date(solabProject.idoEndDate),
                                'MMMM do yyyy, hh:mm a OOOO'
                            )}
                        </p>
                    </>
                );
            } else if (
                isBefore(new Date(), new Date(solabProject.idoEndDate)) && isAfter(new Date(), new Date(solabProject.idoStartDate))
            ) {
                const seconds = differenceInSeconds(
                    new Date(solabProject.idoEndDate),
                    new Date()
                );
                result.status = 'Whitelist registration';
                result.countDown = (
                    <>
                        <h3 className='text-center text-solabGray-100 text-lg md:text-xl'>
                            Whitelist registration ends in
                        </h3>
                        <Countdown
                            date={Date.now() + seconds * 1000}
                            autoStart={true}
                            renderer={countDownRenderFunc}
                        />
                        <p className='text-solabGray-100 text-center text-base mt-1'>
                            Whitelist registration ends on{' '}
                            {format(
                                new Date(solabProject.idoEndDate),
                                'MMMM do yyyy, hh:mm a OOOO'
                            )}
                        </p>
                    </>
                );
            } else {
                result.status = 'Token Distribution';
                result.countDown = <></>;
            }
        }
        return result;
    };

    const purchaseSubmitted = useCallback(
        async (usdcAmount: number) => {
            try {
                if (!publicKey || !signTransaction || !user)
                    throw new WalletNotConnectedError();
                if (!solabProject) {
                    throw new Error('Project not found');
                }
                if (isBefore(new Date(), new Date(solabProject.idoStartDate))) {
                    throw new Error('Please wait until whitelist start');
                }
                if (isAfter(new Date(), new Date(solabProject.idoEndDate))) {
                    throw new Error('Whitelist registration has ended');
                }
                const toPub = new web3.PublicKey(solabProject.pubKey);
                const mint = new web3.PublicKey(usdcPubKey);
                const fromTokenAccount =
                    await getOrCreateAssociatedTokenAccount(
                        connection,
                        publicKey,
                        mint,
                        publicKey,
                        signTransaction
                    );
                const toTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection,
                    publicKey,
                    mint,
                    toPub,
                    signTransaction
                );
                const transaction = new web3.Transaction().add(
                    createTransferInstruction(
                        fromTokenAccount.address,
                        toTokenAccount.address,
                        publicKey,
                        (usdcAmount / 1000) * web3.LAMPORTS_PER_SOL,
                        [],
                        TOKEN_PROGRAM_ID
                    )
                );

                const blockHash = await connection.getRecentBlockhash();
                transaction.feePayer = await publicKey;
                transaction.recentBlockhash = await blockHash.blockhash;
                const signed = await signTransaction(transaction);
                const signature = await connection.sendRawTransaction(
                    signed.serialize()
                );
                await connection.confirmTransaction(signature, 'processed');
                setTimeout(() => {
                    dispatch(
                        solabProjectActions.processPurchaseInfo({
                            walletAddress: user.walletAddress,
                            signature,
                            amount: usdcAmount,
                        })
                    );
                }, 4000);
            } catch (err: any) {
                toast.error(
                    'Solana network error! Please make sure you have enough funds in your wallet and try again.',
                    toastConfigs.error
                )
                ;
                return false;
            }
        },
        [
            publicKey,
            sendTransaction,
            connection,
            signTransaction,
            user,
            solabProject,
        ]
    );

    const getRefLink = () => {
        if (user) {
            const refParams = JSON.stringify({
                p: 'solab-project',
                u: user._id,
            });
            const encryptedRefData = btoa(refParams);
            const refLink = `${url}${router.pathname}?ref=${encryptedRefData}`;
            return refLink;
        }
        return false;
    };

    return (
        <Container>
            <div className='mt-8 p-4 max-w-7xl mx-auto'>
                {solabProject ? (
                    <>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <div>
                                <div className='flex items-center'>
                                    <Image
                                        width={80}
                                        height={80}
                                        src={solabProject.thumbnail as string}
                                        className='rounded-lg'
                                        unoptimized={true}
                                    />
                                    <h1 className='text-3xl uppercase ml-5'>
                                        {solabProject.name}
                                    </h1>
                                </div>
                                <p className='mt-4 text-solabGray-100'>
                                    {solabProject.description}
                                </p>
                                <div className='mt-6 flex gap-4'>
                                    {solabProject.social?.map((item) => (
                                        <Link href={item.link}>
                                            <a>
                                                <div
                                                    className='w-10 h-10 flex items-center justify-center bg-solabGray-300 rounded'>
                                                    {getSocialIcon(
                                                        item.socialType,
                                                        'w-4 h-4'
                                                    )}
                                                </div>
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                                <div className='mt-6 p-4 bg-solabGray-300 rounded-lg'>
                                    <Swiper
                                        style={
                                            {
                                                '--swiper-navigation-color':
                                                    '#1EE8BB',
                                                '--swiper-pagination-color':
                                                    '#1EE8BB',
                                            } as any
                                        }
                                        spaceBetween={10}
                                        navigation={true}
                                        pagination={true}
                                        thumbs={{swiper: thumbsSwiper}}
                                        className='mySwiper2'
                                        loop={true}
                                    >
                                        {solabProject.media.map((md) => (
                                            <SwiperSlide className='h-48 md:h-72 lg:h-96 rounded-lg'>
                                                {md.mediaType ===
                                                solabProjectConstants.mediaTypeImage ? (
                                                    <div
                                                        style={{
                                                            backgroundImage: `url(${md.link})`,
                                                        }}
                                                        className='w-full h-full bg-no-repeat bg-cover bg-center rounded-lg'
                                                    ></div>
                                                ) : md.mediaType ===
                                                solabProjectConstants.mediaTypeVideo ? (
                                                    <iframe
                                                        className='w-full h-full rounded-lg'
                                                        src={md.link}
                                                        title='YouTube video player'
                                                        allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                    ></iframe>
                                                ) : (
                                                    ''
                                                )}
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={10}
                                        slidesPerView={3}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        className='mySwiper mt-4 mx-auto'
                                    >
                                        {solabProject.media.map((md) => (
                                            <SwiperSlide className='h-12 md:h-14 lg:h-20'>
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${md.thumbnail})`,
                                                    }}
                                                    className='w-full h-full bg-no-repeat bg-cover bg-center rounded-lg'
                                                ></div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className='bg-solabGray-300 p-4 rounded-lg'>
                                <h2 className='text-xl md:text-2xl font-bold'>
                                    Project Key Metrics
                                </h2>
                                {solabProject.keyMetrics?.map((item) => (
                                    <div
                                        className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                        <span className='text-solabGray-100 text-sm'>
                                            {item.label}
                                        </span>
                                        <span className='font-bold text-sm'>
                                            {item.valueType ===
                                            solabProjectConstants.keyMetricTypeNumber ? (
                                                item.unitPosition ===
                                                solabProjectConstants.keyMetricUnitPositionLeft &&
                                                item.unit ? (
                                                    <NumberFormat
                                                        thousandsGroupStyle='thousand'
                                                        value={item.value}
                                                        displayType='text'
                                                        thousandSeparator={true}
                                                        prefix={item.unit}
                                                    />
                                                ) : (
                                                    <NumberFormat
                                                        thousandsGroupStyle='thousand'
                                                        value={item.value}
                                                        displayType='text'
                                                        thousandSeparator={true}
                                                        suffix={item.unit}
                                                    />
                                                )
                                            ) : (
                                                item.value
                                            )}
                                        </span>
                                    </div>
                                ))}
                                <div
                                    className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                    <span className='text-solabGray-100 text-sm'>
                                        Status
                                    </span>
                                    <span
                                        className='font-bold py-1 px-2 bg-solabWhite-700 text-solabBlack-500 rounded text-sm'>
                                        {getProjectPhraseAndCountDown().status}
                                    </span>
                                </div>
                                <div className='w-full text-center mt-3'>
                                    {getProjectPhraseAndCountDown().countDown}

                                    <div className='mt-2'>
                                        {user ? (
                                            !solabProject.followers.includes(
                                                user._id
                                            ) ? (
                                                <button
                                                    type='button'
                                                    className='py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 text-sm'
                                                    onClick={() =>
                                                        dispatch(
                                                            solabProjectActions.followProject(
                                                                {
                                                                    userId: user._id,
                                                                }
                                                            )
                                                        )
                                                    }
                                                >
                                                    {isFollowingProject
                                                        ? '...'
                                                        : 'Register Now'}
                                                </button>
                                            ) : (
                                                <div
                                                    className='w-min py-3 px-4 bg-solab bg-solabGray-900 border border-solabCyan-500 rounded text-solabCyan-500 mx-auto flex items-center justify-center'>
                                                    <AiOutlineCheckCircle className='w-3.5 h-3.5 mr-0.5'/>{' '}
                                                    <span className='ml-0.5'>
                                                        Registered
                                                    </span>
                                                </div>
                                            )
                                        ) : (
                                            <WalletMultiButton className='mx-auto'/>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <Tab.Group>
                                <Tab.List className='border-b border-solabGray-50 gap-x-6 flex overflow-x-auto'>
                                    <Tab as={Fragment}>
                                        {({selected}) => (
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
                                                    YOUR TICKETS
                                                </span>
                                                {selected ? (
                                                    <hr className='gradient-background-1 mt-1 py-px border-0'/>
                                                ) : null}
                                            </div>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({selected}) => (
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
                                                    DESCRIPTION
                                                </span>
                                                {selected ? (
                                                    <hr className='gradient-background-1 mt-1 py-px border-0'/>
                                                ) : null}
                                            </div>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({selected}) => (
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
                                                    IDO SCHEDULE
                                                </span>
                                                {selected ? (
                                                    <hr className='gradient-background-1 mt-1 py-px border-0'/>
                                                ) : null}
                                            </div>
                                        )}
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className='mt-8'>
                                    <Tab.Panel className='overflow-x-auto'>
                                        <div className='w-full mx-auto'>
                                            <div className='flex justify-between items-end relative'>
                                                <hr className='absolute w-1/3 border border-solabCyan-500 bottom-9 z-0 hidden lg:block'/>
                                                <div
                                                    className='flex flex-col items-center justify-center text-center text-sm'>
                                                    <ul className='text-solabCyan-500'>
                                                        <li className='flex items-center justify-center'>
                                                            <GoPrimitiveDot className='color-bg-solabCyan-500 mr-0.5'/>
                                                            <span className='ml-0.5'>
                                                                Whitelist
                                                                Registration
                                                                Start
                                                            </span>
                                                        </li>
                                                        <li className='flex items-center justify-center'>
                                                            <GoPrimitiveDot className='color-bg-solabCyan-500 mr-0.5'/>
                                                            <span className='ml-0.5'>
                                                                Social Task
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <div
                                                        className='z-10 w-8 h-8 rounded-full bg-solabCyan-500 flex items-center justify-center'>
                                                        <AiOutlineCheck className=' text-solabWhite-500 w-4 h-4'/>
                                                    </div>
                                                    <span className='text-solabCyan-500'>
                                                        {' '}
                                                        {format(
                                                            new Date(
                                                                '2021-12-28T02:00:00.000+00:00'
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                                <hr
                                                    className={`absolute w-1/3 ${
                                                        isAfter(
                                                            new Date(),
                                                            new Date(
                                                                solabProject.idoStartDate
                                                            )
                                                        )
                                                            ? 'border border-solabCyan-500'
                                                            : 'border border-solabGray-100'
                                                    } bottom-9 z-0 left-2/4 hidden lg:block`}
                                                    style={{
                                                        transform:
                                                            'translate(-50%,0)',
                                                    }}
                                                />
                                                <div
                                                    className={`flex flex-col items-center justify-center text-center text-sm ${
                                                        isAfter(
                                                            new Date(),
                                                            new Date(
                                                                solabProject.idoStartDate
                                                            )
                                                        )
                                                            ? 'text-solabCyan-500'
                                                            : null
                                                    }`}
                                                >
                                                    <ul>
                                                        <li className='flex items-center justify-center'>
                                                            <GoPrimitiveDot className='mr-0.5'/>
                                                            <span className='ml-0.5'>
                                                                Prefunding
                                                            </span>
                                                        </li>
                                                        <li className='flex items-center justify-center'>
                                                            <GoPrimitiveDot className='mr-0.5'/>
                                                            <span className='ml-0.5'>
                                                                Social Task
                                                            </span>
                                                        </li>
                                                    </ul>

                                                    {isAfter(
                                                        new Date(),
                                                        new Date(
                                                            solabProject.idoStartDate
                                                        )
                                                    ) ? (
                                                        <div
                                                            className='z-10 w-8 h-8 rounded-full bg-solabCyan-500 flex items-center justify-center'>
                                                            <AiOutlineCheck className=' text-solabWhite-500 w-4 h-4'/>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className='z-10 w-8 h-8 rounded-full bg-solabGray-100 flex items-center justify-center'>
                                                            <GoPrimitiveDot className=' text-solabWhite-500  w-4 h-4'/>
                                                        </div>
                                                    )}
                                                    <span>
                                                        {' '}
                                                        {format(
                                                            new Date(
                                                                solabProject.idoStartDate
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                                <hr
                                                    className={`absolute w-1/3 ${
                                                        isAfter(
                                                            new Date(),
                                                            new Date(
                                                                solabProject.idoEndDate
                                                            )
                                                        )
                                                            ? 'border border-solabCyan-500'
                                                            : 'border border-solabGray-100'
                                                    } bottom-9 z-0 right-0 hidden lg:block`}
                                                />
                                                <div
                                                    className={`flex flex-col items-center justify-center text-center text-sm ${
                                                        isAfter(
                                                            new Date(),
                                                            new Date(
                                                                solabProject.idoEndDate
                                                            )
                                                        )
                                                            ? 'text-solabCyan-500'
                                                            : null
                                                    }`}
                                                >
                                                    <ul>
                                                        <li className='flex items-center justify-center'>
                                                            <GoPrimitiveDot className='mr-0.5'/>
                                                            <span className='ml-0.5'>
                                                                Whitelist
                                                                Registration End
                                                            </span>
                                                        </li>
                                                    </ul>

                                                    {isAfter(
                                                        new Date(),
                                                        new Date(
                                                            solabProject.idoEndDate
                                                        )
                                                    ) ? (
                                                        <div
                                                            className='z-10 w-8 h-8 rounded-full bg-solabCyan-500 flex items-center justify-center'>
                                                            <AiOutlineCheck className=' text-solabWhite-500 w-4 h-4'/>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className='z-10 w-8 h-8 rounded-full bg-solabGray-100 flex items-center justify-center'>
                                                            <GoPrimitiveDot className=' text-solabWhite-500  w-4 h-4'/>
                                                        </div>
                                                    )}
                                                    <span>
                                                        {' '}
                                                        {format(
                                                            new Date(
                                                                solabProject.idoEndDate
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className='w-1/2 mx-auto text-sm md:text-base lg:text-xl text-center py-1 px-5 mt-8 border border-solabCyan-500 rounded'>
                                                <span className='text-solabGray-100'>
                                                    Your total lottery tickets:{' '}
                                                </span>
                                                <span className='text-solabWhite-500'>
                                                    {solabRegisterInfo
                                                        ? solabRegisterInfo.tickets
                                                        : 0}
                                                </span>
                                            </h3>
                                            {isAfter(
                                                new Date(),
                                                new Date(
                                                    solabProject.idoStartDate
                                                )
                                            ) &&
                                            isBefore(
                                                new Date(),
                                                new Date(
                                                    solabProject.idoEndDate
                                                )
                                            ) ? (
                                                <div className='bg-solabGray-300 py-6 rounded-lg mt-8'>
                                                    <div className='w-4/5 mx-auto'>
                                                        <div>
                                                            {user ? (
                                                                solabProject ? (
                                                                    !solabProject.registeredUsers.includes(
                                                                        user._id
                                                                    ) ? (
                                                                        <div>
                                                                            <h2 className='text-2xl font-bold text-center'>
                                                                                Prefunding
                                                                            </h2>
                                                                            {!isCaptchaDone ? (
                                                                                <div
                                                                                    className='mx-auto text-center w-min'>
                                                                                    <ReCAPTCHA
                                                                                        sitekey={
                                                                                            recaptchaSiteKey
                                                                                        }
                                                                                        onChange={() => {
                                                                                            setIsCaptchaDone(
                                                                                                true
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            ) : isPurchaseProcessing ? (
                                                                                <>
                                                                                    <div
                                                                                        className='w-10 h-10 mx-auto relative'>
                                                                                        <Image
                                                                                            src={
                                                                                                loaderCyan
                                                                                            }
                                                                                            layout='fill'
                                                                                        />
                                                                                    </div>
                                                                                    <h2 className='text-center text-solabCyan-500 text-xxl'>Please
                                                                                        wait while we are processing
                                                                                        your payment! Thank you!</h2>
                                                                                </>
                                                                            ) : (
                                                                                <Formik
                                                                                    enableReinitialize
                                                                                    initialValues={{
                                                                                        usdcAmount:
                                                                                            solabProject
                                                                                                .buyAmountOptions[0],
                                                                                    }}
                                                                                    onSubmit={async (
                                                                                        values,
                                                                                        {
                                                                                            setSubmitting,
                                                                                        }
                                                                                    ) => {
                                                                                        dispatch(
                                                                                            solabProjectActions.processPurchase()
                                                                                        );
                                                                                        await purchaseSubmitted(
                                                                                            values.usdcAmount
                                                                                        );
                                                                                        setSubmitting(
                                                                                            false
                                                                                        );
                                                                                    }}
                                                                                    validationSchema={Yup.object().shape(
                                                                                        {
                                                                                            usdcAmount:
                                                                                                Yup.mixed().oneOf(
                                                                                                    solabProject.buyAmountOptions,
                                                                                                    'Must be 100,200 or 300'
                                                                                                ),
                                                                                        }
                                                                                    )}
                                                                                >
                                                                                    {({
                                                                                          values,
                                                                                          isSubmitting,
                                                                                          errors,
                                                                                          setFieldValue,
                                                                                      }) => {
                                                                                        return (
                                                                                            <Form>
                                                                                                <div
                                                                                                    className='text-left'>
                                                                                                    <label>
                                                                                                        Select
                                                                                                        prefund
                                                                                                        amount
                                                                                                    </label>
                                                                                                    <Select
                                                                                                        value={{
                                                                                                            label: values.usdcAmount,
                                                                                                            value: values.usdcAmount,
                                                                                                        }}
                                                                                                        options={solabProject.buyAmountOptions.map(
                                                                                                            (
                                                                                                                option
                                                                                                            ) => ({
                                                                                                                label: option,
                                                                                                                value: option,
                                                                                                            })
                                                                                                        )}
                                                                                                        theme={(
                                                                                                            theme
                                                                                                        ) => {
                                                                                                            return {
                                                                                                                ...theme,
                                                                                                                colors: {
                                                                                                                    ...theme.colors,
                                                                                                                    neutral0:
                                                                                                                        '#0F1217',
                                                                                                                    neutral20:
                                                                                                                        '#1F2733',
                                                                                                                    neutral30:
                                                                                                                        '#1F2733',
                                                                                                                    primary:
                                                                                                                        '#1EE8BB',
                                                                                                                    primary50:
                                                                                                                        '#1EE8BB',
                                                                                                                    primary25:
                                                                                                                        '#1EE8BB',
                                                                                                                    neutral5:
                                                                                                                        '#1EE8BB',
                                                                                                                    neutral80:
                                                                                                                        '#E2E4E9',
                                                                                                                },
                                                                                                            };
                                                                                                        }}
                                                                                                        onChange={(
                                                                                                            selected
                                                                                                        ) => {
                                                                                                            setFieldValue(
                                                                                                                'usdcAmount',
                                                                                                                selected
                                                                                                                    ? selected.value
                                                                                                                    : solabProject
                                                                                                                        .buyAmountOptions[0]
                                                                                                            );
                                                                                                        }}
                                                                                                        className='w-full mt-1'
                                                                                                    />
                                                                                                    <p className='text-xs italic text-solabGray-100'>{`You will receive ${values.usdcAmount == 100 ? 10 : values.usdcAmount == 200 ? 25 : values.usdcAmount == 300 ? 50 : 0} lottery tickets. More tickets, more chance to win whitelist`}</p>
                                                                                                    <ErrorMessage
                                                                                                        name='usdcAmount'
                                                                                                        render={(
                                                                                                            msg
                                                                                                        ) => (
                                                                                                            <span
                                                                                                                className='text-xs text-red-500'>
                                                                                                                {
                                                                                                                    msg
                                                                                                                }
                                                                                                            </span>
                                                                                                        )}
                                                                                                    />
                                                                                                </div>
                                                                                                <p className='text-sm mt-4'>
                                                                                                    Based
                                                                                                    on
                                                                                                    Whitelist
                                                                                                    subscriptions,
                                                                                                    your
                                                                                                    investment
                                                                                                    limit
                                                                                                    will
                                                                                                    depend
                                                                                                    on
                                                                                                    Solab's
                                                                                                    allocation
                                                                                                    structure
                                                                                                    with
                                                                                                    random
                                                                                                    selection.
                                                                                                </p>
                                                                                                <p className='text-sm mt-4'>
                                                                                                    The
                                                                                                    system
                                                                                                    will
                                                                                                    automatically
                                                                                                    refund
                                                                                                    the
                                                                                                    prefunded
                                                                                                    USDC
                                                                                                    to
                                                                                                    your
                                                                                                    registered
                                                                                                    wallet
                                                                                                    address.
                                                                                                </p>
                                                                                                <div
                                                                                                    className='text-center mt-10'>
                                                                                                    {user.isKycVerified !==
                                                                                                    kycVerified ? (
                                                                                                        <>
                                                                                                            <p className='text-red-500'>
                                                                                                                KYC
                                                                                                                not
                                                                                                                yet
                                                                                                                verified!
                                                                                                            </p>
                                                                                                            <Link
                                                                                                                href={
                                                                                                                    routes
                                                                                                                        .app
                                                                                                                        .myAccount
                                                                                                                }
                                                                                                            >
                                                                                                                <button
                                                                                                                    className='py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-4/5'>
                                                                                                                    KYC
                                                                                                                    now!
                                                                                                                </button>
                                                                                                            </Link>
                                                                                                        </>
                                                                                                    ) : (
                                                                                                        <button
                                                                                                            type='submit'
                                                                                                            className='py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-4/5'
                                                                                                            disabled={
                                                                                                                isPurchaseProcessing
                                                                                                            }
                                                                                                        >
                                                                                                            Prefunding
                                                                                                        </button>
                                                                                                    )}
                                                                                                </div>
                                                                                            </Form>
                                                                                        );
                                                                                    }}
                                                                                </Formik>
                                                                            )}
                                                                        </div>
                                                                    ) : solabRegisterInfo ? (
                                                                        <div className='text-center py-32'>
                                                                            <h2 className='text-solabCyan-500 text-2xl flex text-center items-center justify-center'>
                                                                                <AiOutlineCheckCircle/>
                                                                                <span>
                                                                                    {' '}
                                                                                    Successful
                                                                                    prefund:{' '}
                                                                                    {
                                                                                        solabRegisterInfo.bought
                                                                                    }{' '}
                                                                                    USDC{' '}
                                                                                </span>
                                                                            </h2>
                                                                            <ul className='text-center mt-12'>
                                                                                <li className='flex items-center justify-center'>
                                                                                    <GoPrimitiveDot/>
                                                                                    <span>
                                                                                        The
                                                                                        list
                                                                                        of
                                                                                        winners
                                                                                        will
                                                                                        be
                                                                                        announced
                                                                                        on:{' '}
                                                                                        {format(
                                                                                            new Date(
                                                                                                solabProject.idoStartDate
                                                                                            ),
                                                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                                                        )}
                                                                                    </span>
                                                                                </li>
                                                                                <li className='flex items-center justify-center'>
                                                                                    <GoPrimitiveDot/>
                                                                                    <span>
                                                                                        The
                                                                                        system
                                                                                        will
                                                                                        automatically
                                                                                        transfer
                                                                                        the
                                                                                        token
                                                                                        to
                                                                                        your
                                                                                        registered
                                                                                        wallet.
                                                                                    </span>
                                                                                </li>
                                                                                <li className='flex items-center justify-center'>
                                                                                    <GoPrimitiveDot/>
                                                                                    <span>
                                                                                        Follow
                                                                                        @solabofficial
                                                                                        for
                                                                                        the
                                                                                        latest
                                                                                        updates!
                                                                                    </span>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='w-10 h-10 mx-auto relative'>
                                                                            <Image
                                                                                src={
                                                                                    loaderCyan
                                                                                }
                                                                                layout='fill'
                                                                            />

                                                                        </div>
                                                                    )
                                                                ) : (
                                                                    <p className='text-center'>
                                                                        Project
                                                                        not
                                                                        founded
                                                                    </p>
                                                                )
                                                            ) : (
                                                                <WalletMultiButton className='mx-auto'/>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='bg-solabGray-300 py-6 rounded-lg mt-8'>
                                                    <div className='text-center py-32'>
                                                        {user ? (
                                                            solabProject ? (
                                                                solabRegisterInfo &&
                                                                solabRegisterInfo.bought >
                                                                0 ? (
                                                                    <div className='text-center py-32'>
                                                                        <h2 className='text-solabCyan-500 text-2xl flex text-center items-center justify-center'>
                                                                            <AiOutlineCheckCircle/>
                                                                            <span>
                                                                                {' '}
                                                                                Successful
                                                                                prefund:{' '}
                                                                                {
                                                                                    solabRegisterInfo.bought
                                                                                }{' '}
                                                                                USDC{' '}
                                                                            </span>
                                                                        </h2>
                                                                        <ul className='text-center mt-12'>
                                                                            <li className='flex items-center justify-center'>
                                                                                <GoPrimitiveDot/>
                                                                                <span>
                                                                                    The
                                                                                    list
                                                                                    of
                                                                                    winners
                                                                                    will
                                                                                    be
                                                                                    announced
                                                                                    on:{' '}
                                                                                    {format(
                                                                                        new Date(
                                                                                            solabProject.idoStartDate
                                                                                        ),
                                                                                        'MMMM do yyyy, hh:mm a OOOO'
                                                                                    )}
                                                                                </span>
                                                                            </li>
                                                                            <li className='flex items-center justify-center'>
                                                                                <GoPrimitiveDot/>
                                                                                <span>
                                                                                    The
                                                                                    system
                                                                                    will
                                                                                    automatically
                                                                                    transfer
                                                                                    the
                                                                                    token
                                                                                    to
                                                                                    your
                                                                                    registered
                                                                                    wallet.
                                                                                </span>
                                                                            </li>
                                                                            <li className='flex items-center justify-center'>
                                                                                <GoPrimitiveDot/>
                                                                                <span>
                                                                                    Follow
                                                                                    @solabofficial
                                                                                    for
                                                                                    the
                                                                                    latest
                                                                                    updates!
                                                                                </span>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        {
                                                                            isAfter(new Date(), new Date(
                                                                                solabProject.idoEndDate
                                                                            )) ?
                                                                                <h3 className='text-yellow-500 text-xl'>
                                                                                    Whitelist registration has ended
                                                                                </h3> : <> <h3
                                                                                    className='text-yellow-500 text-xl'>
                                                                                    Note:
                                                                                    Make
                                                                                    sure
                                                                                    your
                                                                                    kyc
                                                                                    verified
                                                                                    in
                                                                                    order
                                                                                    to
                                                                                    register!
                                                                                </h3>
                                                                                    <button
                                                                                        className='py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-1/2 mx-auto mt-4'
                                                                                        onClick={() => {
                                                                                            router.push(
                                                                                                {
                                                                                                    pathname:
                                                                                                    routes
                                                                                                        .app
                                                                                                        .myAccount,
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Click
                                                                                        here
                                                                                        to
                                                                                        check
                                                                                        your
                                                                                        KYC!
                                                                                    </button>
                                                                                </>
                                                                        }

                                                                    </>
                                                                )
                                                            ) : (
                                                                <div className='text-center py-32'>
                                                                    <h2 className='text-solabCyan-500 text-2xl flex text-center items-center justify-center'>
                                                                        Project
                                                                        not
                                                                        founded
                                                                    </h2>
                                                                </div>
                                                            )
                                                        ) : (
                                                            <WalletMultiButton className='mx-auto'/>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {isBefore(
                                                new Date(),
                                                new Date(
                                                    solabProject.idoEndDate
                                                )
                                            ) ? (
                                                <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                                    <div className='rounded-lg bg-solabGray-300 p-4'>
                                                        <h2 className='text-2xl font-bold'>
                                                            Social Tasks
                                                        </h2>
                                                        <p className='mt-4 test-sm'>
                                                            You can collect
                                                            social ticket by
                                                            performing various
                                                            social task:
                                                        </p>
                                                        <div className='mt-4'>
                                                            {solabProject &&
                                                            solabProject.task
                                                                ? solabProject.task
                                                                    .filter(
                                                                        (t) =>
                                                                            t.taskType ===
                                                                            solabProjectConstants.taskTypeCommunity
                                                                    )
                                                                    .map(
                                                                        (
                                                                            ta
                                                                        ) => (
                                                                            <div
                                                                                className='flex items-center justify-between text-sm mt-1'>
                                                                                <div className='flex items-center pr-2'>
                                                                                    <div
                                                                                        className='p-2 rounded border border-solabGray-50'>
                                                                                        {getSocialIcon(
                                                                                            ta
                                                                                                .settings
                                                                                                .social,
                                                                                            'h-6 w-6',
                                                                                            true
                                                                                        )}
                                                                                    </div>
                                                                                    <span
                                                                                        className='ml-2 text-solabGray-100 text-xs sm:text-base'>
                                                                                          {
                                                                                              ta
                                                                                                  .settings
                                                                                                  .description
                                                                                          }{' '}
                                                                                        {
                                                                                            ': '
                                                                                        }
                                                                                        {`${
                                                                                            ta.doneBy.includes(
                                                                                                user?._id as string
                                                                                            )
                                                                                                ? ta.rewardTickets
                                                                                                : 0
                                                                                        }/${
                                                                                            ta.rewardTickets
                                                                                        } collected`}
                                                                                      </span>
                                                                                </div>
                                                                                {user ? (
                                                                                    ta.doneBy.includes(
                                                                                        user._id
                                                                                    ) ? (
                                                                                        <div
                                                                                            className='p-2 rounded border border-solabCyan-500'>
                                                                                            <AiOutlineCheckCircle
                                                                                                className='h-5 w-5 text-solabCyan-500'/>
                                                                                        </div>
                                                                                    ) : ta
                                                                                        .settings
                                                                                        .requireUserLink ? (
                                                                                        <button
                                                                                            className='p-2 rounded border border-solabCyan-500 text-solabCyan-500'
                                                                                            onClick={() => {
                                                                                                dispatch(
                                                                                                    solabProjectActions.openTaskModal(
                                                                                                        {
                                                                                                            taskData:
                                                                                                            ta,
                                                                                                        }
                                                                                                    )
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            +{' '}
                                                                                            {
                                                                                                ta.rewardTickets
                                                                                            }
                                                                                        </button>
                                                                                    ) : (
                                                                                        <Link
                                                                                            href={
                                                                                                ta
                                                                                                    .settings
                                                                                                    .link
                                                                                            }
                                                                                        >
                                                                                            <a
                                                                                                target='_blank'
                                                                                                onClick={() => {
                                                                                                    dispatch(
                                                                                                        solabProjectActions.doCommunityTask(
                                                                                                            {
                                                                                                                taskUuid:
                                                                                                                ta.uuid,
                                                                                                                walletAddress:
                                                                                                                user.walletAddress,
                                                                                                            }
                                                                                                        )
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <div
                                                                                                    className='p-2 rounded border border-solabCyan-500 text-solabCyan-500'>
                                                                                                    +{' '}
                                                                                                    {
                                                                                                        ta.rewardTickets
                                                                                                    }
                                                                                                </div>
                                                                                            </a>
                                                                                        </Link>
                                                                                    )
                                                                                ) : (
                                                                                    <div
                                                                                        className='p-1 sm:p-2 rounded border border-solabGray-100 text-solabGray-100 cursor-pointer relative group text-xs whitespace-nowrap'
                                                                                        title='Wallet is not connected'
                                                                                    >
                                                                                          <span
                                                                                              className='whitespace-nowrap'>
                                                                                              {' '}
                                                                                              +{' '}
                                                                                              {
                                                                                                  ta.rewardTickets
                                                                                              }
                                                                                          </span>
                                                                                        <span
                                                                                            className='bg-solabGray-300 absolute hidden group-hover:inline-block whitespace-nowrap text-xxs px-2 py-1 -top-3 right-0'>
                                                                                              Wallet
                                                                                              is
                                                                                              not
                                                                                              connected
                                                                                          </span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )
                                                                    )
                                                                : null}
                                                        </div>
                                                    </div>
                                                    <div className='rounded-lg bg-solabGray-300 p-4'>
                                                        <h2 className='text-2xl font-bold'>
                                                            Invite your friends
                                                        </h2>
                                                        <p className='mt-4 test-sm'>
                                                            You can collect
                                                            tickets by inviting
                                                            your friends to join
                                                            this project:
                                                        </p>
                                                        <div className='flex items-center mt-4 gap-4'>
                                                            <input
                                                                disabled={
                                                                    !getRefLink()
                                                                }
                                                                type='text'
                                                                className='input input-cyan w-3/4 text-sm'
                                                                value={`${
                                                                    !getRefLink()
                                                                        ? 'Wallet is not connected'
                                                                        : getRefLink()
                                                                }`}
                                                            />
                                                            <button
                                                                disabled={
                                                                    !getRefLink()
                                                                }
                                                                type='button'
                                                                className='py-2 px-4 border text-solabWhite-500 border-solabCyan-500 rounded-lg inline text-sm'
                                                                onClick={() => {
                                                                    copy(
                                                                        getRefLink()
                                                                            ? (getRefLink() as string)
                                                                            : ''
                                                                    );
                                                                    toast.success(
                                                                        'Ref link copied to clipboard',
                                                                        toastConfigs.success
                                                                    );
                                                                }}
                                                            >
                                                                Copy Link
                                                            </button>
                                                        </div>
                                                        <p className='mt-6 text-sm'>
                                                            Rules
                                                        </p>
                                                        <ul className='list-disc px-4 text-sm'>
                                                            <li>
                                                                Get 3 tickets
                                                                when your
                                                                friends
                                                                successfully
                                                                registered this
                                                                project.
                                                            </li>
                                                            <li>
                                                                Get 7 tickets
                                                                when your
                                                                friends have
                                                                been completed
                                                                Commit USDC
                                                                step.
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel className='overflow-x-auto'>
                                        <Tabs
                                            className='lg:flex text-solabGray-100 gap-x-8 overflow-x-auto'
                                            selectedTabClassName='font-bold text-solabCyan-500 active-dot'
                                            selectedTabPanelClassName='py-8 px-10 bg-solabGray-300 rounded-lg text-solabWhite-500'
                                        >
                                            <TabList
                                                className='lg:block flex gap-x-4 overflow-x-auto lg:overflow-x-visible'>
                                                {solabProject.details?.map(
                                                    (detail) => (
                                                        <ReactTab
                                                            className={`w-min whitespace-nowrap cursor-pointer`}
                                                        >
                                                            {detail.title}
                                                        </ReactTab>
                                                    )
                                                )}
                                            </TabList>

                                            <div className='w-full'>
                                                {solabProject.details?.map(
                                                    (detail) => (
                                                        <TabPanel className='mt-8 lg:mt-0 overflow-x-auto'>
                                                            {ReactHtmlParser(
                                                                detail.content
                                                            )}
                                                        </TabPanel>
                                                    )
                                                )}
                                            </div>
                                        </Tabs>
                                    </Tab.Panel>
                                    <Tab.Panel className='overflow-x-auto'>
                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                            <div className='rounded-lg bg-solabGray-300 p-4'>
                                                <h2 className='text-2xl font-bold'>
                                                    IDO Schedule
                                                </h2>
                                                <div
                                                    className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        Whitelist Registration
                                                        Start
                                                    </span>
                                                    <span className='text-sm'>
                                                        {format(
                                                            new Date(
                                                                '2021-12-28T02:00:00.000+00:00'
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        Social Task Start
                                                    </span>
                                                    <span className='text-sm'>
                                                        {format(
                                                            new Date(
                                                                '2021-12-28T02:00:00.000+00:00'
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        Commit USDC
                                                    </span>
                                                    <span className='text-sm'>
                                                        {format(
                                                            new Date(
                                                                solabProject.idoStartDate
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        Whitelist Registration
                                                        End
                                                    </span>
                                                    <span className='text-sm'>
                                                        {format(
                                                            new Date(
                                                                solabProject.idoEndDate
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        Token distribution
                                                    </span>
                                                    <span className='text-sm'>
                                                        {format(
                                                            new Date(
                                                                solabProject.firstPayment.date
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </>
                ) : (
                    <div className='text-center mx-auto'>
                        <Image src={loaderCyan} height={100} width={100}/>
                    </div>
                )}
            </div>
            <TaskModal/>
        </Container>
    );
};

export default SolabIDO;
