import type { NextPage } from 'next';
import Container from '../components/app/layout/Container';
import Link from 'next/link';
import { FaTelegramPlane } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import NumberFormat from 'react-number-format';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateActiveHeaderItem } from '../features/layout/layoutSlice';
import { appHeaderOptions } from '../features/layout/types';
import { Fragment, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { tierActions } from '../features/tier/tierSlice';
import { getProjectPhraseStatusTag } from '../features/project/components';
import { format } from 'date-fns';

SwiperCore.use([Pagination, Autoplay]);

import { ITier } from '../features/tier/types';
import { useRouter } from 'next/router';
import routes from '../config/routes';
import { projectActions } from '../features/project/projectSlice';
import { useConnection } from '@solana/wallet-adapter-react';
import { web3 } from '@project-serum/anchor';
import { stakePubKey } from '../config/stake';
import { solabPubKey } from '../config/token';
import { configActions } from '../features/config/configSlice';
import { solabPriceSlug } from '../features/config/constants';

const Home: NextPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(updateActiveHeaderItem(appHeaderOptions.home));
    }, [dispatch]);
    useEffect(() => {
        dispatch(tierActions.fetchTiersApp());
        dispatch(projectActions.fetchProjectsByPhrase());
    }, []);
    const [currentStakeAmount, setCurrentStakeAmount] = useState<number>(0);
    const [currentStakeValue, setCurrentStakeValue] = useState<number>(0);
    const { connection } = useConnection();
    const solabPriceConfig = useAppSelector(
        (state) => state.config.app.solabPriceConfig
    );
    const tiers = useAppSelector((state) => state.tier.app.tiers);
    const projectsByPhrase = useAppSelector(
        (state) => state.project.app.projectsByPhrase
    );
    const getTiersSlice = () => {
        const chunkedTiers: ITier[][] = [];
        const copyTier: ITier[] = [...tiers];
        while (copyTier.length > 0) {
            chunkedTiers.push(copyTier.splice(0, 3));
        }
        return chunkedTiers;
    };
    const getStakeAmount = () => {
        connection
            .getParsedTokenAccountsByOwner(new web3.PublicKey(stakePubKey), {
                mint: new web3.PublicKey(solabPubKey),
            })
            .then((res) => {
                const stakeAmount =
                    res.value[0].account.data.parsed.info.tokenAmount.uiAmount;
                setCurrentStakeAmount(stakeAmount);
            });
    };

    useEffect(() => {
        if (window.location.host === 'solabstaking.co') {
            router.push('https://solab.finance');
        }
        dispatch(configActions.appFetchConfigBySlug({ slug: solabPriceSlug }));
        getStakeAmount();
    }, []);
    useEffect(() => {
        setCurrentStakeValue(
            currentStakeAmount * (solabPriceConfig.value as number)
        );
    }, [solabPriceConfig, currentStakeAmount]);

    return (
        <Container>
            <div className='banner pt-20 max-w-7xl mx-auto'>
                <div className='px-4'>
                    <div className='grid lg:grid-cols-7 auto-cols-fr'>
                        <div className='col-span-4'>
                            <h1 className='text-solabWhite-500 text-3xl sm:text-4xl'>
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
                            <button
                                className='bg-solabCyan-500 text-solabBlack-500 py-4 px-16 rounded mt-10 hover:opacity-80'
                                onClick={() => {
                                    router.push(routes.app.idoSolab);
                                }}
                            >
                                IDO SOLAB
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
                                <NumberFormat
                                    thousandsGroupStyle='thousand'
                                    value={8831215.48}
                                    displayType='text'
                                    thousandSeparator={true}
                                    decimalScale={2}
                                />
                            </h1>
                            <p className='text-sm text-solabGray-100'>
                                SOLAB STAKED
                            </p>
                        </div>
                        <div className='text-center border border-solabGray-50 py-4'>
                            <h1 className='text-solabCyan-500 text-2xl lg:text-3xl'>
                                <NumberFormat
                                    thousandsGroupStyle='thousand'
                                    value={52987.29}
                                    displayType='text'
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    prefix='$'
                                />
                            </h1>
                            <p className='text-sm text-solabGray-100'>
                                TOTAL VALUE STAKED
                            </p>
                        </div>
                        <div className='text-center border border-solabGray-50 py-4'>
                            <h1 className='text-solabCyan-500 text-2xl lg:text-3xl'>
                                <NumberFormat
                                    thousandsGroupStyle='thousand'
                                    value={985.5}
                                    displayType='text'
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    suffix=' %'
                                />
                            </h1>
                            <p className='text-sm text-solabGray-100'>APY</p>
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
                            <Tab.List className='border-b border-solabGray-50 gap-x-6 flex overflow-x-auto'>
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
                                                WHITELIST REGISTRATION
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
                                                SALE
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
                                                DISTRIBUTION
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
                                                TBA
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
                                                CLOSED
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
                                        {projectsByPhrase.all.map((project) => (
                                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                <div
                                                    style={{
                                                        backgroundImage: `url('${project.thumbnail}')`,
                                                    }}
                                                    className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                                >
                                                    {getProjectPhraseStatusTag(
                                                        project
                                                    )}
                                                </div>
                                                <div className='m-4 flex gap-x-4'>
                                                    <div
                                                        className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                        style={{
                                                            backgroundImage: `url('${project.token.thumbnail}')`,
                                                        }}
                                                    ></div>
                                                    <div className='flex flex-col justify-center'>
                                                        <p className='font-bold'>
                                                            {project.name}
                                                        </p>
                                                        <p className='text-solabGray-100'>
                                                            $
                                                            {
                                                                project.token
                                                                    .symbol
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='px-4 text-solabGray-100 text-sm'>
                                                    {project.description}
                                                </div>
                                                <div className='mt-4 px-4'>
                                                    <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                        <span className='font-bold'>
                                                            Raise amount
                                                        </span>
                                                        <span className='text-solabGray-100'>
                                                            <NumberFormat
                                                                thousandsGroupStyle='thousand'
                                                                value={
                                                                    project.raiseAmount
                                                                }
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
                                                            {project.isPhraseTBA
                                                                ? 'TBA'
                                                                : format(
                                                                      new Date(
                                                                          project.phrases.whitelist.startDate
                                                                      ),
                                                                      'LLL dd, yyyy'
                                                                  )}
                                                        </span>
                                                    </div>
                                                    <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                        <span className='font-bold'>
                                                            Price per token
                                                        </span>
                                                        <span className='text-solabGray-100'>
                                                            {project.idoPrice >
                                                            0 ? (
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.idoPrice
                                                                    }
                                                                    displayType='text'
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    prefix='$'
                                                                />
                                                            ) : (
                                                                'TBA'
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                {!project.isTBA ? (
                                                    <div className='px-4 mt-4 text-right'>
                                                        <Link
                                                            href={`${
                                                                !project.isTBA
                                                                    ? `/project/${project.slug}`
                                                                    : '#'
                                                            }`}
                                                        >
                                                            <a className='text-gradient-1'>
                                                                View detail
                                                            </a>
                                                        </Link>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                        {projectsByPhrase.upcoming.map(
                                            (project) => (
                                                <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('${project.thumbnail}')`,
                                                        }}
                                                        className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                                    >
                                                        {getProjectPhraseStatusTag(
                                                            project
                                                        )}
                                                    </div>
                                                    <div className='m-4 flex gap-x-4'>
                                                        <div
                                                            className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                            style={{
                                                                backgroundImage: `url('${project.token.thumbnail}')`,
                                                            }}
                                                        ></div>
                                                        <div className='flex flex-col justify-center'>
                                                            <p className='font-bold'>
                                                                {project.name}
                                                            </p>
                                                            <p className='text-solabGray-100'>
                                                                $
                                                                {
                                                                    project
                                                                        .token
                                                                        .symbol
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='px-4 text-solabGray-100 text-sm'>
                                                        {project.description}
                                                    </div>
                                                    <div className='mt-4 px-4'>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Raise amount
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.raiseAmount
                                                                    }
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
                                                                {project.isPhraseTBA
                                                                    ? 'TBA'
                                                                    : format(
                                                                          new Date(
                                                                              project.phrases.whitelist.startDate
                                                                          ),
                                                                          'LLL dd, yyyy'
                                                                      )}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Price per token
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.idoPrice
                                                                    }
                                                                    displayType='text'
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    prefix='$'
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {!project.isTBA ? (
                                                        <div className='px-4 mt-4 text-right'>
                                                            <Link
                                                                href={`${
                                                                    !project.isTBA
                                                                        ? `/project/${project.slug}`
                                                                        : '#'
                                                                }`}
                                                            >
                                                                <a className='text-gradient-1'>
                                                                    View detail
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                        {projectsByPhrase.whitelist.map(
                                            (project) => (
                                                <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('${project.thumbnail}')`,
                                                        }}
                                                        className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                                    >
                                                        {getProjectPhraseStatusTag(
                                                            project
                                                        )}
                                                    </div>
                                                    <div className='m-4 flex gap-x-4'>
                                                        <div
                                                            className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                            style={{
                                                                backgroundImage: `url('${project.token.thumbnail}')`,
                                                            }}
                                                        ></div>
                                                        <div className='flex flex-col justify-center'>
                                                            <p className='font-bold'>
                                                                {project.name}
                                                            </p>
                                                            <p className='text-solabGray-100'>
                                                                $
                                                                {
                                                                    project
                                                                        .token
                                                                        .symbol
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='px-4 text-solabGray-100 text-sm'>
                                                        {project.description}
                                                    </div>
                                                    <div className='mt-4 px-4'>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Raise amount
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.raiseAmount
                                                                    }
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
                                                                {project.isPhraseTBA
                                                                    ? 'TBA'
                                                                    : format(
                                                                          new Date(
                                                                              project.phrases.whitelist.startDate
                                                                          ),
                                                                          'LLL dd, yyyy'
                                                                      )}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Price per token
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.idoPrice
                                                                    }
                                                                    displayType='text'
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    prefix='$'
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {!project.isTBA ? (
                                                        <div className='px-4 mt-4 text-right'>
                                                            <Link
                                                                href={`${
                                                                    !project.isTBA
                                                                        ? `/project/${project.slug}`
                                                                        : '#'
                                                                }`}
                                                            >
                                                                <a className='text-gradient-1'>
                                                                    View detail
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                        {projectsByPhrase.sale.map(
                                            (project) => (
                                                <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('${project.thumbnail}')`,
                                                        }}
                                                        className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                                    >
                                                        {getProjectPhraseStatusTag(
                                                            project
                                                        )}
                                                    </div>
                                                    <div className='m-4 flex gap-x-4'>
                                                        <div
                                                            className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                            style={{
                                                                backgroundImage: `url('${project.token.thumbnail}')`,
                                                            }}
                                                        ></div>
                                                        <div className='flex flex-col justify-center'>
                                                            <p className='font-bold'>
                                                                {project.name}
                                                            </p>
                                                            <p className='text-solabGray-100'>
                                                                $
                                                                {
                                                                    project
                                                                        .token
                                                                        .symbol
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='px-4 text-solabGray-100 text-sm'>
                                                        {project.description}
                                                    </div>
                                                    <div className='mt-4 px-4'>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Raise amount
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.raiseAmount
                                                                    }
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
                                                                {project.isPhraseTBA
                                                                    ? 'TBA'
                                                                    : format(
                                                                          new Date(
                                                                              project.phrases.whitelist.startDate
                                                                          ),
                                                                          'LLL dd, yyyy'
                                                                      )}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Price per token
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.idoPrice
                                                                    }
                                                                    displayType='text'
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    prefix='$'
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {!project.isTBA ? (
                                                        <div className='px-4 mt-4 text-right'>
                                                            <Link
                                                                href={`${
                                                                    !project.isTBA
                                                                        ? `/project/${project.slug}`
                                                                        : '#'
                                                                }`}
                                                            >
                                                                <a className='text-gradient-1'>
                                                                    View detail
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                        {projectsByPhrase.distribution.map(
                                            (project) => (
                                                <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('${project.thumbnail}')`,
                                                        }}
                                                        className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                                    >
                                                        {getProjectPhraseStatusTag(
                                                            project
                                                        )}
                                                    </div>
                                                    <div className='m-4 flex gap-x-4'>
                                                        <div
                                                            className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                            style={{
                                                                backgroundImage: `url('${project.token.thumbnail}')`,
                                                            }}
                                                        ></div>
                                                        <div className='flex flex-col justify-center'>
                                                            <p className='font-bold'>
                                                                {project.name}
                                                            </p>
                                                            <p className='text-solabGray-100'>
                                                                $
                                                                {
                                                                    project
                                                                        .token
                                                                        .symbol
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='px-4 text-solabGray-100 text-sm'>
                                                        {project.description}
                                                    </div>
                                                    <div className='mt-4 px-4'>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Raise amount
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.raiseAmount
                                                                    }
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
                                                                {project.isPhraseTBA
                                                                    ? 'TBA'
                                                                    : format(
                                                                          new Date(
                                                                              project.phrases.whitelist.startDate
                                                                          ),
                                                                          'LLL dd, yyyy'
                                                                      )}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Price per token
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.idoPrice
                                                                    }
                                                                    displayType='text'
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    prefix='$'
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {!project.isTBA ? (
                                                        <div className='px-4 mt-4 text-right'>
                                                            <Link
                                                                href={`${
                                                                    !project.isTBA
                                                                        ? `/project/${project.slug}`
                                                                        : '#'
                                                                }`}
                                                            >
                                                                <a className='text-gradient-1'>
                                                                    View detail
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                        {projectsByPhrase.tba.map((project) => (
                                            <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                <div
                                                    style={{
                                                        backgroundImage: `url('${project.thumbnail}')`,
                                                    }}
                                                    className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                                >
                                                    {getProjectPhraseStatusTag(
                                                        project
                                                    )}
                                                </div>
                                                <div className='m-4 flex gap-x-4'>
                                                    <div
                                                        className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                        style={{
                                                            backgroundImage: `url('${project.token.thumbnail}')`,
                                                        }}
                                                    ></div>
                                                    <div className='flex flex-col justify-center'>
                                                        <p className='font-bold'>
                                                            {project.name}
                                                        </p>
                                                        <p className='text-solabGray-100'>
                                                            $
                                                            {
                                                                project.token
                                                                    .symbol
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='px-4 text-solabGray-100 text-sm'>
                                                    {project.description}
                                                </div>
                                                <div className='mt-4 px-4'>
                                                    <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                        <span className='font-bold'>
                                                            Raise amount
                                                        </span>
                                                        <span className='text-solabGray-100'>
                                                            <NumberFormat
                                                                thousandsGroupStyle='thousand'
                                                                value={
                                                                    project.raiseAmount
                                                                }
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
                                                            {project.isPhraseTBA
                                                                ? 'TBA'
                                                                : format(
                                                                      new Date(
                                                                          project.phrases.whitelist.startDate
                                                                      ),
                                                                      'LLL dd, yyyy'
                                                                  )}
                                                        </span>
                                                    </div>
                                                    <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                        <span className='font-bold'>
                                                            Price per token
                                                        </span>
                                                        <span className='text-solabGray-100'>
                                                            <NumberFormat
                                                                thousandsGroupStyle='thousand'
                                                                value={
                                                                    project.idoPrice
                                                                }
                                                                displayType='text'
                                                                thousandSeparator={
                                                                    true
                                                                }
                                                                prefix='$'
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                                {!project.isTBA ? (
                                                    <div className='px-4 mt-4 text-right'>
                                                        <Link
                                                            href={`${
                                                                !project.isTBA
                                                                    ? `/project/${project.slug}`
                                                                    : '#'
                                                            }`}
                                                        >
                                                            <a className='text-gradient-1'>
                                                                View detail
                                                            </a>
                                                        </Link>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                        {projectsByPhrase.closed.map(
                                            (project) => (
                                                <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 pb-5'>
                                                    <div
                                                        style={{
                                                            backgroundImage: `url('${project.thumbnail}')`,
                                                        }}
                                                        className='bg-no-repeat bg-center bg-cover h-56 rounded-t-lg relative'
                                                    >
                                                        {getProjectPhraseStatusTag(
                                                            project
                                                        )}
                                                    </div>
                                                    <div className='m-4 flex gap-x-4'>
                                                        <div
                                                            className='h-16 w-16 bg-no-repeat bg-center bg-cover rounded'
                                                            style={{
                                                                backgroundImage: `url('${project.token.thumbnail}')`,
                                                            }}
                                                        ></div>
                                                        <div className='flex flex-col justify-center'>
                                                            <p className='font-bold'>
                                                                {project.name}
                                                            </p>
                                                            <p className='text-solabGray-100'>
                                                                $
                                                                {
                                                                    project
                                                                        .token
                                                                        .symbol
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='px-4 text-solabGray-100 text-sm'>
                                                        {project.description}
                                                    </div>
                                                    <div className='mt-4 px-4'>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Raise amount
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.raiseAmount
                                                                    }
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
                                                                {project.isPhraseTBA
                                                                    ? 'TBA'
                                                                    : format(
                                                                          new Date(
                                                                              project.phrases.whitelist.startDate
                                                                          ),
                                                                          'LLL dd, yyyy'
                                                                      )}
                                                            </span>
                                                        </div>
                                                        <div className='flex justify-between items-center mt-0.5 mb-0.5'>
                                                            <span className='font-bold'>
                                                                Price per token
                                                            </span>
                                                            <span className='text-solabGray-100'>
                                                                <NumberFormat
                                                                    thousandsGroupStyle='thousand'
                                                                    value={
                                                                        project.idoPrice
                                                                    }
                                                                    displayType='text'
                                                                    thousandSeparator={
                                                                        true
                                                                    }
                                                                    prefix='$'
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {!project.isTBA ? (
                                                        <div className='px-4 mt-4 text-right'>
                                                            <Link
                                                                href={`${
                                                                    !project.isTBA
                                                                        ? `/project/${project.slug}`
                                                                        : '#'
                                                                }`}
                                                            >
                                                                <a className='text-gradient-1'>
                                                                    View detail
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )
                                        )}
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
                                                <div className='mt-8 px-4 text-sm lg:text-base'>
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
                                                <div className='mt-8 px-4 text-sm lg:text-base'>
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
                                                <div className='mt-8 px-4 text-sm lg:text-base'>
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
            {/* <div className='mt-32 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <div>
                            <h1 className='text-center text-3xl font-bold'>
                                Our mission
                            </h1>
                            <p className='mt-4'>
                                Our issue with most launchpad projects and
                                platforms is that they are basically fully
                                centralized. Acentral entity manages which
                                projects are allowed on the platform, most of
                                the time combined with a lot of insider
                                information and trading.
                            </p>
                            <p className='mt-4'>
                                Solab is an open platform where everyone can
                                create a pool and raise funds. And we have many
                                other products in the pipeline. Our token is
                                integrated into every product on the
                                platform.ltimate solution to these problems.
                            </p>
                        </div>
                        <div>
                            <iframe
                                className='w-full'
                                height={350}
                                src='https://www.youtube.com/embed/PQRsR807fS8'
                                title='YouTube video player'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='mt-32 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-center text-3xl font-bold'>
                        Media Partners
                    </h1>
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
                                            backgroundImage: `url('https://solab-media.s3.ap-southeast-1.amazonaws.com/content/press/prn_twitter_sharing_logo.png')`,
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
                                    Q4, 2022
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
