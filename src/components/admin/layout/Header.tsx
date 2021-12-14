import { AiOutlineAlignLeft } from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../assets/images/logo.svg';
import { useAppDispatch } from '../../../app/hooks';
import { toggleAdminSidebar } from '../../../features/layout/layoutSlice';
import routes from '../../../config/routes';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <nav className='border-b border-blue-light fixed z-30 w-full'>
            <div className='px-3 py-3 lg:px-5 lg:pl-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start'>
                        <button
                            className='lg:hidden mr-2 bg-blue-light text-white-500 cursor-pointer p-2 hover:opacity-80 focus:bg-blue-light focus:ring-2 focus:ring-gray-100 rounded'
                            onClick={() => dispatch(toggleAdminSidebar())}
                        >
                            <AiOutlineAlignLeft />
                        </button>
                        <Link href={routes.admin.dashboard}>
                            <a>
                                <Image src={logo} alt='logo' className='h-6' />
                            </a>
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <Link href='#'>
                            <a className='btn btn-gradient flex items-center'>
                                <GoSignOut />
                                <span className='ml-1'>Logout</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
