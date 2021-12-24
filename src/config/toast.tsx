import { AiFillCheckCircle } from 'react-icons/ai';

const toastConfigs = {
    success: {
        className: 'bg-solabGray-300 text-green-500',
        progressClassName: 'bg-green-500',
        icon: <AiFillCheckCircle className='text-green-500' />,
    },
    error: {
        className: 'bg-solabGray-300',
        progressClassName: 'bg-red-500',
        icon: <AiFillCheckCircle className='text-red-500' />,
    },
};

export default toastConfigs;
