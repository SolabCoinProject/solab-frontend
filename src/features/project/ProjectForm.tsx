import {format} from 'date-fns';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import {FaTimes} from 'react-icons/fa';
import DatetimePicker from '../../components/DatetimePicker';
import RichTextEditor from '../../components/RichTextEditor';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {projectActions} from './projectSlice';
import {v4 as uuid} from 'uuid';
import Select from "react-select";
import {kycStatuses} from "../user/constants";
import {socialTypes} from "./constants";

interface Props {
    initialValues: any;
    onSubmit: (values: any, actions: any) => void;
}

const projectValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    slug: Yup.string().required('Slug is required'),
    description: Yup.string().required('Description is required'),
    pubKey: Yup.string().required('Description is required'),
    thumbnail: Yup.string()
        .required('Thumbnail is required')
        .url('Thumbnail must be a valid URL'),
    token: Yup.object().shape({
        thumbnail: Yup.string()
            .required('Token thumbnail is required')
            .url('Token thumbnail must be a valid URL'),
        symbol: Yup.string().required('Token symbol is required'),
        decimals: Yup.number().min(1, 'Decimals must be greater than 0').required('Decimals is required'),
    }),
    keyMetrics: Yup.array()
        .notRequired()
        .nullable()
        .of(
            Yup.object().shape({
                unitPosition: Yup.number().notRequired().nullable(),
                valueType: Yup.number().notRequired().nullable(),
            })
        ),
    social: Yup.array()
        .notRequired()
        .nullable()
        .of(
            Yup.object().shape({
                socialType: Yup.number().required('Social type is required'),
                link: Yup.string().required('Social type is required'),
            })
        ),
    idoPrice: Yup.number().required('Ido price is required'),
    idoSlots: Yup.number().required('Ido slots is required'),
    details: Yup.array()
        .notRequired()
        .nullable()
        .of(
            Yup.object().shape({
                title: Yup.string().required('Title is required'),
                content: Yup.string().required('Description is required'),
            })
        ),
    phrases: Yup.object().shape({
        preparation: Yup.object().shape({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
        }),
        whitelist: Yup.object().shape({
            startDate: Yup.string().required('Start date is required'),
            endDate: Yup.string().required('End date is required'),
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
        }),
        sale: Yup.object().shape({
            startDate: Yup.string().required('Start date is required'),
            endDate: Yup.string().required('End date is required'),
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
        }),
        distribution: Yup.object().shape({
            startDate: Yup.string().required('Start date is required'),
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
        }),
    }),
    launchType: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        paymentAmountAtDistribution: Yup.number()
            .required('Payment amount at distribution is required')
            .min(0, 'Payment amount at distribution must be greater than 0'),
        tokenPaymentInterval: Yup.number()
            .required('Token payment interval is required')
            .min(0, 'Token payment interval must be greater than 0'),
        tokenPaymentPercent: Yup.number()
            .required('Token payment percent is required')
            .min(0, 'Token payment percent must be greater than 0')
            .max(100, 'Token payment percent must be less than 100'),
    }),
    communityTasks: Yup.array()
        .notRequired()
        .nullable()
        .of(
            Yup.object().shape({
                uuid: Yup.string().required('Task uuid is required!'),
                userLinkRequired: Yup.bool(),
                socialType: Yup.number().required('Task social type is required'),
                url: Yup.string().required('Task url is required'),
            })
        ),
});

