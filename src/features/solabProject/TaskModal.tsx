import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { solabProjectActions } from './solabProjectSlice';
import * as Yup from 'yup';
import ReactHtmlParser from 'react-html-parser';

const TaskModal: React.FC = () => {
    const isOpen = useAppSelector(
        (state) => state.solabProject.app.isTaskModalOpen
    );
    const user = useAppSelector((state) => state.user.app.user);
    const openTask = useAppSelector((state) => state.solabProject.app.openTask);

    const dispatch = useAppDispatch();

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 overflow-y-auto bg-solabGray-900 z-50 bg-opacity-80'
                onClose={() => {
                    dispatch(solabProjectActions.closeTaskModal());
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
                        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-solabGray-300'>
                            {openTask && user ? (
                                <>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-solabWhite-500'
                                    >
                                        Social Task
                                    </Dialog.Title>
                                    <div className='mt-2 truncate'>
                                        <p className='text-sm text-solabGray-100'>
                                            {openTask.settings.description}
                                        </p>
                                        {openTask.settings.link ? (
                                            <Link href={openTask.settings.link}>
                                                <a className='text-solabCyan-500'>
                                                    {openTask.settings.link}
                                                </a>
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                        {openTask.settings.content ? (
                                            <div className='text-solabWhite-500 p-2 border border-solabCyan-500 rounded mt-2'>
                                                {ReactHtmlParser(
                                                    openTask.settings.content
                                                )}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>

                                    <div className='mt-4'>
                                        <Formik
                                            enableReinitialize
                                            initialValues={{
                                                userPostUrl: '',
                                            }}
                                            onSubmit={(values) => {
                                                dispatch(
                                                    solabProjectActions.doCommunityTask(
                                                        {
                                                            taskUuid:
                                                                openTask.uuid,
                                                            walletAddress:
                                                                user.walletAddress,
                                                        }
                                                    )
                                                );
                                            }}
                                            validationSchema={Yup.object().shape(
                                                {
                                                    userPostUrl: Yup.string()
                                                        .required(
                                                            'Post URL is required!'
                                                        )
                                                        .url('Invalid URL!'),
                                                }
                                            )}
                                        >
                                            {({ values, isSubmitting }) => {
                                                return (
                                                    <Form>
                                                        <div>
                                                            <label className='text-solabWhite-500'>
                                                                Submit your post
                                                                url
                                                            </label>
                                                            <Field
                                                                type='text'
                                                                name='userPostUrl'
                                                                className='input input-cyan'
                                                            />
                                                            <ErrorMessage
                                                                name='userPostUrl'
                                                                render={(
                                                                    msg
                                                                ) => (
                                                                    <span className='text-xs text-red-500'>
                                                                        {msg}
                                                                    </span>
                                                                )}
                                                            />
                                                        </div>
                                                        <button
                                                            type='submit'
                                                            className='py-3 px-4 bg-solabCyan-500 rounded-lg text-solabBlack-500 mt-2'
                                                        >
                                                            Submit
                                                        </button>
                                                    </Form>
                                                );
                                            }}
                                        </Formik>
                                    </div>
                                </>
                            ) : (
                                'No task selected'
                            )}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TaskModal;
