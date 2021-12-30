import { Field, FieldArray, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Container from '../../../components/admin/layout/Container';
import { solabProjectActions } from '../../../features/solabProject/solabProjectSlice';
import * as _ from 'lodash';
import Select from 'react-select';
import solabProjectConstants from '../../../features/solabProject/contants';
import { IUserFull } from '../../../features/user/types';
import NumberFormat from 'react-number-format';
import { navigate } from '../../../libs/navigation';

const Whitelist: NextPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const solabRegisteredInfos = useAppSelector(
        (state) => state.solabProject.admin.solabRegisteredInfos
    );
    const totalTokenPayment = useAppSelector(
        (state) => state.solabProject.admin.totalTokenPayment
    );
    const isReloadSolabRegisteredInfos = useAppSelector(
        (state) => state.solabProject.admin.reloadSolabRegisteredInfos
    );

    useEffect(() => {
        if (isReloadSolabRegisteredInfos) {
            const { query } = router;
            dispatch(
                solabProjectActions.fetchSolabRegisteredInfos({ ...query })
            );
            dispatch(solabProjectActions.fetchTotalTokenPayment());
        }
    }, [isReloadSolabRegisteredInfos]);

    useEffect(() => {
        const { query } = router;
        dispatch(solabProjectActions.fetchSolabRegisteredInfos({ ...query }));
        dispatch(solabProjectActions.fetchTotalTokenPayment());
    }, [router]);

    return (
        <Container>
            <div className='p-4 block sm:flex items-center justify-between lg:mt-1.5'>
                <div className='mb-1 w-full'>
                    <div className='mb-4'>
                        <h1 className='title'>Solab Whitelist</h1>
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
                                    <label>Whitelist status</label>
                                    <Select
                                        value={
                                            solabProjectConstants.inWhitelistStatuses.filter(
                                                (item) =>
                                                    item.value ===
                                                    (parseInt(
                                                        values.isInWhitelist as string,
                                                        10
                                                    ) as any)
                                            )[0] || ''
                                        }
                                        options={
                                            solabProjectConstants.inWhitelistStatuses
                                        }
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
                                        onChange={(selected) => {
                                            if (selected) {
                                                const { value } = selected;
                                                if (value || value === 0) {
                                                    setFieldValue(
                                                        'isInWhiteList',
                                                        value
                                                    );
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div>
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
            </div>
            <div className='p-4'>
                <h2 className='text-xl'>Total Payment by token pub key</h2>
                {totalTokenPayment.map((payment) => (
                    <p>
                        <span>{payment._id}: </span>
                        <span>
                            {' '}
                            <NumberFormat
                                thousandsGroupStyle='thousand'
                                value={payment.amount}
                                displayType='text'
                                thousandSeparator={true}
                            />
                        </span>
                    </p>
                ))}
            </div>
            <div className='flex flex-col p-4'>
                <div className='overflow-x-auto'>
                    <div className='align-middle inline-block min-w-full'>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                registerData: solabRegisteredInfos.docs.map(
                                    (data) => ({
                                        ...data,
                                        isInWhitelist: data.isInWhiteList,
                                        isSelected: false,
                                    })
                                ),
                            }}
                            onSubmit={(values) => {
                                const { registerData } = values;
                                const registerDataToSend = registerData
                                    .filter((item) => item.isSelected)
                                    .map((data) => ({
                                        _id: data._id,
                                        isInWhitelist: data.isInWhitelist,
                                    }));
                                if (registerDataToSend.length > 0) {
                                    dispatch(
                                        solabProjectActions.updateSolabWhitelist(
                                            {
                                                registerData:
                                                    registerDataToSend,
                                            }
                                        )
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
                                                    'registerData',
                                                    values.registerData.map(
                                                        (item) => ({
                                                            ...item,
                                                            isSelected: true,
                                                        })
                                                    )
                                                );
                                            }}
                                        >
                                            Select All
                                        </button>
                                        <button
                                            className='btn btn-pink ml-2'
                                            onClick={() => {
                                                setFieldValue(
                                                    'registerData',
                                                    values.registerData.map(
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
                                                    'registerData',
                                                    values.registerData.map(
                                                        (item) => ({
                                                            ...item,
                                                            isInWhitelist:
                                                                solabProjectConstants.inWhitelistStatusApproved,
                                                        })
                                                    )
                                                );
                                            }}
                                        >
                                            Approve all
                                        </button>
                                        <button
                                            className='btn btn-pink ml-2'
                                            onClick={() => {
                                                setFieldValue(
                                                    'registerData',
                                                    values.registerData.map(
                                                        (item) => ({
                                                            ...item,
                                                            isInWhitelist:
                                                                item.isInWhitelist,
                                                        })
                                                    )
                                                );
                                            }}
                                        >
                                            Reject all
                                        </button>
                                        <div className='shadow overflow-visible rounded-lg bg-blue-light pb-20'>
                                            <table className='table-fixed min-w-full divide-y divide-gray-200'>
                                                <thead>
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
                                                            Whitelist status
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Wallet
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Bought
                                                        </th>
                                                        <th
                                                            scope='col'
                                                            className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                        >
                                                            Tickets
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className='bg-white divide-y divide-gray-200'>
                                                    <FieldArray
                                                        name='registerData'
                                                        render={(
                                                            arrayHelpers
                                                        ) =>
                                                            values.registerData.map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <tr>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                <Field
                                                                                    type='checkbox'
                                                                                    name={`registerData.${index}.isSelected`}
                                                                                    value='true'
                                                                                    checked={
                                                                                        values
                                                                                            .registerData[
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
                                                                                        solabProjectConstants.inWhitelistStatuses.filter(
                                                                                            (
                                                                                                item
                                                                                            ) =>
                                                                                                item.value ===
                                                                                                values
                                                                                                    .registerData[
                                                                                                    index
                                                                                                ]
                                                                                                    .isInWhitelist
                                                                                        )[0] ||
                                                                                        ''
                                                                                    }
                                                                                    options={
                                                                                        solabProjectConstants.inWhitelistStatuses
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
                                                                                                    `registerData.${index}.isInWhitelist`,
                                                                                                    value
                                                                                                );
                                                                                            }
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
                                                                                    (
                                                                                        values
                                                                                            .registerData[
                                                                                            index
                                                                                        ]
                                                                                            .user as IUserFull
                                                                                    )
                                                                                        .walletAddress
                                                                                }
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                {
                                                                                    values
                                                                                        .registerData[
                                                                                        index
                                                                                    ]
                                                                                        .bought
                                                                                }
                                                                            </td>
                                                                            <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                                {
                                                                                    values
                                                                                        .registerData[
                                                                                        index
                                                                                    ]
                                                                                        .tickets
                                                                                }
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
                                if (solabRegisteredInfos.prevPage) {
                                    navigate(
                                        solabRegisteredInfos.prevPage,
                                        router
                                    );
                                }
                            }}
                            className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-solabCyan-500 bg-white hover:bg-gray-50'
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                if (solabRegisteredInfos.nextPage) {
                                    navigate(
                                        solabRegisteredInfos.nextPage,
                                        router
                                    );
                                }
                            }}
                            className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-solabCyan-500 bg-white hover:bg-gray-50'
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Whitelist;
