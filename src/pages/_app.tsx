import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-vertical-timeline-component/style.min.css';

import('@solana/wallet-adapter-react-ui/styles.css' as any);

import '../styles/globals.css';

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
import { useMemo } from 'react';

const network = WalletAdapterNetwork.Devnet;

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
            </Head>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider>
                    <Component {...pageProps} />
                </WalletProvider>
            </ConnectionProvider>
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Provider>
    );
}

export default MyApp;
