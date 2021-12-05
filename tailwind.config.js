module.exports = {
    purge: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: {
                    900: '#000612',
                    500: '#000639',
                    300: '#091125',
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
            },
            fontSize: {
                base: '18px',
                tiny: '16px',
                xl: '24px',
                '3xl': '48px',
                '2xl': '36px',
                sm: '14px',
                xs: '12px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: ['postcss-import', 'tailwindcss', 'autoprefixer'],
};
