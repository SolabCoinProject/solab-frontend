import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-vertical-timeline-component/style.min.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import '../styles/globals.css';
import('@solana/wallet-adapter-react-ui/styles.css' as any);

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import dynamic from 'next/dynamic';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { net } from '../config/solana';
import { useMemo } from 'react';

const network =
    net === 'devnet'
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Mainnet;

const WalletProvider = dynamic(
    () => import('../components/app/wallet/ClientWalletProvider'),
    { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
    const endpoint = useMemo(() => clusterApiUrl(network), []);
    return (
        <Provider store={store}>
            <Head>
                <title>Solab Finance</title>
                <link rel='icon' href='/logo-sm.svg' />
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=G-DSC6N47KW4`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'DSC6N47KW4', {
              page_path: window.location.pathname,
            });
          `,
                    }}
                />
            </Head>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider>
                    <WalletModalProvider>
                        <Component {...pageProps} />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
            <ToastContainer
                position='top-center'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </Provider>
    );
}

export default MyApp;
