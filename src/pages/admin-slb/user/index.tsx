import { Field, FieldArray, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Container from '../../../components/admin/layout/Container';
import { updateActiveSidebarItem } from '../../../features/layout/layoutSlice';
import { adminSidebarItemOptions } from '../../../features/layout/types';
import Select from 'react-select';
import {
    kycStatuses,
    kycVerified,
    kycDenied,
} from '../../../features/user/constants';
import { userActions } from '../../../features/user/userSlice';
import * as _ from 'lodash';
import Image from 'next/image';
import ImagePreview from '../../../components/ImagePreview';
import { imagePreviewActions } from '../../../features/imagePreview/imagePreviewSlice';
import { formatISO, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { navigate } from '../../../libs/navigation';

const User: NextPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const users = useAppSelector((state) => state.user.admin.users);
    const isReloadUser = useAppSelector(
        (state) => state.user.admin.reloadUsers
    );

    useEffect(() => {
        if (isReloadUser) {
            const { query } = router;
            dispatch(userActions.fetchUsers({ ...query }));
        }
    }, [isReloadUser]);
    useEffect(() => {
        dispatch(updateActiveSidebarItem(adminSidebarItemOptions.user));
    }, []);
    useEffect(() => {
        const { query } = router;
        dispatch(userActions.fetchUsers({ ...query }));
    }, [router]);

    return (
        <Container>
            <div className='p-4 block sm:flex items-center justify-between lg:mt-1.5'>
                <div className='mb-1 w-full'>
                    <div className='mb-4'>
                        <h1 className='title'>User</h1>
                    </div>
                </div>
            </div>
            <div className='p-4'>
                <h2 className='text-xl'>Filter</h2>
                <Formik
                    enableReinitialize
                    initialValues={_.omit(router.query as any, [
                        'page',
                        'limit',
                    ])}
                    onSubmit={(values) => {
                        const { query } = router;
                        const newQuery = { ...query, ...values, page: 1 };
                        router.push({
                            pathname: router.pathname,
                            query: newQuery,
                        });
                    }}
                >
                    {({ values, setFieldValue }) => {
                        return (
                            <Form>
                                <div>
                                    <label>Kyc status</label>
                                    <Select
                                        value={
                                            kycStatuses.filter(
                                                (item) =>
                                                    item.value ===
                                                    (parseInt(
                                                        values.isKycVerified as string,
                                                        10
                                                    ) as any)
                                            )[0] || ''
                                        }
                                        options={kycStatuses}
                                        onChange={(selected) => {
                                            if (selected) {
                                                const { value } = selected;
                                                if (value || value === 0) {
                                                    setFieldValue(
                                                        'isKycVerified',
                                                        value
                                                    );
                                                }
                                            } else {
                                                setFieldValue('kyc', 2);
                                            }
                                        }}
                                        theme={(theme) => {
                                            return {
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    neutral0: '#0F1217',
                                                    neutral20: '#1F2733',
                                                    neutral30: '#1F2733',
                                                    primary: '#1EE8BB',
                                                    primary50: '#1EE8BB',
                                                    primary25: '#1EE8BB',
                                                    neutral5: '#1EE8BB',
                                                    neutral80: '#E2E4E9',
                                                },
                                            };
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>Created At (From)</label>
                                    <DatePicker
                                        className='input input-cyan text-solabWhite-500'
                                        selected={
                                            values.created_at_from
                                                ? parseISO(
                                                      values.created_at_from as string
                                                  )
                                                : new Date()
                                        }
                                        onChange={(date) => {
                                            setFieldValue(
                                                'created_at_from',
                                                formatISO(date, {
                                                    representation: 'date',
                                                })
                                            );
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>Created At (To)</label>
                                    <DatePicker
                                        className='input input-cyan text-solabWhite-500'
                                        selected={
                                            values.created_at_to
                                                ? parseISO(
                                                      values.created_at_to as string
                                                  )
                                                : new Date()
                                        }
                                        onChange={(date) => {
                                            setFieldValue(
                                                'created_at_to',
                                                formatISO(date, {
                                                    representation: 'date',
                                                })
                                            );
                                        }}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <label>Wallet Address</label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        name='walletAddress'
                                    />
                                </div>
                                <button type='submit' className='btn btn-pink'>
                                    Filter
                                </button>
                            </Form>
                        );
                    }}
                </Formik>
                <h1 className='text-xl mt-2'>Total: {users.totalDocs}</h1>
                <h1 className='text-xl mt-2'>Total Page: {users.totalPages}</h1>
            </div>
            <div className='flex flex-col p-4'>
                <div className='overflow-hidden'>
                    <div className='align-middle inline-block min-w-full'>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                kycData: users.docs.map((user) => {
                                    return {
                                        ...user,
                                        kycStatus: user.isKycVerified,
                                        isSelected: false,
                                        kycNote: user.kycNote,
                                    };
                                }),
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                const { kycData } = values;
                                const kycDataToSend = kycData
                                    .filter((item) => item.isSelected)
                                    .map((data) => ({
                                        address: data.walletAddress,
                                        kycStatus: data.kycStatus,
                                        kycNote: data.kycNote,
                                    }));
                                if (kycDataToSend.length > 0) {
                                    dispatch(
                                        userActions.updateKycAdmin({
                                            kycData: kycDataToSend,
                                        })
                                    );
                                }
                            }}
                        >
                            {({ values, isSubmitting, setFieldValue }) => {
                                return (
                                    <Form>
                                        <button
                                            className='btn btn-pink'
                                            onClick={() => {
                                                setFieldValue(
                                                    'kycData',
                                                    values.kycData.map(
                                                        (item) => ({
                                                            ...item,
                                                            isSelected: true,
                                                        })
                                                    )
                                                );
                                            }}
                                        >
                                            Select all
                                        </button>
                                        <button
                                            className='btn btn-pink ml-2'
                                            onClick={() => {
                                                setFieldValue(
                                                    'kycData',
                                                    values.kycData.map(
                                                        (item) => ({
                                                            ...item,
                                                            isSelected: false,
                                                        })
                                                    )
                                                );
                                            }}
                                        >
                                            Unselect All
                                        </button>
                                        <button
                                            className='btn btn-pink ml-2'
                                            onClick={() => {
                                                setFieldValue(
                                                    'kycData',
                                                    values.kycData.map(
                                                        (item) => ({
                                                            ...item,
                                                            kycStatus:
                                                                kycVerified,
                                                        })
                                                    )
                                                );
                                            }}
                                        >
                                            Set All verified
                                        </button>
                                        <button
                                            className='btn btn-pink ml-2'
                                            onClick={() => {
                                                setFieldValue(
                                                    'kycData',
                                                    values.kycData.map(
                                                        (item) => ({
                                                            ...item,
                                                            kycStatus:
                                                                kycDenied,
                                                        })
                                                    )
                                                );
                                            }}
                                        >
                                            Set All denied
                                        </button>

                                        <div className='shadow overflow-x-auto rounded-lg bg-blue-light'>
                                            <table className='table-fixed min-w-full divide-y divide-gray-200'>
                                                <thead className='bg-blue-light text-white-500'>
                                                    <tr>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Select
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Kyc status
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Wallet address
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Kyc note
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Display name
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            National Id
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Front
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Back
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Selfie
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className='bg-white divide-y divide-gray-200'>
                                                    <FieldArray
                                                        name='kycData'
                                                        render={(
                                                            arrayHelpers
                                                        ) =>
                                                            values.kycData.map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <tr>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                <Field
                                                                                    type='checkbox'
                                                                                    name={`kycData.${index}.isSelected`}
                                                                                    value='true'
                                                                                    checked={
                                                                                        values
                                                                                            .kycData[
                                                                                            index
                                                                                        ]
                                                                                            .isSelected
                                                                                    }
                                                                                    className='w-5 h-5'
                                                                                />
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                <Select
                                                                                    className='w-40'
                                                                                    value={
                                                                                        kycStatuses.filter(
                                                                                            (
                                                                                                item
                                                                                            ) =>
                                                                                                item.value ===
                                                                                                values
                                                                                                    .kycData[
                                                                                                    index
                                                                                                ]
                                                                                                    .kycStatus
                                                                                        )[0] ||
                                                                                        ''
                                                                                    }
                                                                                    options={
                                                                                        kycStatuses
                                                                                    }
                                                                                    onChange={(
                                                                                        selected
                                                                                    ) => {
                                                                                        if (
                                                                                            selected
                                                                                        ) {
                                                                                            const {
                                                                                                value,
                                                                                            } =
                                                                                                selected;
                                                                                            if (
                                                                                                value ||
                                                                                                value ===
                                                                                                    0
                                                                                            ) {
                                                                                                setFieldValue(
                                                                                                    `kycData.${index}.kycStatus`,
                                                                                                    value
                                                                                                );
                                                                                            }
                                                                                        } else {
                                                                                            setFieldValue(
                                                                                                `kycData.${index}.kycStatus`,
                                                                                                2
                                                                                            );
                                                                                        }
                                                                                    }}
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
                                                                                />
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                {
                                                                                    values
                                                                                        .kycData[
                                                                                        index
                                                                                    ]
                                                                                        .walletAddress
                                                                                }
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                <Field
                                                                                    className='text-blue-500'
                                                                                    name={`kycData.${index}.kycNote`}
                                                                                />
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                {
                                                                                    values
                                                                                        .kycData[
                                                                                        index
                                                                                    ]
                                                                                        .displayName
                                                                                }
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                {
                                                                                    values
                                                                                        .kycData[
                                                                                        index
                                                                                    ]
                                                                                        .kyc
                                                                                        ?.personalId
                                                                                }
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                <div
                                                                                    className='relative w-52 h-40'
                                                                                    onClick={() => {
                                                                                        if (
                                                                                            values
                                                                                                .kycData[
                                                                                                index
                                                                                            ]
                                                                                                .kyc
                                                                                                ?.docsFront
                                                                                        ) {
                                                                                            dispatch(
                                                                                                imagePreviewActions.openImagePreview(
                                                                                                    values
                                                                                                        .kycData[
                                                                                                        index
                                                                                                    ]
                                                                                                        .kyc
                                                                                                        ?.docsFront as string
                                                                                                )
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    {values
                                                                                        .kycData[
                                                                                        index
                                                                                    ]
                                                                                        .kyc
                                                                                        ?.docsFront ? (
                                                                                        <Image
                                                                                            src={
                                                                                                values
                                                                                                    .kycData[
                                                                                                    index
                                                                                                ]
                                                                                                    .kyc
                                                                                                    ?.docsFront as string
                                                                                            }
                                                                                            layout='fill'
                                                                                        />
                                                                                    ) : null}
                                                                                </div>
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                <div
                                                                                    className='relative w-52 h-40'
                                                                                    onClick={() => {
                                                                                        if (
                                                                                            values
                                                                                                .kycData[
                                                                                                index
                                                                                            ]
                                                                                                .kyc
                                                                                                ?.docsBack
                                                                                        ) {
                                                                                            dispatch(
                                                                                                imagePreviewActions.openImagePreview(
                                                                                                    values
                                                                                                        .kycData[
                                                                                                        index
                                                                                                    ]
                                                                                                        .kyc
                                                                                                        ?.docsBack as string
                                                                                                )
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    {values
                                                                                        .kycData[
                                                                                        index
                                                                                    ]
                                                                                        .kyc
                                                                                        ?.docsBack ? (
                                                                                        <Image
                                                                                            src={
                                                                                                values
                                                                                                    .kycData[
                                                                                                    index
                                                                                                ]
                                                                                                    .kyc
                                                                                                    ?.docsBack as string
                                                                                            }
                                                                                            layout='fill'
                                                                                        />
                                                                                    ) : null}
                                                                                </div>
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                <div
                                                                                    className='relative w-52 h-40'
                                                                                    onClick={() => {
                                                                                        if (
                                                                                            values
                                                                                                .kycData[
                                                                                                index
                                                                                            ]
                                                                                                .kyc
                                                                                                ?.selfie
                                                                                        ) {
                                                                                            dispatch(
                                                                                                imagePreviewActions.openImagePreview(
                                                                                                    values
                                                                                                        .kycData[
                                                                                                        index
                                                                                                    ]
                                                                                                        .kyc
                                                                                                        ?.selfie as string
                                                                                                )
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    {values
                                                                                        .kycData[
                                                                                        index
                                                                                    ]
                                                                                        .kyc
                                                                                        ?.selfie ? (
                                                                                        <Image
                                                                                            src={
                                                                                                values
                                                                                                    .kycData[
                                                                                                    index
                                                                                                ]
                                                                                                    .kyc
                                                                                                    ?.selfie as string
                                                                                            }
                                                                                            layout='fill'
                                                                                        />
                                                                                    ) : null}
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                }
                                                            )
                                                        }
                                                    />
                                                </tbody>
                                            </table>
                                        </div>

                                        <button
                                            className='btn btn-pink'
                                            type='submit'
                                        >
                                            {' '}
                                            Submit
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
                    <div className='flex-1 flex justify-between'>
                        <button
                            onClick={() => {
                                if (users.prevPage) {
                                    navigate(users.prevPage, router);
                                }
                            }}
                            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-solabCyan-500 bg-white hover:bg-gray-50'
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                if (users.nextPage) {
                                    navigate(users.nextPage, router);
                                }
                            }}
                            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-solabCyan-500 bg-white hover:bg-gray-50'
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <ImagePreview />
        </Container>
    );
};

export default User;
