import {Dialog, Transition} from '@headlessui/react';
import {Fragment} from 'react';
import {FaTimes} from 'react-icons/fa';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import ProjectFrom from './ProjectForm';
import {projectActions} from './projectSlice';
import {format} from 'date-fns';

const EditProjectModal: React.FC = () => {
    const isOpen = useAppSelector(
        (state) => state.project.admin.isEditProjectModalOpen
    );
    const dispatch = useAppDispatch();
    const editingProject = useAppSelector(
        (state) => state.project.admin.editingProject
    );
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
                                    Update Project
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        dispatch(
                                            projectActions.closeEditProjectModal()
                                        )
                                    }
                                >
                                    <FaTimes/>
                                </button>
                            </Dialog.Title>
                            {
                                editingProject ? <ProjectFrom
                                    initialValues={{
                                        ...editingProject
                                        , phrases: {
                                            ...editingProject?.phrases,
                                            whitelist: {
                                                ...editingProject?.phrases.whitelist,
                                                startDate: format(new Date(editingProject?.phrases.whitelist.startDate as string), 'yyyy-MM-dd HH:mm:ss'),
                                                endDate: format(new Date(editingProject?.phrases.whitelist.endDate as string), 'yyyy-MM-dd HH:mm:ss'),
                                            },
                                            sale: {
                                                ...editingProject?.phrases.sale,
                                                startDate: format(new Date(editingProject?.phrases.sale.startDate as string), 'yyyy-MM-dd HH:mm:ss'),
                                                endDate: format(new Date(editingProject?.phrases.sale.endDate as string), 'yyyy-MM-dd HH:mm:ss'),
                                            },
                                            distribution: {
                                                ...editingProject?.phrases.distribution,
                                                startDate: format(new Date(editingProject?.phrases.distribution.startDate as string), 'yyyy-MM-dd HH:mm:ss'),
                                            },
                                        }
                                    }}
                                    onSubmit={(values) => {
                                        dispatch(
                                            projectActions.editProject({
                                                id: editingProject._id,
                                                data: values
                                            })
                                        );
                                    }}
                                /> : null
                            }
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default EditProjectModal;
