import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch } from '../../../app/hooks';
import { userActions } from '../../../features/user/userSlice';

const Container: React.FC = ({ children }) => {
    const { publicKey } = useWallet();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (publicKey) {
            dispatch(
                userActions.userWalletConnected({
                    walletAddress: publicKey.toBase58(),
                })
            );
        } else {
            dispatch(userActions.userWalletDisconnected());
        }
    }, [publicKey]);
    return (
        <div className='container-app'>
            <Header />
            {children}
            <Footer />
        </div>
    );
};
export default Container;
