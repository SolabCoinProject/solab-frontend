import type { WalletProviderProps } from '@solana/wallet-adapter-react';
import { WalletProvider } from '@solana/wallet-adapter-react';

import {
    getPhantomWallet,
    // getLedgerWallet,
    // getMathWallet,
    getSolflareWallet,
    getSolletWallet,
    // getSolongWallet,
    getSlopeWallet,
    getSolletExtensionWallet,
    getSolflareWebWallet,
} from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export function ClientWalletProvider(
    props: Omit<WalletProviderProps, 'wallets'>
): JSX.Element {
    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            getSolletExtensionWallet(),
            getSolletWallet(),
            getSolflareWallet(),
            getSolflareWebWallet(),
            getSlopeWallet(),

            // getTorusWallet({
            //   options: {
            //     // TODO: Get your own tor.us wallet client Id
            //     clientId:
            //       "BOM5Cl7PXgE9Ylq1Z1tqzhpydY0RVr8k90QQ85N7AKI5QGSrr9iDC-3rvmy0K_hF0JfpLMiXoDhta68JwcxS1LQ",
            //   },
            // }),
            // getLedgerWallet(),
            // getSolongWallet(),
            // getMathWallet(),
        ],
        []
    );

    return (
        <WalletProvider wallets={wallets} {...props}>
            <WalletModalProvider {...props} />
        </WalletProvider>
    );
}

export default ClientWalletProvider;
