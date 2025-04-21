/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#e6f0ff',
            100: '#b3d1ff',
            200: '#80b3ff',
            300: '#4d94ff',
            400: '#1a75ff',
            500: '#0057e6', // Main brand blue
            600: '#0046b8',
            700: '#00348a',
            800: '#00235c',
            900: '#00112e',
          },
          secondary: {
            50: '#fff9e6',
            100: '#ffedb3',
            200: '#ffe180',
            300: '#ffd54d',
            400: '#ffc91a',
            500: '#ffbe00', // Secondary yellow
            600: '#cc9800',
            700: '#997200',
            800: '#664c00',
            900: '#332600',
          },
          accent: '#44c8f5', // Light blue accent
          darkBlue: '#002654', // Dark blue for backgrounds
          lightGray: '#f5f7fa', // Light gray backgrounds
        },
        fontFamily: {
          sans: ['var(--font-geist-sans)', 'Arial', 'sans-serif'],
          mono: ['var(--font-geist-mono)', 'monospace'],
        },
        fontSize: {
          '2xs': '0.625rem', // 10px
        },
        screens: {
          'xs': '480px',
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 5s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        },
      },
    },
    plugins: [],
  };