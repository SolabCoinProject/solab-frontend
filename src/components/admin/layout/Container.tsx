import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Header from './Header';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import routes from '../../../config/routes';
import { userActions } from '../../../features/user/userSlice';

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
    return (
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
    );
};

export default Container;
