import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IProject } from './types';
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { projectActions } from './projectSlice';
import { FaTimes } from 'react-icons/fa';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import DatetimePicker from '../../components/DatetimePicker';

const CreateProjectModal: React.FC = () => {
    const isOpen = useAppSelector(
        (state) => state.project.admin.isCreateProjectModalOpen
    );
    const dispatch = useAppDispatch();
    const createProjectInitialValues: Omit<IProject, '_id'> = {
        name: '',
        slug: '',
        description: '',
        thumbnail: '',
        token: {
            thumbnail: '',
            symbol: '',
            category: '',
        },
        idoPrice: 0,
        idoSlots: 0,
        phrases: {
            preparation: {
                title: 'Preparation',
                description:
                    'This project is in preparation phase. Stay tuned.',
            },
            whitelist: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                endDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'Whitelist',
                description: 'You can now whitelist yourself for the lottery.',
            },
            lottery: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                endDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'Lottery',
                description: 'See if you have any winning lottery tickets.',
            },
            sale: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                endDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'Sale',
                description: 'Winners can participate in the token sale.',
            },
            distribution: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'Distribution',
                description: 'The tokens get distributed to Sale participants.',
            },
        },
        launchType: {
            name: '',
            paymentAmountAtDistribution: 0,
            tokenPaymentInterval: 0,
            tokenPaymentPercent: 0,
            tokenPaymentAllDate: '',
        },
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 overflow-visible bg-blue-300 z-50 bg-opacity-80'
                onClose={() => {}}
            >
                <div className='min-h-screen px-4 text-center'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0' />
                    </Transition.Child>
                    <span
                        className='inline-block h-screen align-middle'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <div className='inline-block w-full max-w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-white-500'>
                            <Dialog.Title
                                as='h3'
                                className='text-lg font-medium leading-6 text-gray-900 flex items-center justify-between'
                            >
                                <span className='text-center text-3xl'>
                                    Create New Project
                                </span>
                                <button
                                    onClick={() =>
                                        dispatch(
                                            projectActions.closeCreateProjectModal()
                                        )
                                    }
                                >
                                    <FaTimes />
                                </button>
                            </Dialog.Title>
                            <Formik
                                enableReinitialize
                                initialValues={createProjectInitialValues}
                                onSubmit={(values, { setSubmitting }) => {
                                    console.log(values);
                                    // const { hasGuaranteedAllocation } = values;
                                    // if (hasGuaranteedAllocation === 'yes') {
                                    //     values.hasGuaranteedAllocation = true;
                                    // } else {
                                    //     values.hasGuaranteedAllocation = false;
                                    // }
                                    // dispatch(tierActions.createTier(values));
                                }}
                                // validationSchema={tierValidationSchema}
                            >
                                {({ values, isSubmitting }) => {
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
                                                        <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                            Token additional
                                                            Information
                                                        </label>
                                                        <FieldArray
                                                            name='token.others'
                                                            render={(
                                                                arrayHelpers
                                                            ) => (
                                                                <div>
                                                                    <div className='grid grid-cols-5 gap-1'>
                                                                        {values.token.others?.map(
                                                                            (
                                                                                other,
                                                                                index
                                                                            ) => (
                                                                                <>
                                                                                    <div className='col-span-2'>
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
                                                                                    <div className='col-span-2'>
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
                                                                                        >
                                                                                            Remove
                                                                                        </button>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <button
                                                                        className='btn btn-pink'
                                                                        onClick={() =>
                                                                            arrayHelpers.push(
                                                                                {
                                                                                    label: '',
                                                                                    value: '',
                                                                                }
                                                                            )
                                                                        }
                                                                    >
                                                                        Add more
                                                                        information
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
                                                </div>
                                            </div>
                                            <div className='overflow-x-auto'>
                                                <h1 className='text-blue-900 text-2xl text-center'>
                                                    Phrases configuration
                                                </h1>
                                                <div className='align-middle inline-block min-w-full'>
                                                    <div className='shadow overflow-visible rounded-lg bg-blue-light'>
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
                                                                        Lottery
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
                                                                        Start
                                                                        Date
                                                                    </td>
                                                                    <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'></td>
                                                                    <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                        <DatetimePicker
                                                                            value={
                                                                                values
                                                                                    .phrases
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
                                                                                console.log(
                                                                                    value
                                                                                );
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                        <Field
                                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                            type='text'
                                                                            placeholder='Enter phrases title'
                                                                            name='phrases.preparation.title'
                                                                        />
                                                                    </td>
                                                                    <td className='p-4 whitespace-nowrap text-base font-medium text-white-500'>
                                                                        <Field
                                                                            className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                                            type='text'
                                                                            placeholder='Enter phrases description'
                                                                            name='phrases.preparation.description'
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CreateProjectModal;
