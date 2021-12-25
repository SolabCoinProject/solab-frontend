import type { NextPage } from 'next';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Container from '../components/app/layout/Container';
import { solabProjectActions } from '../features/solabProject/solabProjectSlice';
import Image from 'next/image';
import loaderCyan from '../assets/images/loader-cyan.svg';
import Link from 'next/link';
import { getSocialIcon, getTaskIcon } from '../features/solabProject/contants';
import solabProjectConstants from '../features/solabProject/contants';
import NumberFormat from 'react-number-format';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { FreeMode, Navigation, Thumbs, Pagination } from 'swiper';
import { differenceInSeconds, format, isAfter, isBefore } from 'date-fns';
SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

import Countdown from 'react-countdown';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';

import { AiOutlineCheck } from 'react-icons/ai';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { url, recaptchaSiteKey } from '../config/app';
import { usdcPubKey } from '../config/token';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import toastConfigs from '../config/toast';
import ReCAPTCHA from 'react-google-recaptcha';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { web3 } from '@project-serum/anchor';
import { getOrCreateAssociatedTokenAccount } from '../libs/getOrCreateAssociatedTokenAccount';
import { createTransferInstruction } from '../libs/createTransferInstructions';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const SolabIDO: NextPage = () => {
    const dispatch = useAppDispatch();
    const solabProject = useAppSelector(
        (state) => state.solabProject.app.solabProject
    );
    const user = useAppSelector((state) => state.user.app.user);
    const isPurchaseProcessing = useAppSelector(
        (state) => state.solabProject.app.isPurchaseProcessing
    );
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isCaptchaDone, setIsCaptchaDone] = useState<boolean>(false);

    const { publicKey, sendTransaction, signTransaction } = useWallet();
    const { connection } = useConnection();

    useEffect(() => {
        dispatch(solabProjectActions.fetchSolabProject());
    }, []);

    const router = useRouter();

    const countDownRenderFunc = ({
        hours,
        minutes,
        seconds,
        completed,
        days,
    }) => {
        if (completed) {
            return (
                <button
                    type='button'
                    className='py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 mx-auto'
                    onClick={() => {
                        router.reload();
                    }}
                >
                    Click here to reload
                </button>
            );
        }
        return (
            <div className='w-11/12 mx-auto mt-4'>
                <h3 className='text-center text-solabGray-100 text-lg md:text-xl'>
                    Whitelist start in
                </h3>
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
            } else if (
                isBefore(new Date(), new Date(solabProject.idoStartDate))
            ) {
                const seconds = differenceInSeconds(
                    new Date(solabProject.idoStartDate),
                    new Date()
                );
                result.status = 'In preparation';
                result.countDown = (
                    <>
                        <Countdown
                            date={Date.now() + seconds * 1000}
                            autoStart={true}
                            renderer={countDownRenderFunc}
                        />
                        <p className='text-solabGray-100 text-center text-sm md:text-base mt-4'>
                            Whitelist registration will start in{' '}
                            {format(
                                new Date(solabProject.idoStartDate),
                                'MMMM do yyyy, hh a OOOO'
                            )}
                        </p>
                    </>
                );
            } else if (isAfter(new Date(), new Date(solabProject.idoEndDate))) {
                result.status = 'Distribution';
            } else {
                result.status = 'Whitelist registration';
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
                dispatch(
                    solabProjectActions.processPurchaseInfo({
                        walletAddress: user.walletAddress,
                        signature,
                        amount: usdcAmount,
                    })
                );
            } catch (err: any) {
                toast.error(
                    'Please check your wallet connection and USDC balance!',
                    toastConfigs.error
                );
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
                                                <div className='w-10 h-10 flex items-center justify-center bg-solabGray-300 rounded'>
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
                                        thumbs={{ swiper: thumbsSwiper }}
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
                            <div className='bg-solabGray-300 p-6 rounded-lg'>
                                <h2 className='text-xl md:text-2xl font-bold'>
                                    Project Key Metrics
                                </h2>
                                {solabProject.keyMetrics?.map((item) => (
                                    <div className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
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
                                <div className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                    <span className='text-solabGray-100 text-sm'>
                                        Status
                                    </span>
                                    <span className='font-bold py-1 px-2 bg-solabWhite-700 text-solabBlack-500 rounded text-sm'>
                                        {getProjectPhraseAndCountDown().status}
                                    </span>
                                </div>
                                <div className='w-full text-center mt-4'>
                                    {getProjectPhraseAndCountDown().countDown}

                                    {user ? (
                                        !solabProject.registeredUsers.includes(
                                            user._id
                                        ) ? (
                                            isAfter(
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
                                                !isCaptchaDone ? (
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
                                                ) : (
                                                    <Formik
                                                        enableReinitialize
                                                        initialValues={{
                                                            usdcAmount: 1,
                                                        }}
                                                        onSubmit={async (
                                                            values,
                                                            { setSubmitting }
                                                        ) => {
                                                            dispatch(
                                                                solabProjectActions.processPurchase()
                                                            );
                                                            await purchaseSubmitted(
                                                                values.usdcAmount
                                                            );
                                                        }}
                                                        validationSchema={Yup.object().shape(
                                                            {
                                                                usdcAmount:
                                                                    Yup.mixed().oneOf(
                                                                        [
                                                                            1,
                                                                            2,
                                                                            3,
                                                                        ],
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
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        <Select
                                                                            value={{
                                                                                label: values.usdcAmount,
                                                                                value: values.usdcAmount,
                                                                            }}
                                                                            options={[
                                                                                {
                                                                                    label: 1,
                                                                                    value: 1,
                                                                                },
                                                                                {
                                                                                    label: 2,
                                                                                    value: 2,
                                                                                },
                                                                                {
                                                                                    label: 3,
                                                                                    value: 3,
                                                                                },
                                                                            ]}
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
                                                                                        : 0
                                                                                );
                                                                            }}
                                                                            className='w-full'
                                                                        />
                                                                        <ErrorMessage
                                                                            name='usdcAmount'
                                                                            render={(
                                                                                msg
                                                                            ) => (
                                                                                <span className='text-xs text-red-500'>
                                                                                    {
                                                                                        msg
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <button type='submit'>
                                                                        Submit
                                                                    </button>
                                                                </Form>
                                                            );
                                                        }}
                                                    </Formik>
                                                )
                                            ) : null
                                        ) : (
                                            "You've already registered whitelist for this project"
                                        )
                                    ) : (
                                        <WalletMultiButton className='mx-auto' />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='mt-8'>
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
                                                    IDO SCHEDULE
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
                                                    DESCRIPTION
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
                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                            <div className='rounded-lg bg-solabGray-300 p-4'>
                                                <h2 className='text-2xl font-bold'>
                                                    IDO Schedule
                                                </h2>
                                                <div className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        Sale start date
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
                                                <div className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        Sale end date
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
                                                <div className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        First distribution (
                                                        {`${solabProject.firstPayment.amount} %`}
                                                        )
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
                                                <div className='mt-4 border-b border-solabGray-50 flex justify-between items-center pb-4'>
                                                    <span className='text-solabGray-100 text-sm'>
                                                        Last distribution (
                                                        {`${solabProject.lastPayment.amount} %`}
                                                        )
                                                    </span>
                                                    <span className='text-sm'>
                                                        {format(
                                                            new Date(
                                                                solabProject.lastPayment.date
                                                            ),
                                                            'MMMM do yyyy, hh:mm a OOOO'
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='rounded-lg bg-solabGray-300 p-4'>
                                                <h2 className='text-2xl font-bold'>
                                                    Your tickets
                                                </h2>
                                                <p>
                                                    <span className='text-solabGray-100'>
                                                        Total ticket(s):
                                                    </span>
                                                    <span className='ml-1'>
                                                        {solabProject.task
                                                            ? solabProject.task.reduce(
                                                                  (
                                                                      total,
                                                                      t
                                                                  ) => {
                                                                      return (
                                                                          total +
                                                                          t.rewardTickets
                                                                      );
                                                                  },
                                                                  0
                                                              )
                                                            : 0}
                                                    </span>
                                                </p>
                                                <hr className='bg-solabGray-50 mt-4' />
                                                <p className='text-sm mt-4'>
                                                    You can collect Social
                                                    Ticket by performing various
                                                    social task
                                                </p>
                                                <div className='mt-4'>
                                                    {solabProject.task
                                                        ? solabProject.task.map(
                                                              (t) => (
                                                                  <div className='flex justify-between items-center'>
                                                                      <div className='flex mb-4 items-center'>
                                                                          <div className='w-10 h-10 flex items-center justify-center bg-solabGray-300 rounded border border-solabGray-50'>
                                                                              {getTaskIcon(
                                                                                  t.taskType,
                                                                                  'w-4 h-4'
                                                                              )}
                                                                          </div>
                                                                          <span className='ml-2 text-sm text-solabGray-100'>
                                                                              {`${t.settings.description} (${t.rewardTickets})`}
                                                                          </span>
                                                                      </div>
                                                                      {user ? (
                                                                          t.taskType ===
                                                                          solabProjectConstants.taskTypeCommunity ? (
                                                                              t.doneBy.includes(
                                                                                  user._id
                                                                              ) ? (
                                                                                  <AiOutlineCheck />
                                                                              ) : (
                                                                                  <Link
                                                                                      href={
                                                                                          t
                                                                                              .settings
                                                                                              .url ??
                                                                                          '#'
                                                                                      }
                                                                                  >
                                                                                      <a
                                                                                          target='_blank'
                                                                                          className='py-2 px-3 border border-solabCyan-500 rounded-lg text-solabCyan-500 text-xs hover:bg-opacity-80 mb-4'
                                                                                          onClick={() => {
                                                                                              dispatch(
                                                                                                  solabProjectActions.doCommunityTask(
                                                                                                      {
                                                                                                          taskUuid:
                                                                                                              t.uuid,
                                                                                                          walletAddress:
                                                                                                              user.walletAddress,
                                                                                                      }
                                                                                                  )
                                                                                              );
                                                                                          }}
                                                                                      >
                                                                                          Collect
                                                                                          Now
                                                                                      </a>
                                                                                  </Link>
                                                                              )
                                                                          ) : t.taskType ===
                                                                            solabProjectConstants.taskTypeReferral ? (
                                                                              <button
                                                                                  className='py-2 px-3 border border-solabCyan-500 rounded-lg text-solabCyan-500 text-xs hover:bg-opacity-80 mb-4'
                                                                                  onClick={() => {
                                                                                      const refParams =
                                                                                          JSON.stringify(
                                                                                              {
                                                                                                  p: 'solab-project',
                                                                                                  u: user._id,
                                                                                              }
                                                                                          );
                                                                                      const refLink = `${url}${router.pathname}?ref=${refParams}`;
                                                                                      copy(
                                                                                          refLink
                                                                                      );
                                                                                      toast.success(
                                                                                          'Ref Link copied to clipboard',
                                                                                          toastConfigs.success
                                                                                      );
                                                                                      //   navigator.clipboard.writeText()
                                                                                  }}
                                                                              >
                                                                                  Get
                                                                                  Referral
                                                                                  link
                                                                              </button>
                                                                          ) : (
                                                                              'View'
                                                                          )
                                                                      ) : (
                                                                          <p className='text-sm mb-4'>
                                                                              <WalletMultiButton />
                                                                          </p>
                                                                      )}
                                                                  </div>
                                                              )
                                                          )
                                                        : null}
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <Tab.Group vertical>
                                            <Tab.List>
                                                <Tab>Tab 1</Tab>
                                                <Tab>Tab 2</Tab>
                                                <Tab>Tab 3</Tab>
                                            </Tab.List>
                                            <Tab.Panels>
                                                <Tab.Panel>Content 1</Tab.Panel>
                                                <Tab.Panel>Content 2</Tab.Panel>
                                                <Tab.Panel>Content 3</Tab.Panel>
                                            </Tab.Panels>
                                        </Tab.Group>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </>
                ) : (
                    <div className='text-center mx-auto'>
                        <Image src={loaderCyan} height={100} width={100} />
                    </div>
                )}
            </div>
        </Container>
    );
};

export default SolabIDO;
