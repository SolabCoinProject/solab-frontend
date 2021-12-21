import { Listbox, Tab } from '@headlessui/react';
import type { NextPage } from 'next';
import { Fragment, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Container from '../components/app/layout/Container';
import { updateActiveHeaderItem } from '../features/layout/layoutSlice';
import { appHeaderOptions } from '../features/layout/types';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import loaderCyan from '../assets/images/loader-cyan.svg';
import Image from 'next/image';
import { userActions } from '../features/user/userSlice';
import { formatISO, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { resourceActions } from '../features/resources/resourceSlice';
import Select from 'react-select';
import axiosClient from '../libs/axiosClient';
import { handleUserFileUpload } from '../libs/fileUpload';

const MyAccount: NextPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.app.user);
    const countries = useAppSelector((state) => state.resource.countries);
    const userConstants = useAppSelector((state) => state.user.app.constants);
    const isUpdatingUserInfo = useAppSelector(
        (state) => state.user.app.isUpdatingInfo
    );
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
                                                    }
                                                )}
                                            >
                                                {({
                                                    values,
                                                    isSubmitting,
                                                    errors,
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
                                                                                Login
                                                                                with
                                                                                telegram
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
                                    <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 py-5 px-2 lg:px-5 lg:w-1/2 mx-auto'>
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
                                            ) : (
                                                <p className='text-center font-light text-solabGray-100'>
                                                    You need kyc to continue
                                                </p>
                                            )
                                        ) : (
                                            <WalletMultiButton className='mx-auto' />
                                        )}
                                        {user &&
                                        (user.isKycVerified ===
                                            userConstants.kycNeverSubmitted ||
                                            user.isKycVerified ===
                                                userConstants.kycDenied) ? (
                                            <Formik
                                                enableReinitialize
                                                initialValues={{
                                                    name: '',
                                                    birthday: '',
                                                    address: '',
                                                    phone: '',
                                                    mail: '',
                                                    nation: '',
                                                    personalId: '',
                                                    docsExpiredDate: '',
                                                    docsFront: '',
                                                    docsBack: '',
                                                    selfie: '',
                                                }}
                                                onSubmit={(
                                                    values,
                                                    { setSubmitting }
                                                ) => {
                                                    console.log(values);
                                                }}
                                            >
                                                {({
                                                    values,
                                                    errors,
                                                    setFieldValue,
                                                }) => {
                                                    console.log(values);
                                                    return (
                                                        <Form>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Name
                                                                </label>
                                                                <Field
                                                                    name='name'
                                                                    className='input input-cyan'
                                                                />
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Birthday
                                                                </label>
                                                                <DatePicker
                                                                    className='input input-cyan'
                                                                    selected={
                                                                        values.birthday
                                                                            ? parseISO(
                                                                                  values.birthday
                                                                              )
                                                                            : new Date()
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) => {
                                                                        setFieldValue(
                                                                            'birthday',
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
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Address
                                                                </label>
                                                                <Field
                                                                    name='address'
                                                                    className='input input-cyan'
                                                                />
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Phone
                                                                </label>
                                                                <Field
                                                                    name='phone'
                                                                    className='input input-cyan'
                                                                />
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Email
                                                                </label>
                                                                <Field
                                                                    name='email'
                                                                    className='input input-cyan'
                                                                />
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Nation
                                                                </label>
                                                                <Select
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
                                                                />
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Personal ID
                                                                </label>
                                                                <Field
                                                                    name='personalId'
                                                                    className='input input-cyan'
                                                                />
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Docs Expired
                                                                    Date
                                                                </label>
                                                                <DatePicker
                                                                    className='input input-cyan'
                                                                    selected={
                                                                        values.birthday
                                                                            ? parseISO(
                                                                                  values.birthday
                                                                              )
                                                                            : new Date()
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
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Docs front
                                                                </label>
                                                                <Field
                                                                    name='docsFront'
                                                                    className='input input-cyan'
                                                                    type='file'
                                                                    onChange={async (
                                                                        e
                                                                    ) => {
                                                                        const uploadedFile =
                                                                            e
                                                                                .target
                                                                                .files[0];
                                                                        const objUrl =
                                                                            await handleUserFileUpload(
                                                                                uploadedFile,
                                                                                `docsFront-${uploadedFile.name}`,
                                                                                'kyc',
                                                                                user.walletAddress
                                                                            );
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Docs back
                                                                </label>
                                                                <Field
                                                                    name='docsBack'
                                                                    className='input input-cyan'
                                                                    type='file'
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        console.log(
                                                                            e
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className='mt-4'>
                                                                <label>
                                                                    Selfie
                                                                </label>
                                                                <Field
                                                                    name='selfie'
                                                                    className='input input-cyan'
                                                                    type='file'
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        console.log(
                                                                            e
                                                                        );
                                                                    }}
                                                                />
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
                                                        </Form>
                                                    );
                                                }}
                                            </Formik>
                                        ) : null}
                                    </div>
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
