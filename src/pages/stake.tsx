import {NextPage} from 'next';
import Container from '../components/app/layout/Container';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {Fragment, useCallback, useEffect, useState} from 'react';
import {updateActiveHeaderItem} from '../features/layout/layoutSlice';
import {appHeaderOptions} from '../features/layout/types';
import {Tab} from '@headlessui/react';
import {tierActions} from '../features/tier/tierSlice';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import NumberFormat from 'react-number-format';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {userActions} from '../features/user/userSlice';
import {WalletNotConnectedError} from '@solana/wallet-adapter-base';
import {solabPubKey} from '../config/token';
import {stakePubKey, stakeInterest, receiveFeePubKey} from '../config/stake';
import {web3} from '@project-serum/anchor';
import {getOrCreateAssociatedTokenAccount} from '../libs/getOrCreateAssociatedTokenAccount';
import {createTransferInstruction} from '../libs/createTransferInstructions';
import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import * as Yup from 'yup';
import loaderCyan from '../assets/images/loader-cyan.svg';
import {differenceInSeconds, formatISO, parseISO} from 'date-fns';


const Stake: NextPage = () => {
    const dispatch = useAppDispatch();
    const tiers = useAppSelector(state => state.tier.app.tiers);
    const user = useAppSelector(state => state.user.app.user);
    const [interest, setInterest] = useState<number>(0);
    const {publicKey, sendTransaction, signTransaction} = useWallet();
    const {connection} = useConnection();
    useEffect(() => {
        dispatch(updateActiveHeaderItem(appHeaderOptions.stake));
        dispatch(tierActions.fetchTiersApp());
    }, [dispatch]);

    const stake = useCallback(async (solabAmount: number) => {
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
            dispatch(userActions.stake({
                signature,
                userId: user._id,
                solabAmount
            }));

        } catch (err: any) {
            dispatch(userActions.stakeFailure({
                status: 422,
                data: {
                    message: 'Can not confirm transaction! Please make sure you have enough funds in your wallet and try again.',
                    error: null
                }
            }));
            return false;
        }
    }, [
        publicKey,
        sendTransaction,
        connection,
        signTransaction,
        user
    ]);

    const claimInterest = useCallback(async (claimDate: string) => {
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
                dispatch(userActions.claimInterest({
                    userId: user._id,
                    claimDate: claimDate
                }));
            }
        } catch (err: any) {
            dispatch(userActions.claimInterestFailure({
                status: 422,
                data: {
                    message: 'Can not confirm transaction! Please make sure you have enough funds in your wallet and try again.',
                    error: null
                }
            }));
            return false;
        }
    }, [publicKey, user, connection, sendTransaction]);

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
                dispatch(userActions.unstake({
                    userId: user._id,
                }));
            }
        } catch (err: any) {
            dispatch(userActions.unstakeFailure({
                status: 422,
                data: {
                    message: 'Can not confirm transaction! Please make sure you have enough funds in your wallet and try again.',
                    error: null
                }
            }));
            return false;
        }
    }, [publicKey, user, connection, sendTransaction]);

    const [interestInterval, setInterestInterval] = useState<any>(undefined);

    useEffect(() => {
        if (user) {
            clearInterval(interestInterval);
            setInterest(0);
            if (user.stake && user.stake.totalSolab > 0) {
                setInterestInterval(setInterval(() => {
                    if (user.stake && user.stake.totalSolab > 0) {

                        const date = new Date();
                        const seconds = differenceInSeconds(date, new Date(user.stake?.lastInterestClaimDate as string));
                        const interestPerSecond = stakeInterest / 8640000;
                        const interest = interestPerSecond * seconds * user.stake.totalSolab;
                        setInterest(interest + user.stake.remainInterest);
                    }
                }, 1000));
            }
        }
    }, [user]);

    return <Container>
        <div className="mt-7 px-4">
            <div className="max-w-7xl mx-auto">
                <Tab.Group>
                    <Tab.List className={'border-b border-solabGray-50 gap-x-6 flex'}>
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
                                                Stake
                                            </span>
                                    {selected ? (
                                        <hr className="gradient-background-1 mt-1 py-px border-0"/>
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
                                                Your stake
                                            </span>
                                    {selected ? (
                                        <hr className="gradient-background-1 mt-1 py-px border-0"/>
                                    ) : null}
                                </div>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className={'mt-8'}>
                        <Tab.Panel>
                            {
                                user ?
                                    <div
                                        className="bg-solabGray-300 rounded-lg border border-solabGray-50 p-5 lg:p-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div>
                                            <h2 className="text-2xl font-bold">Staking</h2>
                                            <p className="text-solabGray-100">Please enter the amount of SOLAB you want
                                                to
                                                stake.Total
                                                solab: {user.stake && user.stake.totalSolab ? user.stake.totalSolab : 0}</p>
                                            <p className="text-solabGray-100">Realtime interest: <NumberFormat
                                                thousandsGroupStyle="thousand"
                                                value={interest}
                                                displayType="text"
                                                thousandSeparator={true}
                                                suffix=" SOLAB"
                                                className="text-solabGray-100"
                                            /></p>
                                            <div className="mt-9">
                                                <Formik
                                                    initialValues={{
                                                        solabAmount: 0,
                                                    }}
                                                    onSubmit={async (values, {setSubmitting}) => {
                                                        await stake(values.solabAmount);
                                                        setSubmitting(false);
                                                    }}
                                                    enableReinitialize={true}
                                                    validationSchema={Yup.object().shape({
                                                        solabAmount: Yup.number()
                                                            .required('Required')
                                                            .positive('Solab amount must bigger than 0')
                                                    })
                                                    }
                                                >
                                                    {({
                                                          values,
                                                          isSubmitting,
                                                          errors,
                                                          setFieldValue,
                                                          submitForm,
                                                      }) => {
                                                        return <Form>
                                                            <div
                                                                className="flex items-center justify-between gap-4 flex-wrap">
                                                                <span className="text-solabGray-100">Amount</span>
                                                                <Field
                                                                    name="solabAmount"
                                                                    type="number"
                                                                    className="input-2 input-cyan flex-grow"
                                                                />
                                                            </div>
                                                            <ErrorMessage
                                                                name="solabAmount"
                                                                render={(
                                                                    msg
                                                                ) => (
                                                                    <span className="text-xs text-red-500">
                                                                                    {
                                                                                        msg
                                                                                    }
                                                                                </span>
                                                                )}
                                                            />
                                                            {
                                                                !isSubmitting ? <button
                                                                        type="submit"
                                                                        className="py-3 font-bold px-4 mt-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-full"
                                                                        disabled={isSubmitting}
                                                                    >
                                                                        Stake
                                                                    </button> :
                                                                    <div className="mx-auto w-10 h-10 relative mt-4">
                                                                        <Image
                                                                            src={loaderCyan} layout="fill"/></div>

                                                            }
                                                        </Form>;
                                                    }
                                                    }

                                                </Formik>
                                                <button
                                                    type="button"
                                                    className="py-3 font-bold px-4 mt-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-full"
                                                    onClick={async () => {
                                                        const claimDate = formatISO(new Date());
                                                        await claimInterest(claimDate);
                                                    }
                                                    }
                                                >
                                                    Claim interest
                                                </button>
                                                <button
                                                    type="button"
                                                    className="py-3 font-bold px-4 mt-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-full"
                                                    onClick={async () => {
                                                        await unstake();
                                                    }
                                                    }
                                                >
                                                    Unstake
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Your tier</h2>
                                            <p className="text-solabGray-100">Base on your amount of LAB</p>
                                            <div className="mt-9">
                                                <div
                                                    className="w-44 h-44 relative p-1 gradient-background-1 rounded-lg">
                                                    {
                                                        user && user.tier ?
                                                            <Image src={user.tier.thumbnail} layout="fill"/> :
                                                            <Image
                                                                src="https://solab-media.s3.ap-southeast-1.amazonaws.com/content/axura-icon-product.png"
                                                                layout={'fill'}
                                                                className="rounded-lg p-1"
                                                            />
                                                    }
                                                </div>
                                            </div>
                                            <div className="mt-14">
                                                <h3 className="text-xxl">Solab tiered system</h3>
                                                <div className="mt-2 divide-y divide-solabGray-100">
                                                    {
                                                        tiers.map((tier) =>
                                                            <div className="py-3 flex items-center justify-between">
                                                                <div className="relative">
                                                                    <p className="texts-solabGray-100">{tier.name}</p>
                                                                    {user && user.tier && user.tier._id === tier._id ? (
                                                                        <span
                                                                            className="absolute text-xxs w-max text-gradient-1 -top-1.5 left-full">
                                                                        Your current tier
                                                                    </span>
                                                                    ) : null}
                                                                </div>
                                                                <NumberFormat
                                                                    thousandsGroupStyle="thousand"
                                                                    value={tier.requiredLabAmount}
                                                                    displayType="text"
                                                                    thousandSeparator={true}
                                                                    suffix=" LAB"
                                                                    className="text-solabGray-100"
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : <WalletMultiButton className="mx-auto"/>
                            }

                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    </Container>;
};

export default Stake;