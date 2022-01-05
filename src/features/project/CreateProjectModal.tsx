import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {IProject} from './types';
import {format} from 'date-fns';
import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {projectActions} from './projectSlice';
import {FaTimes} from 'react-icons/fa';
import ProjectFrom from './ProjectForm';

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
        pubKey: '',
        token: {
            thumbnail: '',
            symbol: '',
            category: '',
            decimals: 0,
        },
        idoPrice: 0,
        idoSlots: 0,
        phrases: {
            preparation: {
                title: 'UPCOMING',
                description:
                    'This project is in preparation phase. Stay tuned.',
            },
            whitelist: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                endDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'WHITELIST REGISTRATION',
                description: 'You can now whitelist yourself for the lottery.',
            },
            sale: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                endDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'SALE',
                description: 'Winners can participate in the token sale.',
            },
            distribution: {
                startDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                title: 'DISTRIBUTION',
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
        isClosed: false,
        isTBA: false,
        isPhraseTBA: false,
        raiseAmount: 0,
        media: []
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-x-auto bg-blue-300 z-50 bg-opacity-80"
                onClose={() => {
                }}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0"/>
                    </Transition.Child>
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className="inline-block w-full max-w-full p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-white-500">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 flex items-center justify-between"
                            >
                                <span className="text-center text-2xl">
                                    Create New Project
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            projectActions.closeCreateProjectModal()
                                        )
                                    }
                                >
                                    <FaTimes/>
                                </button>
                            </Dialog.Title>
                            <ProjectFrom
                                initialValues={createProjectInitialValues}
                                onSubmit={(values) => {
                                    dispatch(
                                        projectActions.createProject(values)
                                    );
                                }}
                            />
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CreateProjectModal;
