/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: '#D4AF37',
                    dark: '#B8941E',
                    light: '#E5C158',
                },
                charcoal: {
                    DEFAULT: '#2C2C2C',
                    dark: '#1A1A1A',
                    light: '#3D3D3D',
                },
                cream: '#F5F5DC',
                'rose-gold': '#B76E79',
                primary: {
                    50: '#fef9ec',
                    100: '#fbf0ca',
                    200: '#f7df91',
                    300: '#f3ca57',
                    400: '#efb52e',
                    500: '#D4AF37',
                    600: '#b88d1e',
                    700: '#98691a',
                    800: '#7d531b',
                    900: '#6a441c',
                },
            },
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                heading: ['Cormorant Garamond', 'serif'],
                body: ['Poppins', 'sans-serif'],
                sans: ['Poppins', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
