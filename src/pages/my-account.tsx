import { Tab } from '@headlessui/react';
import type { NextPage } from 'next';
import { Fragment, useEffect } from 'react';
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
import { userInfo } from 'os';

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
                                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 py-5 px-2 lg:px-5 w-full mx-auto'>
                                            Manual
                                        </div>
                                        <div className='bg-solabGray-300 rounded-lg border border-solabGray-50 py-5 px-2 lg:px-5 w-full mx-auto'>
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
                                                        personalId: '',
                                                        docsExpiredDate:
                                                            formatISO(
                                                                new Date(),
                                                                {
                                                                    representation:
                                                                        'date',
                                                                }
                                                            ),
                                                        docsFront: '',
                                                        docsBack: '',
                                                        selfie: '',
                                                    }}
                                                    onSubmit={(
                                                        values,
                                                        { setSubmitting }
                                                    ) => {
                                                        dispatch(
                                                            userActions.updateKyc(
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
                                                            personalId:
                                                                Yup.string()
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
                                                        }
                                                    )}
                                                >
                                                    {({
                                                        values,
                                                        errors,
                                                        setFieldValue,
                                                    }) => {
                                                        return (
                                                            <Form>
                                                                <div className='mt-4'>
                                                                    <label>
                                                                        Personal
                                                                        ID
                                                                    </label>
                                                                    <Field
                                                                        name='personalId'
                                                                        className='input input-cyan'
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
                                                                    <label>
                                                                        Docs
                                                                        Expired
                                                                        Date
                                                                    </label>
                                                                    <DatePicker
                                                                        className='input input-cyan'
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
                                                                <div className='mt-4'>
                                                                    <label>
                                                                        Docs
                                                                        front
                                                                    </label>
                                                                    <Field
                                                                        name='docsFrontFile'
                                                                        className='input input-cyan'
                                                                        accept='image/*'
                                                                        type='file'
                                                                        disabled={
                                                                            isUpdatingKyc
                                                                                ? true
                                                                                : false
                                                                        }
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
                                                                    />
                                                                    <ErrorMessage
                                                                        name='docsFront'
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
                                                                    {values.docsFront ? (
                                                                        <div className='mt-4 relative h-52 w-full'>
                                                                            <Image
                                                                                src={
                                                                                    values.docsFront
                                                                                }
                                                                                layout='fill'
                                                                            />
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mt-4'>
                                                                    <label>
                                                                        Docs
                                                                        back
                                                                    </label>
                                                                    <Field
                                                                        name='docsBackFile'
                                                                        className='input input-cyan'
                                                                        type='file'
                                                                        accept='image/*'
                                                                        disabled={
                                                                            isUpdatingKyc
                                                                                ? true
                                                                                : false
                                                                        }
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
                                                                                    `docsBack-${uploadedFile.name}`,
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
                                                                    />
                                                                    <ErrorMessage
                                                                        name='docsBack'
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
                                                                    {values.docsBack ? (
                                                                        <div className='mt-4 relative h-52 w-full'>
                                                                            <Image
                                                                                src={
                                                                                    values.docsBack
                                                                                }
                                                                                layout='fill'
                                                                            />
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mt-4'>
                                                                    <label>
                                                                        Selfie
                                                                    </label>
                                                                    <Field
                                                                        name='selfieFile'
                                                                        className='input input-cyan'
                                                                        type='file'
                                                                        accept='image/*'
                                                                        disabled={
                                                                            isUpdatingKyc
                                                                                ? true
                                                                                : false
                                                                        }
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
                                                                                    `selfie-${uploadedFile.name}`,
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
                                                                    />
                                                                    <ErrorMessage
                                                                        name='selfie'
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
                                                                    {values.selfie ? (
                                                                        <div className='mt-4 relative h-52 w-full'>
                                                                            <Image
                                                                                src={
                                                                                    values.selfie
                                                                                }
                                                                                layout='fill'
                                                                            />
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                                <div className='mt-4'>
                                                                    {isUpdatingKyc ? (
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
