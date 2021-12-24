const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/features/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: {
                    900: '#000612',
                    500: '#000639',
                    300: '#091125',
                    light: '#0088CC',
                },
                cyan: {
                    500: '#1EE8BB',
                },
                white: {
                    500: '#F5F6FA',
                },
                pink: {
                    500: '#FF50CE',
                },
                yellow: {
                    500: '#F8CB67',
                },
                red: {
                    500: '#FF5661',
                },
                orange: colors.orange,
                blueGray: colors.blueGray,
                solabGray: {
                    50: '#1F2733',
                    100: '#6C738D',
                    300: '#0F1217',
                    900: '#06090E',
                },
                solabBlack: {
                    500: '#0A0C10',
                },
                solabWhite: {
                    500: '#E2E4E9',
                    700: '#F7F8FD',
                },
                solabCyan: {
                    500: '#1EE8BB',
                },
                solabBlue: {
                    500: '#2AABEE',
                },
            },
            fontSize: {
                base: '16px',
                lg: '18px',
                xl: '20px',
                '3xl': '48px',
                '2xl': '32px',
                '4xl': '64px',
                sm: '14px',
                xs: '12px',
                xxs: '10px',
                xxl: '24px',
            },
            width: {
                '3/10': '30%',
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            backgroundColor: ['checked'],
        },
    },
    plugins: ['postcss-import', 'tailwindcss', 'autoprefixer'],
    important: true,
};
