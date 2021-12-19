/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');

const withTM = require('next-transpile-modules')([
    '@solana/wallet-adapter-base',
    // Uncomment wallets you want to use
    // "@solana/wallet-adapter-bitpie",
    // "@solana/wallet-adapter-coin98",
    // "@solana/wallet-adapter-ledger",
    // "@solana/wallet-adapter-mathwallet",
    '@solana/wallet-adapter-phantom',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-solflare',
    // "@solana/wallet-adapter-sollet",
    // "@solana/wallet-adapter-solong",
    // "@solana/wallet-adapter-torus",
    '@solana/wallet-adapter-wallets',
    // "@project-serum/sol-wallet-adapter",
    // "@solana/wallet-adapter-ant-design",
]);

const plugins = [
    // add this if you need LESS
    // [withLess, {
    //   lessLoaderOptions: {
    //     /* ... */
    //   },
    // }],
    [
        withTM,
        {
            webpack5: true,
            reactStrictMode: true,
        },
    ],
];

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['solab-content.s3.sa-east-1.amazonaws.com'],
    },
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                ],
            },
        ];
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
            // FIX this
            // Disable minimize to make it work with Candy Machine template
            // minimization brakes Public Key names
            config.optimization.minimize = false;
        }
        return config;
    },
};

module.exports = withPlugins(plugins, nextConfig);
