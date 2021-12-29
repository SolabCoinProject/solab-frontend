import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { imagePreviewActions } from '../features/imagePreview/imagePreviewSlice';

const ImagePreview: React.FC = () => {
    const isOpen = useAppSelector((state) => state.imagePreview.isOpen);
    const url = useAppSelector((state) => state.imagePreview.url);

    const dispatch = useAppDispatch();

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='fixed inset-0 overflow-x-auto bg-blue-300 z-50 bg-opacity-80'
                onClose={() => {
                    dispatch(imagePreviewActions.closeImagePreview());
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
                        <div className='inline-block w-4/5 p-6 my-8 align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-white-500 text-center'>
                            <img src={url} className='w-full h-full' />
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ImagePreview;
