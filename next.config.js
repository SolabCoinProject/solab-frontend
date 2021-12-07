/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
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
};
