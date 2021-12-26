import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch } from '../../../app/hooks';
import { userActions } from '../../../features/user/userSlice';
import { useRouter } from 'next/router';

import { refSecret } from '../../../config/app';

const Container: React.FC = ({ children }) => {
    const { publicKey } = useWallet();
    const dispatch = useAppDispatch();
    const router = useRouter();
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
    useEffect(() => {
        try {
            const { query } = router;
            if (query.ref) {
                const storedRefs = JSON.parse(
                    localStorage.getItem('storeRefs') ?? JSON.stringify([])
                );
                const ref = JSON.parse(query.ref as string);
                const existedProjectRefIndex = storedRefs.findIndex(
                    (existedRef) => existedRef.p === ref.p
                );

                if (existedProjectRefIndex === -1) {
                    storedRefs.push(ref);
                    localStorage.setItem(
                        'storeRefs',
                        JSON.stringify(storedRefs)
                    );
                } else {
                    storedRefs[existedProjectRefIndex]['u'] = ref.u;
                    localStorage.setItem(
                        'storeRefs',
                        JSON.stringify(storedRefs)
                    );
                }
            }
        } catch (err) {
            localStorage.removeItem('storeRefs');
        }
    }, []);
    return (
        <div className='container-app'>
            <Header />
            {children}
            <Footer />
        </div>
    );
};
export default Container;
