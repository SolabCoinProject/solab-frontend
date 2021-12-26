import { Tab } from '@headlessui/react';
import type { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Container from '../components/app/layout/Container';
import { updateActiveHeaderItem } from '../features/layout/layoutSlice';
import { appHeaderOptions } from '../features/layout/types';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import loaderCyan from '../assets/images/loader-cyan.svg';
import Image from 'next/image';
import { userActions } from '../features/user/userSlice';
import { formatISO, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { resourceActions } from '../features/resources/resourceSlice';
import Select from 'react-select';
import { handleUserFileUpload } from '../libs/fileUpload';
import { toast } from 'react-toastify';
import toastConfigs from '../config/toast';
import { Tab as ReactTab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageUploading from 'react-images-uploading';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import TelegramLoginButton, { TelegramUser } from 'telegram-login-button';
import { telegramLoginBot } from '../config/app';

const MyAccount: NextPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.app.user);
    const countries = useAppSelector((state) => state.resource.countries);
    const userConstants = useAppSelector((state) => state.user.app.constants);
    const isUpdatingUserInfo = useAppSelector(
        (state) => state.user.app.isUpdatingInfo
    );
    const isUpdatingKyc = useAppSelector(
        (state) => state.user.app.isUpdatingKyc
    );

    const [personalInfoTabIndex, setPersonalInfoTabIndex] = useState<number>(0);

    useEffect(() => {
        dispatch(updateActiveHeaderItem(appHeaderOptions.myAccount));
        dispatch(resourceActions.fetchCountries());
    }, [dispatch]);
    return (
        <Container>
            <div className='mt-32 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-center text-3xl font-bold'>
                        My Account
                    </h1>
                    <p className='text-center font-light text-solabGray-100'>
                        You can check information and kyc here
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
                                                General Information
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
                                                KYC
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
                                    <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 py-5 px-2 lg:px-5 lg:w-1/2 mx-auto'>
                                        {user ? (
                                            <Formik
                                                enableReinitialize
                                                initialValues={{
                                                    email: user.email ?? '',
                                                    firstName:
                                                        user.firstName ?? '',
                                                    lastName:
                                                        user.lastName ?? '',
                                                    displayName:
                                                        user.displayName ?? '',
                                                    address: user.address ?? '',
                                                    phone: user.phone ?? '',
                                                    nation: user.nation ?? '',
                                                    telegram: {
                                                        id: '',
                                                        username: '',
                                                    },
                                                }}
                                                onSubmit={(
                                                    values,
                                                    { setSubmitting }
                                                ) => {
                                                    dispatch(
                                                        userActions.updateUserInformation(
                                                            {
                                                                walletAddress:
                                                                    user.walletAddress,
                                                                data: values,
                                                            }
                                                        )
                                                    );
                                                    setSubmitting(false);
                                                }}
                                                validationSchema={Yup.object().shape(
                                                    {
                                                        email: Yup.string()
                                                            .nullable()
                                                            .email(
                                                                'Email is invalid'
                                                            ),
                                                        firstName:
                                                            Yup.string().max(
                                                                30,
                                                                'First name is too long'
                                                            ),
                                                        lastName:
                                                            Yup.string().max(
                                                                30,
                                                                'Last name is too long'
                                                            ),
                                                        displayName:
                                                            Yup.string().max(
                                                                30,
                                                                'Display name is too long'
                                                            ),
                                                        phone: Yup.string().matches(
                                                            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                                                            'Phone number is not invalid'
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
                                                            <div className='flex flex-col items-center justify-center'>
                                                                <div className='grid grid-cols-4 w-full'>
                                                                    <div className='mr-2 text-left col-span-1'>
                                                                        Wallet
                                                                        Address
                                                                    </div>
                                                                    <div className='lg:ml-2 text-left overflow-ellipsis overflow-hidden whitespace-nowrap col-span-3'>
                                                                        {
                                                                            user.walletAddress
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className='mt-4 grid grid-cols-4 items-center w-full'>
                                                                    <div className='mr-2 text-left col-span-1'>
                                                                        Email
                                                                    </div>
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        {user.email ? (
                                                                            user.email
                                                                        ) : (
                                                                            <div className='relative'>
                                                                                <Field
                                                                                    type='text'
                                                                                    name='email'
                                                                                    className='input input-cyan'
                                                                                    disabled={
                                                                                        isUpdatingUserInfo
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                />
                                                                                {errors.email ? (
                                                                                    <span className='text-xs text-red-500'>
                                                                                        {
                                                                                            errors.email
                                                                                        }
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className='text-xs text-yellow-500'>
                                                                                        Email
                                                                                        can
                                                                                        be
                                                                                        updated
                                                                                        only
                                                                                        once
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className='mt-4 grid grid-cols-4 items-center w-full'>
                                                                    <div className='mr-2 text-left col-span-1'>
                                                                        Telegram
                                                                    </div>
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        {user.telegram ? (
                                                                            user
                                                                                .telegram
                                                                                .username
                                                                        ) : (
                                                                            <div>
                                                                                <TelegramLoginButton
                                                                                    botName={
                                                                                        telegramLoginBot
                                                                                    }
                                                                                    dataOnauth={(
                                                                                        user: TelegramUser
                                                                                    ) => {
                                                                                        console.log(
                                                                                            user
                                                                                        );
                                                                                        setFieldValue(
                                                                                            'telegram.id',
                                                                                            user.id
                                                                                        );
                                                                                        setFieldValue(
                                                                                            'telegram.username',
                                                                                            user.username
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className='mt-4 grid grid-cols-4 items-center w-full'>
                                                                    <div className='mr-2 text-left col-span-1'>
                                                                        First
                                                                        Name
                                                                    </div>
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        <Field
                                                                            name='firstName'
                                                                            type='text'
                                                                            className='input input-cyan'
                                                                            disabled={
                                                                                isUpdatingUserInfo
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                        />
                                                                        <ErrorMessage
                                                                            name='firstName'
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
                                                                </div>
                                                                <div className='mt-4 grid grid-cols-4 items-center w-full'>
                                                                    <div className='mr-2 text-left col-span-1'>
                                                                        Last
                                                                        Name
                                                                    </div>
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        <Field
                                                                            name='lastName'
                                                                            type='text'
                                                                            disabled={
                                                                                isUpdatingUserInfo
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            className='input input-cyan'
                                                                        />
                                                                        <ErrorMessage
                                                                            name='lastName'
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
                                                                </div>
                                                                <div className='mt-4 grid grid-cols-4 items-center w-full'>
                                                                    <div className='mr-2 text-left col-span-1'>
                                                                        Display
                                                                        Name
                                                                    </div>
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        <Field
                                                                            name='displayName'
                                                                            type='text'
                                                                            disabled={
                                                                                isUpdatingUserInfo
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            className='input input-cyan'
                                                                        />
                                                                        <ErrorMessage
                                                                            name='displayName'
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
                                                                </div>
                                                                <div className='mt-4 grid grid-cols-4 items-center w-full'>
                                                                    <div className='mr-2 text-left col-span-1'>
                                                                        Address
                                                                    </div>
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        <Field
                                                                            name='address'
                                                                            type='text'
                                                                            disabled={
                                                                                isUpdatingUserInfo
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            className='input input-cyan'
                                                                        />
                                                                        <ErrorMessage
                                                                            name='address'
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
                                                                </div>
                                                                <div className='mt-4 grid grid-cols-4 items-center w-full'>
                                                                    <div className='mr-2 text-left col-span-1'>
                                                                        Phone
                                                                    </div>
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        <Field
                                                                            name='phone'
                                                                            type='text'
                                                                            disabled={
                                                                                isUpdatingUserInfo
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            className='input input-cyan'
                                                                        />
                                                                        <ErrorMessage
                                                                            name='phone'
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
                                                                </div>
                                                                <div className='mt-4 grid grid-cols-4 items-center w-full'>
                                                                    <label>
                                                                        Nation
                                                                    </label>
                                                                    <div className='lg:ml-2 text-left col-span-3'>
                                                                        <Select
                                                                            value={{
                                                                                label: values.nation,
                                                                                value: values.nation,
                                                                            }}
                                                                            options={countries.map(
                                                                                (
                                                                                    country
                                                                                ) => {
                                                                                    return {
                                                                                        label: country
                                                                                            .name
                                                                                            .common,
                                                                                        value: country
                                                                                            .name
                                                                                            .common,
                                                                                    };
                                                                                }
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
                                                                                    'nation',
                                                                                    selected
                                                                                        ? selected.value
                                                                                        : ''
                                                                                );
                                                                            }}
                                                                            className='w-full'
                                                                        />
                                                                        <ErrorMessage
                                                                            name='nation'
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
                                                                </div>
                                                                <div className='mt-4'>
                                                                    {isUpdatingUserInfo ? (
                                                                        <Image
                                                                            src={
                                                                                loaderCyan
                                                                            }
                                                                            height={
                                                                                32
                                                                            }
                                                                            width={
                                                                                32
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        <button
                                                                            type='submit'
                                                                            className='py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500'
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        ) : (
                                            <WalletMultiButton className='mx-auto' />
                                        )}
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <>
                                        {user ? (
                                            user.isKycVerified ===
                                            userConstants.kycVerified ? (
                                                <p className='text-center font-light text-green-500'>
                                                    Kyc verified
                                                </p>
                                            ) : user.isKycVerified ===
                                              userConstants.kycVerifying ? (
                                                <p className='text-center font-light text-yellow-500'>
                                                    Kyc verifying
                                                </p>
                                            ) : user.isKycVerified ===
                                              userConstants.kycDenied ? (
                                                <>
                                                    <p className='text-center font-light text-red-500'>
                                                        Kyc denied
                                                    </p>
                                                    <p className='text-center font-light text-solabGray-100'>
                                                        {user.kycNote ?? ''}
                                                    </p>
                                                </>
                                            ) : null
                                        ) : (
                                            <WalletMultiButton className='mx-auto' />
                                        )}

                                        {user &&
                                        (user.isKycVerified ===
                                            userConstants.kycNeverSubmitted ||
                                            user.isKycVerified ===
                                                userConstants.kycDenied) ? (
                                            <Formik
                                                validateOnMount={true}
                                                enableReinitialize
                                                initialValues={{
                                                    personalId: '',
                                                    docsExpiredDate: formatISO(
                                                        new Date(),
                                                        {
                                                            representation:
                                                                'date',
                                                        }
                                                    ),
                                                    docsFront: '',
                                                    docsBack: '',
                                                    selfie: '',
                                                    confirmPolicy: false,
                                                }}
                                                onSubmit={(
                                                    values,
                                                    { setSubmitting }
                                                ) => {
                                                    dispatch(
                                                        userActions.updateKyc({
                                                            walletAddress:
                                                                user.walletAddress,
                                                            data: values,
                                                        })
                                                    );
                                                    setSubmitting(false);
                                                }}
                                                validationSchema={Yup.object().shape(
                                                    {
                                                        personalId: Yup.string()
                                                            .required(
                                                                'Personal ID is required!'
                                                            )
                                                            .min(1)
                                                            .max(20),
                                                        docsExpiredDate:
                                                            Yup.string().required(
                                                                'Docs expired date is required!'
                                                            ),
                                                        docsFront:
                                                            Yup.string().required(
                                                                'Docs front is required!'
                                                            ),
                                                        docsBack:
                                                            Yup.string().required(
                                                                'Docs back is required!'
                                                            ),
                                                        selfie: Yup.string().required(
                                                            'Selfie is required!'
                                                        ),
                                                        confirmPolicy:
                                                            Yup.bool(),
                                                    }
                                                )}
                                            >
                                                {({
                                                    values,
                                                    errors,
                                                    setFieldValue,
                                                    validateForm,
                                                    validateField,
                                                }) => {
                                                    return (
                                                        <Form>
                                                            <Tabs
                                                                selectedIndex={
                                                                    personalInfoTabIndex
                                                                }
                                                                onSelect={(
                                                                    index
                                                                ) =>
                                                                    setPersonalInfoTabIndex(
                                                                        index
                                                                    )
                                                                }
                                                                className='text-solabGray-100'
                                                                selectedTabClassName='font-bold text-solabWhite-500'
                                                            >
                                                                <TabList className='flex flex-col md:flex-row'>
                                                                    <ReactTab
                                                                        className={`w-min whitespace-nowrap cursor-pointer`}
                                                                    >
                                                                        <span>
                                                                            <span>
                                                                                1.
                                                                                Personal
                                                                                information
                                                                            </span>
                                                                            <span className='ml-2 mr-2'>
                                                                                {
                                                                                    '>'
                                                                                }
                                                                            </span>
                                                                        </span>
                                                                    </ReactTab>
                                                                    <ReactTab
                                                                        className={`w-min whitespace-nowrap cursor-pointer`}
                                                                    >
                                                                        <span>
                                                                            <span>
                                                                                2.
                                                                                Identity
                                                                                Verification
                                                                            </span>
                                                                            <span className='ml-2 mr-2'>
                                                                                {
                                                                                    '>'
                                                                                }
                                                                            </span>
                                                                        </span>
                                                                    </ReactTab>
                                                                    <ReactTab
                                                                        className={`w-min whitespace-nowrap cursor-pointer`}
                                                                    >
                                                                        <span>
                                                                            3.
                                                                            Selfie
                                                                        </span>
                                                                    </ReactTab>
                                                                </TabList>
                                                                <TabPanel>
                                                                    <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 py-5 px-6 mt-8'>
                                                                        <h2 className='text-2xl font-bold text-solabWhite-500'>
                                                                            Personal
                                                                            information
                                                                        </h2>
                                                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                                                            <div className='mt-4'>
                                                                                <label className='text-solabWhite-500'>
                                                                                    Personal
                                                                                    ID
                                                                                </label>
                                                                                <Field
                                                                                    name='personalId'
                                                                                    className='input input-cyan text-solabWhite-500'
                                                                                    disabled={
                                                                                        isUpdatingKyc
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                />
                                                                                <ErrorMessage
                                                                                    name='personalId'
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
                                                                            <div className='mt-4'>
                                                                                <label className='text-solabWhite-500'>
                                                                                    Docs
                                                                                    Expired
                                                                                    Date
                                                                                </label>
                                                                                <DatePicker
                                                                                    className='input input-cyan text-solabWhite-500'
                                                                                    selected={
                                                                                        values.docsExpiredDate
                                                                                            ? parseISO(
                                                                                                  values.docsExpiredDate
                                                                                              )
                                                                                            : new Date()
                                                                                    }
                                                                                    disabled={
                                                                                        isUpdatingKyc
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onChange={(
                                                                                        date
                                                                                    ) => {
                                                                                        setFieldValue(
                                                                                            'docsExpiredDate',
                                                                                            formatISO(
                                                                                                date,
                                                                                                {
                                                                                                    representation:
                                                                                                        'date',
                                                                                                }
                                                                                            )
                                                                                        );
                                                                                    }}
                                                                                />
                                                                                <ErrorMessage
                                                                                    name='docsExpiredDate'
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
                                                                        </div>
                                                                        <div className='flex justify-end'>
                                                                            <button
                                                                                type='button'
                                                                                className='py-3 px-6 bg-solabCyan-500 rounded text-solabBlack-500 mt-3 text-right ml-auto mr-0 disabled:opacity-50'
                                                                                onClick={() => {
                                                                                    validateForm().then(
                                                                                        () => {
                                                                                            setPersonalInfoTabIndex(
                                                                                                1
                                                                                            );
                                                                                        }
                                                                                    );
                                                                                }}
                                                                                disabled={
                                                                                    errors.personalId ||
                                                                                    errors.docsExpiredDate
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            >
                                                                                Continue
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </TabPanel>
                                                                <TabPanel>
                                                                    <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 py-5 px-6 mt-8'>
                                                                        <h2 className='text-xl lg:text-2xl font-bold text-solabWhite-500'>
                                                                            Identity
                                                                            Verification
                                                                        </h2>
                                                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                                                            <div>
                                                                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                                                                                    <ImageUploading
                                                                                        value={[]}
                                                                                        onChange={async (
                                                                                            imageList,
                                                                                            addUpdateIndex
                                                                                        ) => {
                                                                                            const uploadedFile =
                                                                                                imageList[0]
                                                                                                    .file;
                                                                                            const supportedFormat =
                                                                                                [
                                                                                                    'image/jpeg',
                                                                                                    'image/png',
                                                                                                ];
                                                                                            if (
                                                                                                !supportedFormat.includes(
                                                                                                    uploadedFile?.type as string
                                                                                                )
                                                                                            ) {
                                                                                                toast.error(
                                                                                                    'Only support png and jpeg format',
                                                                                                    toastConfigs.error
                                                                                                );
                                                                                                return false;
                                                                                            }
                                                                                            const objUrl =
                                                                                                await handleUserFileUpload(
                                                                                                    uploadedFile,
                                                                                                    `docsFront-${uploadedFile?.name}`,
                                                                                                    'kyc',
                                                                                                    user.walletAddress
                                                                                                );
                                                                                            if (
                                                                                                !objUrl
                                                                                            ) {
                                                                                                toast.error(
                                                                                                    'Cannot upload file, make sure your file is less than 5MB',
                                                                                                    toastConfigs.error
                                                                                                );
                                                                                            } else {
                                                                                                setFieldValue(
                                                                                                    'docsFront',
                                                                                                    objUrl
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        maxNumber={
                                                                                            1
                                                                                        }
                                                                                        dataURLKey='data_url'
                                                                                    >
                                                                                        {({
                                                                                            imageList,
                                                                                            onImageUpload,
                                                                                            onImageRemoveAll,
                                                                                            onImageUpdate,
                                                                                            onImageRemove,
                                                                                            isDragging,
                                                                                            dragProps,
                                                                                        }) => (
                                                                                            // write your building UI
                                                                                            <div>
                                                                                                <p className='text-solabWhite-500'>
                                                                                                    Front
                                                                                                </p>
                                                                                                <div
                                                                                                    style={
                                                                                                        values.docsFront
                                                                                                            ? {
                                                                                                                  backgroundImage: `url(${values.docsFront})`,
                                                                                                              }
                                                                                                            : undefined
                                                                                                    }
                                                                                                    onClick={
                                                                                                        onImageUpload
                                                                                                    }
                                                                                                    {...dragProps}
                                                                                                    className='p-20 border-2 rounded-lg border-dashed border-solabGray-50 text-center flex items-center justify-center cursor-pointer bg-center bg-cover bg-no-repeat'
                                                                                                >
                                                                                                    <FaPlus className='w-6 h-6 text-solabGray-50' />
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </ImageUploading>
                                                                                    <ImageUploading
                                                                                        value={[]}
                                                                                        onChange={async (
                                                                                            imageList,
                                                                                            addUpdateIndex
                                                                                        ) => {
                                                                                            const uploadedFile =
                                                                                                imageList[0]
                                                                                                    .file;
                                                                                            const objUrl =
                                                                                                await handleUserFileUpload(
                                                                                                    uploadedFile,
                                                                                                    `docsBack-${uploadedFile?.name}`,
                                                                                                    'kyc',
                                                                                                    user.walletAddress
                                                                                                );
                                                                                            if (
                                                                                                !objUrl
                                                                                            ) {
                                                                                                toast.error(
                                                                                                    'Cannot upload file, make sure your file is less than 5MB',
                                                                                                    toastConfigs.error
                                                                                                );
                                                                                            } else {
                                                                                                setFieldValue(
                                                                                                    'docsBack',
                                                                                                    objUrl
                                                                                                );
                                                                                            }
                                                                                        }}
                                                                                        maxNumber={
                                                                                            1
                                                                                        }
                                                                                        dataURLKey='data_url'
                                                                                    >
                                                                                        {({
                                                                                            imageList,
                                                                                            onImageUpload,
                                                                                            onImageRemoveAll,
                                                                                            onImageUpdate,
                                                                                            onImageRemove,
                                                                                            isDragging,
                                                                                            dragProps,
                                                                                        }) => (
                                                                                            // write your building UI
                                                                                            <div>
                                                                                                <p className='text-solabWhite-500'>
                                                                                                    Back
                                                                                                </p>
                                                                                                <div
                                                                                                    style={
                                                                                                        values.docsBack
                                                                                                            ? {
                                                                                                                  backgroundImage: `url(${values.docsBack})`,
                                                                                                              }
                                                                                                            : undefined
                                                                                                    }
                                                                                                    onClick={
                                                                                                        onImageUpload
                                                                                                    }
                                                                                                    {...dragProps}
                                                                                                    className='p-20 border-2 rounded-lg border-dashed border-solabGray-50 text-center flex items-center justify-center cursor-pointer bg-center bg-cover bg-no-repeat'
                                                                                                >
                                                                                                    <FaPlus className='w-6 h-6 text-solabGray-50' />
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </ImageUploading>
                                                                                </div>
                                                                                <div className='mt-10 flex items-center justify-center gap-4 flex-wrap'>
                                                                                    <div className='flex flex-col items-center justify-center'>
                                                                                        <div className='w-24 relative h-16'>
                                                                                            <Image
                                                                                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/doc-1.svg'
                                                                                                layout='fill'
                                                                                            />
                                                                                        </div>
                                                                                        <AiOutlineCheckCircle className='w-3.5 h-3.5 text-solabCyan-500 mt-4' />
                                                                                        <span className='text-solabWhite-500'>
                                                                                            Good
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className='flex flex-col items-center justify-center'>
                                                                                        <div className='w-24 relative h-16'>
                                                                                            <Image
                                                                                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/id2-01+(2).svg'
                                                                                                layout='fill'
                                                                                            />
                                                                                        </div>
                                                                                        <AiOutlineCloseCircle className='w-3.5 h-3.5 text-red-500 mt-4' />
                                                                                        <span className='text-solabWhite-500'>
                                                                                            Not
                                                                                            cropped
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className='flex flex-col items-center justify-center'>
                                                                                        <div className='w-24 relative h-16'>
                                                                                            <Image
                                                                                                src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/doc-3.svg'
                                                                                                layout='fill'
                                                                                            />
                                                                                        </div>
                                                                                        <AiOutlineCheckCircle className='w-3.5 h-3.5 text-solabCyan-500 mt-4' />
                                                                                        <span className='text-solabWhite-500'>
                                                                                            Not
                                                                                            blur
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='flex flex-col items-center lg:items-start justify-center lg:pl-28 gap-4'>
                                                                                <div className='flex items-center'>
                                                                                    <AiOutlineCheckCircle className='text-solabCyan-500' />
                                                                                    <span className='ml-2 text-solabWhite-500'>
                                                                                        Government-issued
                                                                                    </span>
                                                                                </div>
                                                                                <div className='flex items-center'>
                                                                                    <AiOutlineCheckCircle className='text-solabCyan-500' />
                                                                                    <span className='ml-2 text-solabWhite-500'>
                                                                                        Original
                                                                                        full-size,
                                                                                        unedited
                                                                                        documents
                                                                                    </span>
                                                                                </div>
                                                                                <div className='flex items-center'>
                                                                                    <AiOutlineCheckCircle className='text-solabCyan-500' />
                                                                                    <span className='ml-2 text-solabWhite-500'>
                                                                                        Place
                                                                                        documents
                                                                                        againts
                                                                                        a
                                                                                        single-coloured
                                                                                        background
                                                                                    </span>
                                                                                </div>
                                                                                <div className='flex items-center'>
                                                                                    <AiOutlineCheckCircle className='text-solabCyan-500' />
                                                                                    <span className='ml-2 text-solabWhite-500'>
                                                                                        Readable,
                                                                                        well-lit,
                                                                                        coloured
                                                                                        images
                                                                                    </span>
                                                                                </div>
                                                                                <div className='flex items-center'>
                                                                                    <AiOutlineCloseCircle className='text-red-500' />
                                                                                    <span className='ml-2 text-solabWhite-500'>
                                                                                        No
                                                                                        black
                                                                                        and
                                                                                        white
                                                                                        images
                                                                                    </span>
                                                                                </div>
                                                                                <div className='flex items-center'>
                                                                                    <AiOutlineCloseCircle className='text-red-500' />
                                                                                    <span className='ml-2 text-solabWhite-500'>
                                                                                        No
                                                                                        edited
                                                                                        or
                                                                                        expired
                                                                                        documents
                                                                                    </span>
                                                                                </div>
                                                                                <p>
                                                                                    Supported
                                                                                    formats:
                                                                                    JPG,
                                                                                    JPEG
                                                                                    and
                                                                                    PNG
                                                                                    File
                                                                                    size
                                                                                    must
                                                                                    be
                                                                                    between
                                                                                    10KB
                                                                                    and
                                                                                    5120KB
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex justify-end'>
                                                                            <button
                                                                                type='button'
                                                                                className='py-3 px-6 bg-solabCyan-500 rounded text-solabBlack-500 mt-3 text-right ml-auto mr-0 disabled:opacity-50'
                                                                                onClick={() => {
                                                                                    validateForm().then(
                                                                                        () => {
                                                                                            setPersonalInfoTabIndex(
                                                                                                2
                                                                                            );
                                                                                        }
                                                                                    );
                                                                                }}
                                                                                disabled={
                                                                                    errors.docsFront ||
                                                                                    errors.docsBack
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            >
                                                                                Continue
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </TabPanel>
                                                                <TabPanel>
                                                                    <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 py-5 px-6 mt-8'>
                                                                        <h2 className='text-xl lg:text-2xl font-bold text-solabWhite-500'>
                                                                            Identity
                                                                            Verification
                                                                        </h2>
                                                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6'>
                                                                            <div>
                                                                                <p className='text-solabWhite-500 leading-6'>
                                                                                    Take
                                                                                    a
                                                                                    selfie
                                                                                    photo
                                                                                    with
                                                                                    your
                                                                                    ID
                                                                                    card
                                                                                </p>
                                                                                <p className='leading-6 mt-2'>
                                                                                    Please
                                                                                    provide
                                                                                    a
                                                                                    photo
                                                                                    with
                                                                                    your
                                                                                    identity
                                                                                    document
                                                                                    (including
                                                                                    portrait
                                                                                    photo).
                                                                                </p>
                                                                                <p className='leading-6 mt-6'>
                                                                                    Ensure
                                                                                    the
                                                                                    characters
                                                                                    on
                                                                                    the
                                                                                    photograph
                                                                                    are
                                                                                    clear
                                                                                    and
                                                                                    recognizable.
                                                                                    Supported
                                                                                    formats:
                                                                                    JPG,
                                                                                    JPEG
                                                                                    and
                                                                                    PNG.
                                                                                    File
                                                                                    size
                                                                                    must
                                                                                    be
                                                                                    between
                                                                                    10KB
                                                                                    and
                                                                                    5120KB.
                                                                                </p>
                                                                                <p className='leading-6 mt-6'>
                                                                                    This
                                                                                    information
                                                                                    is
                                                                                    used
                                                                                    for
                                                                                    verification
                                                                                    only,
                                                                                    and
                                                                                    is
                                                                                    kept
                                                                                    private
                                                                                    and
                                                                                    confidential
                                                                                    by
                                                                                    Solab.
                                                                                </p>
                                                                            </div>
                                                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                                                                <ImageUploading
                                                                                    value={[]}
                                                                                    onChange={async (
                                                                                        imageList,
                                                                                        addUpdateIndex
                                                                                    ) => {
                                                                                        const uploadedFile =
                                                                                            imageList[0]
                                                                                                .file;
                                                                                        const supportedFormat =
                                                                                            [
                                                                                                'image/jpeg',
                                                                                                'image/png',
                                                                                            ];
                                                                                        if (
                                                                                            !supportedFormat.includes(
                                                                                                uploadedFile?.type as string
                                                                                            )
                                                                                        ) {
                                                                                            toast.error(
                                                                                                'Only support png and jpeg format',
                                                                                                toastConfigs.error
                                                                                            );
                                                                                            return false;
                                                                                        }
                                                                                        const objUrl =
                                                                                            await handleUserFileUpload(
                                                                                                uploadedFile,
                                                                                                `selfie-${uploadedFile?.name}`,
                                                                                                'kyc',
                                                                                                user.walletAddress
                                                                                            );
                                                                                        if (
                                                                                            !objUrl
                                                                                        ) {
                                                                                            toast.error(
                                                                                                'Cannot upload file, make sure your file is less than 5MB',
                                                                                                toastConfigs.error
                                                                                            );
                                                                                        } else {
                                                                                            setFieldValue(
                                                                                                'selfie',
                                                                                                objUrl
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                    maxNumber={
                                                                                        1
                                                                                    }
                                                                                    dataURLKey='data_url'
                                                                                >
                                                                                    {({
                                                                                        imageList,
                                                                                        onImageUpload,
                                                                                        onImageRemoveAll,
                                                                                        onImageUpdate,
                                                                                        onImageRemove,
                                                                                        isDragging,
                                                                                        dragProps,
                                                                                    }) => (
                                                                                        // write your building UI
                                                                                        <div>
                                                                                            <p className='text-solabWhite-500'>
                                                                                                Selfie
                                                                                            </p>
                                                                                            <div
                                                                                                style={
                                                                                                    values.selfie
                                                                                                        ? {
                                                                                                              backgroundImage: `url(${values.selfie})`,
                                                                                                          }
                                                                                                        : undefined
                                                                                                }
                                                                                                onClick={
                                                                                                    onImageUpload
                                                                                                }
                                                                                                {...dragProps}
                                                                                                className='p-20 border-2 rounded-lg border-dashed border-solabGray-50 text-center flex items-center justify-center cursor-pointer bg-center bg-cover bg-no-repeat'
                                                                                            >
                                                                                                <FaPlus className='w-6 h-6 text-solabGray-50' />
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </ImageUploading>
                                                                                <div className='flex items-center justify-center flex-col'>
                                                                                    <p className='text-solabWhite-500'>
                                                                                        Sample
                                                                                    </p>
                                                                                    <div className='relative w-28 h-28'>
                                                                                        <Image
                                                                                            src='https://solab-media.s3.ap-southeast-1.amazonaws.com/content/sample-selfie.png'
                                                                                            layout='fill'
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex justify-end items-end'>
                                                                            <div className='mr-2 flex items-center'>
                                                                                <input
                                                                                    type='checkbox'
                                                                                    className='mr-2 w-6 h-6 text-xs checked:bg-solabCyan-500'
                                                                                    onChange={() => {
                                                                                        setFieldValue(
                                                                                            'confirmPolicy',
                                                                                            !values.confirmPolicy
                                                                                        );
                                                                                    }}
                                                                                />

                                                                                <p>
                                                                                    I
                                                                                    have
                                                                                    read
                                                                                    and
                                                                                    agree{' '}
                                                                                    <a
                                                                                        href='https://docs.solab.finance/privacy-policy'
                                                                                        className='underline'
                                                                                    >
                                                                                        Privacy
                                                                                        Policy
                                                                                    </a>
                                                                                </p>
                                                                            </div>
                                                                            <button
                                                                                type='submit'
                                                                                className='py-3 px-6 bg-solabCyan-500 rounded text-solabBlack-500 mt-3 text-right mr-0 disabled:opacity-50'
                                                                                disabled={
                                                                                    errors.selfie ||
                                                                                    !values.confirmPolicy
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            >
                                                                                Submit
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </TabPanel>
                                                            </Tabs>
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        ) : null}
                                    </>
                                </Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MyAccount;
