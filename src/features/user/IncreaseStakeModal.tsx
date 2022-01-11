import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Fragment } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userActions } from './userSlice';
import * as Yup from 'yup';
import Image from 'next/image';
import loaderCyan from '../../assets/images/loader-cyan.svg';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export interface Props {
    onSubmit: (values, { setSubmitting }) => void;
}

const IncreaseStakeModal: React.FC<Props> = ({ onSubmit }) => {
    const isOpen = useAppSelector(
        (state) => state.user.app.isIncreaseStakeModalOpen
    );
    const user = useAppSelector((state) => state.user.app.user);
    const dispatch = useAppDispatch();
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 overflow-x-auto bg-solabGray-900 z-50 bg-opacity-80'
                onClose={() => {
                    dispatch(userActions.closeIncreaseStakeModal());
                }}
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
                        <div className='inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg bg-white-500'>
                            <Dialog.Title
                                as='h3'
                                className='text-xxl font-medium leading-6 text-solabBlack-500 flex items-center justify-between'
                            >
                                <span className='text-center text-xxl'>
                                    Increase Stake
                                </span>
                                <button
                                    type='button'
                                    onClick={() =>
                                        dispatch(
                                            userActions.closeIncreaseStakeModal()
                                        )
                                    }
                                >
                                    <FaTimes className='text-base' />
                                </button>
                            </Dialog.Title>
                            <Formik
                                initialValues={{
                                    solabAmount: 0,
                                }}
                                onSubmit={onSubmit}
                                enableReinitialize={true}
                                validationSchema={Yup.object().shape({
                                    solabAmount: Yup.number()
                                        .required('Required')
                                        .positive(
                                            'Solab amount must bigger than 0'
                                        ),
                                })}
                            >
                                {({
                                    values,
                                    isSubmitting,
                                    errors,
                                    setFieldValue,
                                    submitForm,
                                }) => {
                                    return (
                                        <Form>
                                            <div className='flex items-center justify-between gap-4 flex-wrap mt-6'>
                                                <span className='text-solabGray-100'>
                                                    Amount
                                                </span>
                                                <Field
                                                    name='solabAmount'
                                                    type='number'
                                                    className='input-2 input-cyan flex-grow'
                                                />
                                            </div>
                                            <ErrorMessage
                                                name='solabAmount'
                                                render={(msg) => (
                                                    <span className='text-xs text-red-500'>
                                                        {msg}
                                                    </span>
                                                )}
                                            />
                                            <div className='mt-4'>
                                                {user ? (
                                                    !isSubmitting ? (
                                                        <button
                                                            type='submit'
                                                            className='py-3 font-bold px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 w-full'
                                                            disabled={
                                                                isSubmitting
                                                            }
                                                        >
                                                            Confirm
                                                        </button>
                                                    ) : (
                                                        <div className='mx-auto w-10 h-10 relative'>
                                                            <Image
                                                                src={loaderCyan}
                                                                layout='fill'
                                                            />
                                                        </div>
                                                    )
                                                ) : (
                                                    <WalletMultiButton className='mx-auto' />
                                                )}
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

export default IncreaseStakeModal;
