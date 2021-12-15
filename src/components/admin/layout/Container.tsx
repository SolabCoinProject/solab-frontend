import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Header from './Header';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import routes from '../../../config/routes';
import { userActions } from '../../../features/user/userSlice';
import Image from 'next/image';
import loader from '../../../assets/images/loader-pink.svg';

const Container: React.FC = ({ children }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(
        (state) => state.user.admin.authenticated
    );
    useEffect(() => {
        dispatch(userActions.getCurrentStaff());
    }, []);
    useEffect(() => {
        document.body.classList.add('container-admin');
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || !isAuthenticated) {
            router.push(routes.admin.login);
        }
    });
    const isSidebarOpen = useAppSelector(
        (state) => state.layout.admin.isSidebarOpen
    );
    const isFetchingStaff = useAppSelector(
        (state) => state.user.admin.isFetchingStaff
    );
    return (
        <>
            <div className='container-admin'>
                <Header />
                <div className='flex pt-16'>
                    <Sidebar />
                    <div
                        className={`bg-gray-900 opacity-50 fixed inset-0 z-10 ${
                            isSidebarOpen ? '' : 'hidden'
                        }`}
                    ></div>
                    <div className='h-full w-full relative lg:ml-64'>
                        <main className='z-0 pt-5 bg-blue-300'>{children}</main>
                    </div>
                </div>
            </div>
            <div
                className={`absolute w-full h-full z-50 bg-gray-50 top-0 left-0 bg-opacity-80 ${
                    isFetchingStaff ? 'block' : 'hidden'
                }`}
            >
                <div className='h-full flex items-center justify-center'>
                    <Image src={loader} alt='loader m-auto' />
                </div>
            </div>
        </>
    );
};

export default Container;
