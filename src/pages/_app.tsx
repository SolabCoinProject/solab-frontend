import Head from 'next/head';

import 'react-vertical-timeline-component/style.min.css';

import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Head>
                <title>Solab Finance</title>
                <link rel='icon' href='/logo-sm.svg' />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
