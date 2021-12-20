import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { tierActions } from './tierSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ITier } from './types';
import tierValidationSchema from './validationSchema';
import { FaTimes } from 'react-icons/fa';

const CreateTierModal: React.FC = () => {
    const isOpen = useAppSelector(
        (state) => state.tier.admin.isCreateTierModalOpen
    );
    const dispatch = useAppDispatch();
    const createTierInitialValues: Omit<ITier, '_id'> = {
        thumbnail: '',
        lotteryTickets: 0,
        requiredLabAmount: 0,
        usdcLimit: 0,
        hasGuaranteedAllocation: 'no',
        name: '',
        order: 0,
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 overflow-y-auto bg-blue-300 z-50 bg-opacity-80'
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

                    {/* This element is to trick the browser into centering the modal contents. */}
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
                        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-white-500'>
                            <Dialog.Title
                                as='h3'
                                className='text-lg font-medium leading-6 text-gray-900 flex items-center justify-between'
                            >
                                <span> Create New Tier</span>
                                <button
                                    onClick={() =>
                                        dispatch(
                                            tierActions.closeCreateTierModal()
                                        )
                                    }
                                >
                                    <FaTimes />
                                </button>
                            </Dialog.Title>
                            <Formik
                                enableReinitialize
                                initialValues={createTierInitialValues}
                                onSubmit={(values, { setSubmitting }) => {
                                    const { hasGuaranteedAllocation } = values;
                                    if (hasGuaranteedAllocation === 'yes') {
                                        values.hasGuaranteedAllocation = true;
                                    } else {
                                        values.hasGuaranteedAllocation = false;
                                    }
                                    dispatch(tierActions.createTier(values));
                                }}
                                validationSchema={tierValidationSchema}
                            >
                                {({ values, isSubmitting }) => {
                                    return (
                                        <Form>
                                            <div className='mt-3'>
                                                <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                    Name
                                                </label>
                                                <Field
                                                    className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                    type='text'
                                                    placeholder='Enter tier name'
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
                                                    Thumbnail
                                                </label>
                                                <Field
                                                    className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                    type='text'
                                                    placeholder='Enter thumbnail link'
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
                                                    Lottery Tickets
                                                </label>
                                                <Field
                                                    className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                    type='number'
                                                    placeholder='Enter lottery tickets'
                                                    name='lotteryTickets'
                                                />
                                                <ErrorMessage
                                                    name='lotteryTickets'
                                                    render={(msg) => (
                                                        <span className='font-bold text-red-500'>
                                                            {msg}
                                                        </span>
                                                    )}
                                                />
                                            </div>
                                            <div className='mt-3'>
                                                <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                    Required Lab Amount
                                                </label>
                                                <Field
                                                    className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                    type='number'
                                                    placeholder='Enter lottery tickets'
                                                    name='requiredLabAmount'
                                                />
                                                <ErrorMessage
                                                    name='requiredLabAmount'
                                                    render={(msg) => (
                                                        <span className='font-bold text-red-500'>
                                                            {msg}
                                                        </span>
                                                    )}
                                                />
                                            </div>
                                            <div className='mt-3'>
                                                <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                    USDC Limit Per Slot
                                                </label>
                                                <Field
                                                    className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                    type='number'
                                                    placeholder='Enter lottery tickets'
                                                    name='usdcLimit'
                                                />
                                                <ErrorMessage
                                                    name='usdcLimit'
                                                    render={(msg) => (
                                                        <span className='font-bold text-red-500'>
                                                            {msg}
                                                        </span>
                                                    )}
                                                />
                                            </div>
                                            <div className='mt-3'>
                                                <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                    Order
                                                </label>
                                                <Field
                                                    className='w-full py-2 px-3 mb-2 text-blue-500 text-base rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                                                    type='number'
                                                    placeholder='Enter order of this tier'
                                                    name='order'
                                                />
                                                <ErrorMessage
                                                    name='order'
                                                    render={(msg) => (
                                                        <span className='font-bold text-red-500'>
                                                            {msg}
                                                        </span>
                                                    )}
                                                />
                                            </div>
                                            <div className='mt-3'>
                                                <label className='text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300'>
                                                    Has Guaranteed Allocation
                                                </label>
                                                <div className='flex items-center mb-4'>
                                                    <Field
                                                        type='radio'
                                                        name='hasGuaranteedAllocation'
                                                        value='yes'
                                                    />
                                                    <label className='text-sm font-medium text-gray-900 ml-2 block dark:text-gray-300'>
                                                        Yes
                                                    </label>
                                                </div>
                                                <div className='flex items-center mb-4'>
                                                    <Field
                                                        type='radio'
                                                        name='hasGuaranteedAllocation'
                                                        value='no'
                                                    />
                                                    <label className='text-sm font-medium text-gray-900 ml-2 block dark:text-gray-300'>
                                                        No
                                                    </label>
                                                </div>
                                                <ErrorMessage
                                                    name='hasGuaranteedAllocation'
                                                    render={(msg) => (
                                                        <span className='font-bold text-red-500'>
                                                            {msg}
                                                        </span>
                                                    )}
                                                />
                                            </div>
                                            <button
                                                type='submit'
                                                className='btn btn-pink'
                                            >
                                                {isSubmitting
                                                    ? 'Submitting...'
                                                    : 'Submit'}
                                            </button>
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

export default CreateTierModal;
