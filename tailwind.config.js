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
            },
            fontSize: {
                base: '18px',
                tiny: '16px',
                xl: '24px',
                '3xl': '48px',
                '2xl': '36px',
                sm: '14px',
                xs: '12px',
                xxs: '10px',
            },
            width: {
                '3/10': '30%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: ['postcss-import', 'tailwindcss', 'autoprefixer'],
    important: true,
};
