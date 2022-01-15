import { NextPage } from 'next';
import Container from '../components/app/layout/Container';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useCallback, useEffect, useState } from 'react';
import { updateActiveHeaderItem } from '../features/layout/layoutSlice';
import { appHeaderOptions } from '../features/layout/types';
import { tierActions } from '../features/tier/tierSlice';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import NumberFormat from 'react-number-format';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { userActions } from '../features/user/userSlice';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { solabPubKey } from '../config/token';
import { stakePubKey, stakeInterest, receiveFeePubKey } from '../config/stake';
import { web3 } from '@project-serum/anchor';
import { getOrCreateAssociatedTokenAccount } from '../libs/getOrCreateAssociatedTokenAccount';
import { createTransferInstruction } from '../libs/createTransferInstructions';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { differenceInSeconds, format, formatISO, parse } from 'date-fns';
import IncreaseStakeModal from '../features/user/IncreaseStakeModal';
import ReactTooltip from 'react-tooltip';
import { GoPrimitiveDot } from 'react-icons/go';
import { Disclosure } from '@headlessui/react';
import { BsChevronUp } from 'react-icons/bs';
import loaderCyan from '../assets/images/loader-cyan.svg';
import axios from 'axios';

const Staking: NextPage = () => {
    const dispatch = useAppDispatch();
    const tiers = useAppSelector((state) => state.tier.app.tiers);
    const user = useAppSelector((state) => state.user.app.user);
    const isClaimingInterest = useAppSelector(
        (state) => state.user.app.isClaimingInterest
    );
    const isUnstaking = useAppSelector((state) => state.user.app.isUnstaking);
    const [interest, setInterest] = useState<number>(0);
    const [currentStakeAmount, setCurrentStakeAmount] = useState<number>(0);
    const { publicKey, sendTransaction, signTransaction } = useWallet();
    const { connection } = useConnection();
    useEffect(() => {
        dispatch(updateActiveHeaderItem(appHeaderOptions.stake));
        dispatch(tierActions.fetchTiersApp());
    }, [dispatch]);

    const stake = useCallback(
        async (solabAmount: number) => {
            try {
                if (!publicKey || !signTransaction || !user)
                    throw new WalletNotConnectedError();
                const toPub = new web3.PublicKey(stakePubKey);
                const mint = new web3.PublicKey(solabPubKey);
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
                        solabAmount * web3.LAMPORTS_PER_SOL,
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
                    userActions.stake({
                        signature,
                        userId: user._id,
                        solabAmount,
                    })
                );
            } catch (err: any) {
                dispatch(
                    userActions.stakeFailure({
                        status: 422,
                        data: {
                            message:
                                'Can not confirm transaction! Please make sure you have enough funds in your wallet and try again.',
                            error: null,
                        },
                    })
                );
                return false;
            }
        },
        [publicKey, sendTransaction, connection, signTransaction, user]
    );

    const claimInterest = useCallback(
        async (claimDate: string) => {
            try {
                if (!user || !publicKey || !connection || !sendTransaction) {
                    throw new WalletNotConnectedError();
                }
                const from = new web3.PublicKey(publicKey);
                const to = new web3.PublicKey(receiveFeePubKey);
                const transaction = new web3.Transaction().add(
                    web3.SystemProgram.transfer({
                        fromPubkey: from,
                        toPubkey: to,
                        lamports: 0.003 * web3.LAMPORTS_PER_SOL,
                    })
                );
                const signature = await sendTransaction(
                    transaction,
                    connection
                );
                await connection.confirmTransaction(signature, 'processed');
                if (signature) {
                    dispatch(
                        userActions.claimInterest({
                            userId: user._id,
                            claimDate: claimDate,
                        })
                    );
                }
            } catch (err: any) {
                dispatch(
                    userActions.claimInterestFailure({
                        status: 422,
                        data: {
                            message:
                                'Can not confirm transaction! Please make sure you have enough funds in your wallet and try again.',
                            error: null,
                        },
                    })
                );
                return false;
            }
        },
        [publicKey, user, connection, sendTransaction]
    );

    const unstake = useCallback(async () => {
        try {
            if (!user || !publicKey || !connection || !sendTransaction) {
                throw new WalletNotConnectedError();
            }
            const from = new web3.PublicKey(publicKey);
            const to = new web3.PublicKey(receiveFeePubKey);
            const transaction = new web3.Transaction().add(
                web3.SystemProgram.transfer({
                    fromPubkey: from,
                    toPubkey: to,
                    lamports: 0.003 * web3.LAMPORTS_PER_SOL,
                })
            );
            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'processed');
            if (signature) {
                dispatch(
                    userActions.unstake({
                        userId: user._id,
                    })
                );
            }
        } catch (err: any) {
            dispatch(
                userActions.unstakeFailure({
                    status: 422,
                    data: {
                        message:
                            'Can not confirm transaction! Please make sure you have enough funds in your wallet and try again.',
                        error: null,
                    },
                })
            );
            return false;
        }
    }, [publicKey, user, connection, sendTransaction]);

    const [interestInterval, setInterestInterval] = useState<any>(undefined);

    window.onbeforeunload = () => {
        return 'Are you sure you want to leave?';
    };

    useEffect(() => {
        if (user) {
            clearInterval(interestInterval);
            setInterest(0);
            if (user.stake && user.stake.totalSolab > 0) {
                setInterestInterval(
                    setInterval(() => {
                        if (user.stake && user.stake.totalSolab > 0) {
                            const date = new Date();
                            const seconds = differenceInSeconds(
                                date,
                                new Date(
                                    user.stake?.lastInterestClaimDate as string
                                )
                            );
                            const interestPerSecond = stakeInterest / 8640000;
                            const interest =
                                interestPerSecond *
                                seconds *
                                user.stake.totalSolab;
                            setInterest(interest + user.stake.remainInterest);
                        }
                    }, 1000)
                );
            }
        }
    }, [user]);

    const getStakeAmount = () => {
        axios
            .post(
                'https://api.mainnet-beta.solana.com',
                [
                    {
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'getTokenAccountsByOwner',
                        params: [
                            stakePubKey,
                            {
                                mint: solabPubKey,
                            },
                            {
                                encoding: 'jsonParsed',
                            },
                        ],
                    },
                ],
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            .then((res) => {
                console.log(res);
                const stakeAmount =
                    res.data.result.value[0].account.data.parsed.info
                        .tokenAmount.uiAmount;
                console.log(stakeAmount);
                setCurrentStakeAmount(stakeAmount);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getStakeAmount();
        setInterval(() => {
            getStakeAmount();
        }, 5000);
    }, []);

    return (
        <Container>
            <div className='mt-7 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 p-5 lg:p-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8'>
                        <div>
                            <h2 className='text-2xl font-bold'>
                                Stake SOLAB and Earn Up to 474.25% APY
                            </h2>
                            <p className='text-solabGray-100 mt-8 flex items-center justify-between flex-wrap'>
                                <span>Total SOLAB Staked on Launchpad</span>
                                <span className='text-solabWhite-500'>
                                    {' '}
                                    <NumberFormat
                                        thousandsGroupStyle='thousand'
                                        value={currentStakeAmount}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix=' SOLAB'
                                    />
                                </span>
                            </p>
                            <p className='text-solabGray-100 mt-4 flex items-center justify-between flex-wrap'>
                                <span>Daily Percentage Yield</span>
                                <span className='text-solabWhite-500'>
                                    {' '}
                                    <NumberFormat
                                        thousandsGroupStyle='thousand'
                                        value={1.3}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix=' %'
                                    />
                                </span>
                            </p>
                            <p className='text-solabGray-100 mt-4 flex items-center justify-between flex-wrap'>
                                <span>Annual Percentage Yield</span>
                                <span className='text-solabWhite-500'>
                                    {' '}
                                    <NumberFormat
                                        thousandsGroupStyle='thousand'
                                        value={474.5}
                                        displayType='text'
                                        thousandSeparator={true}
                                        suffix=' %'
                                    />
                                </span>
                            </p>
                            <div className='mt-4 pb-8 border-b border-solabGray-100'>
                                <button
                                    type='button'
                                    className='py-3 font-bold px-4 mt-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-full'
                                    onClick={() => {
                                        dispatch(
                                            userActions.openIncreaseStakeModal()
                                        );
                                    }}
                                >
                                    Increase Stake
                                </button>
                            </div>
                            <p className='mt-4 text-center text-orange-500 uppercase'>
                                Do not refresh your browser. The system will
                                automatically update the number!
                            </p>
                            <div className='mt-4'>
                                {user ? (
                                    <>
                                        <div className='flex items-start justify-between'>
                                            <div>
                                                <p className='text-solabGray-100'>
                                                    Your staked SOLAB
                                                </p>
                                                <p>
                                                    {user.stake &&
                                                    user.stake.totalSolab ? (
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={
                                                                user.stake
                                                                    .totalSolab
                                                            }
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            suffix=' SOLAB'
                                                            decimalScale={2}
                                                        />
                                                    ) : (
                                                        `0 SOLAB`
                                                    )}
                                                </p>
                                            </div>
                                            {!isUnstaking ? (
                                                <span
                                                    className='text-solabGray-100 hover:text-solabWhite-500 underline cursor-pointer'
                                                    onClick={async () => {
                                                        await unstake();
                                                    }}
                                                >
                                                    Unstake
                                                </span>
                                            ) : (
                                                <div className='w-10 h-10 relative'>
                                                    <Image
                                                        src={loaderCyan}
                                                        layout='fill'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex items-start justify-between mt-8'>
                                            <div>
                                                <p className='text-solabGray-100'>
                                                    Pending rewards
                                                </p>
                                                <p>
                                                    {user.stake &&
                                                    user.stake.totalSolab ? (
                                                        <NumberFormat
                                                            thousandsGroupStyle='thousand'
                                                            value={interest}
                                                            displayType='text'
                                                            thousandSeparator={
                                                                true
                                                            }
                                                            suffix=' SOLAB'
                                                            decimalScale={4}
                                                        />
                                                    ) : (
                                                        `0 SOLAB`
                                                    )}
                                                </p>
                                            </div>
                                            {!isClaimingInterest ? (
                                                <span
                                                    className='text-solabGray-100 hover:text-solabWhite-500 underline cursor-pointer'
                                                    onClick={async () => {
                                                        const claimDate =
                                                            formatISO(
                                                                new Date()
                                                            );
                                                        await claimInterest(
                                                            claimDate
                                                        );
                                                    }}
                                                >
                                                    Claim rewards
                                                </span>
                                            ) : (
                                                <div className='w-10 h-10 relative'>
                                                    <Image
                                                        src={loaderCyan}
                                                        layout='fill'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <WalletMultiButton className='mx-auto' />
                                )}
                            </div>
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Your tier</h2>
                            {user ? (
                                <>
                                    <p className='text-solabGray-100 flex items-center'>
                                        <span>
                                            Base on your amount of LAB in 7
                                            days:
                                        </span>{' '}
                                        <NumberFormat
                                            thousandsGroupStyle='thousand'
                                            value={user.stake?.labRecord.reduce(
                                                (a, b) => a + b,
                                                0
                                            )}
                                            displayType='text'
                                            thousandSeparator={true}
                                            suffix=' LAB'
                                            decimalScale={4}
                                        />
                                        <GoPrimitiveDot
                                            data-for='tier-tooltip'
                                            data-tip={`Your LAB number will be updated daily at ${format(
                                                new Date(
                                                    '2022-01-10T01:00:00.000Z'
                                                ),
                                                'h a OOOO'
                                            )}`}
                                            className='text-solabGray-100 w-4 h-4 cursor-pointer'
                                        />
                                        <ReactTooltip
                                            id='tier-tooltip'
                                            place='top'
                                            type='light'
                                            effect='solid'
                                            multiline={true}
                                        />
                                    </p>
                                    <div className='mt-9'>
                                        {user && user.tier ? (
                                            <div className='w-44 h-44 relative p-1 gradient-background-1 rounded-lg'>
                                                <div
                                                    className='bg-solabGray-300 bg-center bg-cover bg-no-repeat w-full h-full rounded-lg p-4'
                                                    style={{
                                                        backgroundImage: `url(${user.tier.thumbnail})`,
                                                    }}
                                                ></div>
                                            </div>
                                        ) : (
                                            <p>
                                                You need more LAB to reach Tier
                                                1
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <WalletMultiButton className='mx-auto w-auto' />
                                </div>
                            )}
                            <div className='mt-14'>
                                <h3 className='text-xxl'>
                                    Solab tiered system
                                </h3>
                                <div className='mt-2 divide-y divide-solabGray-100'>
                                    {tiers.map((tier) => (
                                        <div className='py-3 flex items-center justify-between'>
                                            <div className='relative'>
                                                <p className='texts-solabGray-100'>
                                                    {tier.name}
                                                </p>
                                                {user &&
                                                user.tier &&
                                                user.tier._id === tier._id ? (
                                                    <span className='absolute text-xxs w-max text-gradient-1 -top-1.5 left-full'>
                                                        Your current tier
                                                    </span>
                                                ) : null}
                                            </div>
                                            <NumberFormat
                                                thousandsGroupStyle='thousand'
                                                value={tier.requiredLabAmount}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix=' LAB'
                                                className='text-solabGray-100'
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-24'>
                        <h2 className='text-center font-bold text-2xl'>
                            Frequently Asked Questions
                        </h2>
                        <div className='mt-4 w-full lg:w-3/4 mx-auto'>
                            <Disclosure>
                                {({ open }) => (
                                    <div className='py-8 border-b border-solabGray-100'>
                                        <Disclosure.Button
                                            className={`flex justify-between w-full px-4 py-2 text-xl text-left font-bold ${
                                                open
                                                    ? 'text-solabCyan-500'
                                                    : null
                                            }`}
                                        >
                                            <span>
                                                Do I have to stake my SOLAB for
                                                7 days to qualify for IDO?
                                            </span>
                                            <BsChevronUp
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className='px-4 pb-2 text-sm text-solabGray-100'>
                                            No, Solab does not implement a
                                            pre-IDO staking policy.
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                            <Disclosure>
                                {({ open }) => (
                                    <div className='py-8 border-b border-solabGray-100'>
                                        <Disclosure.Button
                                            className={`flex justify-between w-full px-4 py-2 text-xl text-left font-bold ${
                                                open
                                                    ? 'text-solabCyan-500'
                                                    : null
                                            }`}
                                        >
                                            <span>
                                                I have registered for an
                                                upcoming IDO with a certain
                                                amount of $SOLAB already staked.
                                                If I purchase more $SOLAB and
                                                stake them after registering,
                                                will my tier be upgraded?
                                            </span>
                                            <BsChevronUp
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5 flex-grow`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className='px-4 pb-2 text-sm text-solabGray-100'>
                                            Registration takes an on chain snap
                                            transaction to determine tier. As
                                            such, if registration has already
                                            taken place, added $SOLAB will not
                                            be applied to change your tier for
                                            the IDO you intend to partake in.
                                            However, they can be added to an
                                            existing stake pool to upgrade your
                                            tier for future IDOs.
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                            <Disclosure>
                                {({ open }) => (
                                    <div className='py-8 border-b border-solabGray-100'>
                                        <Disclosure.Button
                                            className={`flex justify-between w-full px-4 py-2 text-xl text-left font-bold ${
                                                open
                                                    ? 'text-solabCyan-500'
                                                    : null
                                            }`}
                                        >
                                            <span>
                                                I have staked X number of
                                                $SOLAB, yet the Solab app shows
                                                0 $SOLAB staked. Why?
                                            </span>
                                            <BsChevronUp
                                                className={`${
                                                    open
                                                        ? 'transform rotate-180'
                                                        : ''
                                                } w-5 h-5`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className='px-4 pb-2 text-sm text-solabGray-100'>
                                            The staking process involves
                                            multiple steps including an approval
                                            transaction and staking transaction.
                                        </Disclosure.Panel>
                                    </div>
                                )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
            </div>
            <IncreaseStakeModal
                onSubmit={async (values, { setSubmitting }) => {
                    await stake(values.solabAmount);
                    setSubmitting(false);
                    dispatch(userActions.closeIncreaseStakeModal());
                }}
            />
        </Container>
    );
};

export default Staking;