const ProjectFrom: React.FC<Props> = ({initialValues, onSubmit}) => {
    const fieldOptions = useAppSelector(
        (state) => state.project.admin.fieldOptions
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(projectActions.fetchFieldOptions());
    }, []);
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={projectValidationSchema}
        >
            {({values, isSubmitting, setFieldValue, errors}) => {
                return (
                    <Form>
                        <div className='grid grid-cols-3 gap-x-8'>
                            <div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Name
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        placeholder='Enter project name'
                                        name='name'
                                    />
                                    <ErrorMessage
                                        name='name'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Token
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        placeholder='Enter token thumbnail'
                                        name='token.thumbnail'
                                    />
                                    <ErrorMessage
                                        name='token.thumbnail'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        placeholder='Enter token symbol'
                                        name='token.symbol'
                                    />
                                    <ErrorMessage
                                        name='token.symbol'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        placeholder='Enter token category'
                                        name='token.category'
                                    />
                                    <ErrorMessage
                                        name='token.category'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='number'
                                        placeholder='Enter token decimals'
                                        name='token.decimals'
                                    />
                                    <ErrorMessage
                                        name='token.decimals'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Token additional Information
                                    </label>
                                    <FieldArray
                                        name='token.others'
                                        render={(arrayHelpers) => (
                                            <div>
                                                <div className='grid grid-cols-7 gap-1'>
                                                    {values.token.others?.map(
                                                        (
                                                            other: any,
                                                            index: any
                                                        ) => (
                                                            <>
                                                                <div className='col-span-3'>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter label'
                                                                        name={`token.others.${index}.label`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`token.others.${index}.label`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='col-span-3'>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter value'
                                                                        name={`token.others.${index}.value`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`token.others.${index}.value`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='col-span-1'>
                                                                    <button
                                                                        className='btn btn-pink'
                                                                        onClick={() =>
                                                                            arrayHelpers.remove(
                                                                                index
                                                                            )
                                                                        }
                                                                        type='button'
                                                                    >
                                                                        <FaTimes/>
                                                                    </button>
                                                                </div>
                                                            </>
                                                        )
                                                    )}
                                                </div>
                                                <button
                                                    className='btn btn-pink'
                                                    onClick={() =>
                                                        arrayHelpers.push({
                                                            label: '',
                                                            value: '',
                                                        })
                                                    }
                                                    type='button'
                                                >
                                                    Add more information
                                                </button>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Slug
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        placeholder='Enter project slug'
                                        name='slug'
                                    />
                                    <ErrorMessage
                                        name='slug'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Ido price
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='number'
                                        placeholder='Enter project ido price'
                                        name='idoPrice'
                                    />
                                    <ErrorMessage
                                        name='idoPrice'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Ido slots
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='number'
                                        placeholder='Enter project ido price'
                                        name='idoSlots'
                                    />
                                    <ErrorMessage
                                        name='idoSlots'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Raise amount
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='number'
                                        placeholder='Enter project raise amount'
                                        name='raiseAmount'
                                    />
                                    <ErrorMessage
                                        name='raiseAmount'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Description
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        placeholder='Enter project description'
                                        name='description'
                                    />
                                    <ErrorMessage
                                        name='description'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Thumbnail
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        placeholder='Enter project thumbnail link'
                                        name='thumbnail'
                                    />
                                    <ErrorMessage
                                        name='thumbnail'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Receive USDC wallet pub key
                                    </label>
                                    <Field
                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                        type='text'
                                        placeholder='Enter receive USDC wallet pub key'
                                        name='pubKey'
                                    />
                                    <ErrorMessage
                                        name='pubKey'
                                        render={(msg) => (
                                            <span className='font-bold text-red-500'>
                                                {msg}
                                            </span>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-blue-900 text-2xl text-center'>
                                Phrases configuration
                            </h1>
                            <div className='overflow-x-auto'>
                                <div className='align-middle inline-block min-w-full'>
                                    <div className='shadow overflow-hidden rounded-lg bg-blue-light'>
                                        <table className='table-fixed min-w-full divide-y divide-gray-200'>
                                            <thead className='bg-blue-light text-white-500'>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                ></th>
                                                <th
                                                    scope='col'
                                                    className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                >
                                                    Preparation
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                >
                                                    Whitelist
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                >
                                                    Sale
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='p-4 text-left text-xs text-white-500 font-bold uppercase'
                                                >
                                                    Distribution
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className='bg-white divide-y divide-gray-200'>
                                            <tr>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    Start Date
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'></td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <DatetimePicker
                                                        value={
                                                            values.phrases
                                                                .whitelist
                                                                .startDate
                                                                ? new Date(
                                                                    values.phrases.whitelist.startDate
                                                                )
                                                                : new Date()
                                                        }
                                                        onChange={(
                                                            value
                                                        ) => {
                                                            setFieldValue(
                                                                'phrases.whitelist.startDate',
                                                                format(
                                                                    new Date(
                                                                        value
                                                                    ),
                                                                    'yyyy-MM-dd HH:mm:ss'
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <DatetimePicker
                                                        value={
                                                            values.phrases
                                                                .sale
                                                                .startDate
                                                                ? new Date(
                                                                    values.phrases.sale.startDate
                                                                )
                                                                : new Date()
                                                        }
                                                        onChange={(
                                                            value
                                                        ) => {
                                                            setFieldValue(
                                                                'phrases.sale.startDate',
                                                                format(
                                                                    new Date(
                                                                        value
                                                                    ),
                                                                    'yyyy-MM-dd HH:mm:ss'
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <DatetimePicker
                                                        value={
                                                            values.phrases
                                                                .distribution
                                                                .startDate
                                                                ? new Date(
                                                                    values.phrases.distribution.startDate
                                                                )
                                                                : new Date()
                                                        }
                                                        onChange={(
                                                            value
                                                        ) => {
                                                            setFieldValue(
                                                                'phrases.distribution.startDate',
                                                                format(
                                                                    new Date(
                                                                        value
                                                                    ),
                                                                    'yyyy-MM-dd HH:mm:ss'
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    End Date
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'></td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <DatetimePicker
                                                        value={
                                                            values.phrases
                                                                .whitelist
                                                                .endDate
                                                                ? new Date(
                                                                    values.phrases.whitelist.endDate
                                                                )
                                                                : new Date()
                                                        }
                                                        onChange={(
                                                            value
                                                        ) => {
                                                            setFieldValue(
                                                                'phrases.whitelist.endDate',
                                                                format(
                                                                    new Date(
                                                                        value
                                                                    ),
                                                                    'yyyy-MM-dd HH:mm:ss'
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <DatetimePicker
                                                        value={
                                                            values.phrases
                                                                .sale
                                                                .endDate
                                                                ? new Date(
                                                                    values.phrases.sale.endDate
                                                                )
                                                                : new Date()
                                                        }
                                                        onChange={(
                                                            value
                                                        ) => {
                                                            setFieldValue(
                                                                'phrases.sale.endDate',
                                                                format(
                                                                    new Date(
                                                                        value
                                                                    ),
                                                                    'yyyy-MM-dd HH:mm:ss'
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'></td>
                                            </tr>
                                            <tr>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    Title
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <div>
                                                        <Field
                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                            type='text'
                                                            placeholder='Enter preparation title'
                                                            name='phrases.preparation.title'
                                                        />
                                                        <ErrorMessage
                                                            name='phrases.preparation.title'
                                                            render={(
                                                                msg
                                                            ) => (
                                                                <span className='font-bold text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <div>
                                                        <Field
                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                            type='text'
                                                            placeholder='Enter preparation title'
                                                            name='phrases.whitelist.title'
                                                        />
                                                        <ErrorMessage
                                                            name='phrases.whitelist.title'
                                                            render={(
                                                                msg
                                                            ) => (
                                                                <span className='font-bold text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                            )}
                                                        />
                                                    </div>
                                                </td>

                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <div>
                                                        <Field
                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                            type='text'
                                                            placeholder='Enter sale title'
                                                            name='phrases.sale.title'
                                                        />
                                                        <ErrorMessage
                                                            name='phrases.sale.title'
                                                            render={(
                                                                msg
                                                            ) => (
                                                                <span className='font-bold text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <div>
                                                        <Field
                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                            type='text'
                                                            placeholder='Enter distribution title'
                                                            name='phrases.distribution.title'
                                                        />
                                                        <ErrorMessage
                                                            name='phrases.distribution.title'
                                                            render={(
                                                                msg
                                                            ) => (
                                                                <span className='font-bold text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    Description
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <div>
                                                        <Field
                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                            type='text'
                                                            placeholder='Enter preparation description'
                                                            name='phrases.preparation.description'
                                                        />
                                                        <ErrorMessage
                                                            name='phrases.preparation.description'
                                                            render={(
                                                                msg
                                                            ) => (
                                                                <span className='font-bold text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <div>
                                                        <Field
                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                            type='text'
                                                            placeholder='Enter preparation description'
                                                            name='phrases.whitelist.description'
                                                        />
                                                        <ErrorMessage
                                                            name='phrases.whitelist.description'
                                                            render={(
                                                                msg
                                                            ) => (
                                                                <span className='font-bold text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <div>
                                                        <Field
                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                            type='text'
                                                            placeholder='Enter sale description'
                                                            name='phrases.sale.description'
                                                        />
                                                        <ErrorMessage
                                                            name='phrases.sale.description'
                                                            render={(
                                                                msg
                                                            ) => (
                                                                <span className='font-bold text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                    <div>
                                                        <Field
                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                            type='text'
                                                            placeholder='Enter distribution description'
                                                            name='phrases.distribution.description'
                                                        />
                                                        <ErrorMessage
                                                            name='phrases.distribution.description'
                                                            render={(
                                                                msg
                                                            ) => (
                                                                <span className='font-bold text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                            )}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-blue-900 text-2xl text-center'>
                                Launch type configuration
                            </h1>
                            <div className='grid grid-cols-3 gap-x-8'>
                                <div>
                                    <div className='mt-3'>
                                        <label
                                            className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                            Name
                                        </label>
                                        <Field
                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                            type='text'
                                            placeholder='Enter launch type name'
                                            name='launchType.name'
                                        />
                                        <ErrorMessage
                                            name='launchType.name'
                                            render={(msg) => (
                                                <span className='font-bold text-red-500'>
                                                    {msg}
                                                </span>
                                            )}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <label
                                            className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                            Token payment percent each interval
                                        </label>
                                        <Field
                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                            type='text'
                                            placeholder='Enter token payment percent each interval'
                                            name='launchType.tokenPaymentPercent'
                                        />
                                        <ErrorMessage
                                            name='launchType.tokenPaymentPercent'
                                            render={(msg) => (
                                                <span className='font-bold text-red-500'>
                                                    {msg}
                                                </span>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className='mt-3'>
                                        <label
                                            className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                            Payment amount at distribution
                                        </label>
                                        <Field
                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                            type='number'
                                            placeholder='Enter payment amount at distribution'
                                            name='launchType.paymentAmountAtDistribution'
                                        />
                                        <ErrorMessage
                                            name='launchType.paymentAmountAtDistribution'
                                            render={(msg) => (
                                                <span className='font-bold text-red-500'>
                                                    {msg}
                                                </span>
                                            )}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <label
                                            className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                            Token payment all date
                                        </label>
                                        <DatetimePicker
                                            value={
                                                values.launchType
                                                    .tokenPaymentAllDate
                                                    ? new Date(
                                                        values.launchType.tokenPaymentAllDate
                                                    )
                                                    : new Date()
                                            }
                                            onChange={(value) => {
                                                setFieldValue(
                                                    'launchType.tokenPaymentAllDate',
                                                    format(
                                                        new Date(value),
                                                        'yyyy-MM-dd HH:mm:ss'
                                                    )
                                                );
                                            }}
                                        />
                                        <ErrorMessage
                                            name='phrases.launchType.tokenPaymentAllDate'
                                            render={(msg) => (
                                                <span className='font-bold text-red-500'>
                                                    {msg}
                                                </span>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className='mt-3'>
                                        <label
                                            className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                            Token payment interval (days)
                                        </label>
                                        <Field
                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                            type='number'
                                            placeholder='Enter token payment interval'
                                            name='launchType.tokenPaymentInterval'
                                        />
                                        <ErrorMessage
                                            name='launchType.tokenPaymentInterval'
                                            render={(msg) => (
                                                <span className='font-bold text-red-500'>
                                                    {msg}
                                                </span>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-x-8 mt-4'>
                            <div>
                                <h2 className='text-xl text-gray-900'>
                                    Key metrics
                                </h2>
                                <FieldArray
                                    name='keyMetrics'
                                    render={(arrayHelpers) => {
                                        return (
                                            <>
                                                {values.keyMetrics?.map(
                                                    (
                                                        keyMetric: any,
                                                        index: any
                                                    ) => {
                                                        return (
                                                            <div className='grid grid-cols-2 gap-x-4'>
                                                                <div className='mt-3'>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Label
                                                                    </label>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter key metrics label'
                                                                        name={`keyMetrics.${index}.label`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`keyMetrics.${index}.label`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Value
                                                                    </label>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter key metrics value'
                                                                        name={`keyMetrics.${index}.value`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`keyMetrics.${index}.value`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Unit
                                                                    </label>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter key metrics unit'
                                                                        name={`keyMetrics.${index}.unit`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`keyMetrics.${index}.unit`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Unit
                                                                        position
                                                                    </label>
                                                                    <Select
                                                                        options={fieldOptions.keyMetricUnitPoses}

                                                                        value={fieldOptions.keyMetricUnitPoses.find(item => item.value === keyMetric.unitPosition)}
                                                                        onChange={(
                                                                            selected
                                                                        ) => {
                                                                            if (selected) {
                                                                                setFieldValue(
                                                                                    `keyMetrics.${index}.unitPosition`,
                                                                                    selected.value
                                                                                )
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

                                                                    <ErrorMessage
                                                                        name={`keyMetrics.${index}.unitPosition`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Key
                                                                        metric
                                                                        value
                                                                        type
                                                                    </label>

                                                                    <Select
                                                                        options={fieldOptions.keyMetricTypes}

                                                                        value={fieldOptions.keyMetricTypes.find(item => item.value === keyMetric.valueType)}
                                                                        onChange={(
                                                                            selected
                                                                        ) => {
                                                                            if (selected) {
                                                                                setFieldValue(
                                                                                    `keyMetrics.${index}.valueType`,
                                                                                    selected.value
                                                                                )
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

                                                                    <ErrorMessage
                                                                        name={`keyMetrics.${index}.valueType`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <button
                                                                        className='btn btn-pink'
                                                                        onClick={() =>
                                                                            arrayHelpers.remove(
                                                                                index
                                                                            )
                                                                        }
                                                                        type='button'
                                                                    >
                                                                        <FaTimes/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                                <button
                                                    className='btn btn-pink'
                                                    type='button'
                                                    onClick={() => {
                                                        arrayHelpers.push({
                                                            value: '',
                                                            label: '',
                                                            unit: '',
                                                            unitPosition: '',
                                                            valueType: '',
                                                        });
                                                    }}
                                                >
                                                    Add new key metrics
                                                </button>
                                            </>
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                <h2 className='text-xl text-gray-900'>
                                    Social
                                </h2>
                                <FieldArray
                                    name='social'
                                    render={(arrayHelpers) => {
                                        return (
                                            <>
                                                {values.social?.map(
                                                    (
                                                        social: any,
                                                        index: any
                                                    ) => {
                                                        return (
                                                            <div className='grid grid-cols-3 items-center gap-x-4'>
                                                                <div className='mt-3'>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Type
                                                                    </label>
                                                                    <select
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        placeholder='Enter social type'
                                                                        name={`social.${index}.socialType`}
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setFieldValue(
                                                                                `social.${index}.socialType`,
                                                                                parseInt(
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            )
                                                                        }
                                                                    >
                                                                        {fieldOptions.socialTypes.map(
                                                                            (
                                                                                socialType
                                                                            ) => (
                                                                                <option
                                                                                    value={
                                                                                        socialType.value
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        socialType.label
                                                                                    }
                                                                                </option>
                                                                            )
                                                                        )}
                                                                    </select>
                                                                    <ErrorMessage
                                                                        name={`social.${index}.socialType`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Link
                                                                    </label>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter social link'
                                                                        name={`social.${index}.link`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`social.${index}.link`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <button
                                                                        className='btn btn-pink'
                                                                        onClick={() =>
                                                                            arrayHelpers.remove(
                                                                                index
                                                                            )
                                                                        }
                                                                        type='button'
                                                                    >
                                                                        <FaTimes/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                                <button
                                                    className='btn btn-pink'
                                                    type='button'
                                                    onClick={() => {

                                                        arrayHelpers.push({
                                                            socialType:
                                                                fieldOptions
                                                                    .socialTypes
                                                                    .length >
                                                                0 &&
                                                                fieldOptions.socialTypes
                                                                    ? fieldOptions
                                                                        .socialTypes[0]
                                                                        ? fieldOptions
                                                                            .socialTypes[0]
                                                                            .value
                                                                        : 0
                                                                    : 0,
                                                            link: '',
                                                        });
                                                    }}
                                                >
                                                    Add new social
                                                </button>
                                            </>
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                <h2 className='text-xl text-gray-900'>Community Task</h2>
                                <FieldArray
                                    name='communityTasks'
                                    render={(arrayHelpers) => {
                                        return (
                                            <>
                                                {values.communityTasks?.map(
                                                    (
                                                        task: any,
                                                        taskIndex: any
                                                    ) => {
                                                        return (
                                                            <div className='mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4'>
                                                                <div>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        UUID
                                                                    </label>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter task uuid'
                                                                        name={`communityTasks.${taskIndex}.uuid`}
                                                                        value={
                                                                            task.uuid ? task.uuid : uuid()
                                                                        }
                                                                        disabled
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`communityTasks.${taskIndex}.uuid`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Is User Link required?
                                                                    </label>
                                                                    <Select
                                                                        options={[
                                                                            {
                                                                                value: true,
                                                                                label: "Yes"
                                                                            },
                                                                            {
                                                                                value: false,
                                                                                label: "No"
                                                                            }
                                                                        ]}

                                                                        value={[
                                                                            {
                                                                                value: true,
                                                                                label: "Yes"
                                                                            },
                                                                            {
                                                                                value: false,
                                                                                label: "No"
                                                                            }
                                                                        ].filter(item => item.value === task.userLinkRequired)[0]}
                                                                        onChange={(
                                                                            selected
                                                                        ) => {
                                                                            if (selected) {
                                                                                setFieldValue(
                                                                                    `communityTasks.${taskIndex}.userLinkRequired`,
                                                                                    selected.value
                                                                                )
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
                                                                    <ErrorMessage
                                                                        name={`communityTasks.${taskIndex}.uuid`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Social Type
                                                                    </label>
                                                                    <Select
                                                                        options={socialTypes}

                                                                        value={socialTypes.find(item => item.value === task.socialType)}
                                                                        onChange={(
                                                                            selected
                                                                        ) => {
                                                                            if (selected) {
                                                                                setFieldValue(
                                                                                    `communityTasks.${taskIndex}.socialType`,
                                                                                    selected.value
                                                                                )
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
                                                                    <ErrorMessage
                                                                        name={`communityTasks.${taskIndex}.socialType`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Description
                                                                    </label>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter task description'
                                                                        name={`communityTasks.${taskIndex}.description`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`communityTasks.${taskIndex}.description`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Url
                                                                    </label>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter task url'
                                                                        name={`communityTasks.${taskIndex}.url`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`communityTasks.${taskIndex}.url`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label
                                                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                        Content
                                                                    </label>
                                                                    <Field
                                                                        className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                        type='text'
                                                                        placeholder='Enter task content'
                                                                        name={`communityTasks.${taskIndex}.content`}
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`communityTasks.${taskIndex}.content`}
                                                                        render={(
                                                                            msg
                                                                        ) => (
                                                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                                <button
                                                    className='btn btn-pink mt-3'
                                                    type='button'
                                                    onClick={() => {
                                                        arrayHelpers.push({
                                                            uuid: uuid(),
                                                            userLinkRequired: false,
                                                            socialType: '',
                                                            description: '',
                                                            url: '',
                                                            content: '',
                                                        });
                                                    }}
                                                >
                                                    Add Task
                                                </button>
                                            </>
                                        );
                                    }}
                                />
                            </div>
                            <div>
                                <div className='mt-3'>
                                    <label
                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Is closed
                                    </label>
                                    <Select
                                        options={[
                                            {
                                                value: true,
                                                label: "YES"
                                            },
                                            {
                                                value: false,
                                                label: "No"
                                            }
                                        ]}

                                        value={[
                                            {
                                                value: true,
                                                label: "YES"
                                            },
                                            {
                                                value: false,
                                                label: "No"
                                            }
                                        ].find(item => item.value === values.isClosed)}
                                        onChange={(
                                            selected
                                        ) => {
                                            if (selected) {
                                                setFieldValue(
                                                    `isClosed`,
                                                    selected.value
                                                )
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

                                    <ErrorMessage
                                        name={`isClosed`}
                                        render={(
                                            msg
                                        ) => (
                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='mt-3'>
                                    <label
                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Is TBA
                                    </label>
                                    <Select
                                        options={[
                                            {
                                                value: true,
                                                label: "YES"
                                            },
                                            {
                                                value: false,
                                                label: "No"
                                            }
                                        ]}

                                        value={[
                                            {
                                                value: true,
                                                label: "YES"
                                            },
                                            {
                                                value: false,
                                                label: "No"
                                            }
                                        ].find(item => item.value === values.isTBA)}
                                        onChange={(
                                            selected
                                        ) => {
                                            if (selected) {
                                                setFieldValue(
                                                    `isTBA`,
                                                    selected.value
                                                )
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

                                    <ErrorMessage
                                        name={`isTBA`}
                                        render={(
                                            msg
                                        ) => (
                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='mt-3'>
                                    <label
                                        className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                        Is Phrase TBA
                                    </label>
                                    <Select
                                        options={[
                                            {
                                                value: true,
                                                label: "YES"
                                            },
                                            {
                                                value: false,
                                                label: "No"
                                            }
                                        ]}

                                        value={[
                                            {
                                                value: true,
                                                label: "YES"
                                            },
                                            {
                                                value: false,
                                                label: "No"
                                            }
                                        ].find(item => item.value === values.isPhraseTBA)}
                                        onChange={(
                                            selected
                                        ) => {
                                            if (selected) {
                                                setFieldValue(
                                                    `isPhraseTBA`,
                                                    selected.value
                                                )
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

                                    <ErrorMessage
                                        name={`isTBA`}
                                        render={(
                                            msg
                                        ) => (
                                            <span className='font-bold text-red-500'>
                                                                                {
                                                                                    msg
                                                                                }
                                                                            </span>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h1 className='text-blue-900 text-2xl text-center'>
                                Details
                            </h1>
                            <FieldArray
                                name='details'
                                render={(arrayHelpers) => {
                                    return (
                                        <>
                                            {values.details?.map(
                                                (detail: any, index: any) => {
                                                    return (
                                                        <>
                                                            <div className='mt-3'>
                                                                <label
                                                                    className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                                    Title
                                                                </label>
                                                                <Field
                                                                    className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                    type='text'
                                                                    placeholder='Enter title of detail'
                                                                    name={`details.${index}.title`}
                                                                />
                                                                <ErrorMessage
                                                                    name={`details.${index}.title`}
                                                                    render={(
                                                                        msg
                                                                    ) => (
                                                                        <span className='font-bold text-red-500'>
                                                                            {
                                                                                msg
                                                                            }
                                                                        </span>
                                                                    )}
                                                                />
                                                            </div>
                                                            <RichTextEditor
                                                                value={
                                                                    values.details
                                                                        ? values
                                                                            .details[
                                                                            index
                                                                            ]
                                                                            .content
                                                                        : ''
                                                                }
                                                                onChange={(
                                                                    content,
                                                                    editor
                                                                ) => {
                                                                    setFieldValue(
                                                                        `details.${index}.content`,
                                                                        content
                                                                    );
                                                                }}
                                                            />
                                                            <div className='mt-3'>
                                                                <button
                                                                    className='btn btn-pink'
                                                                    onClick={() =>
                                                                        arrayHelpers.remove(
                                                                            index
                                                                        )
                                                                    }
                                                                    type='button'
                                                                >
                                                                    <FaTimes/>
                                                                </button>
                                                            </div>
                                                        </>
                                                    );
                                                }
                                            )}
                                            <button
                                                className='btn btn-pink mt-3'
                                                type='button'
                                                onClick={() => {
                                                    arrayHelpers.push({
                                                        title: '',
                                                        content: '',
                                                    });
                                                }}
                                            >
                                                Add Detail
                                            </button>
                                        </>
                                    );
                                }}
                            />
                        </div>
                        <button className='btn btn-pink mt-3' type='submit'>
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default ProjectFrom;
