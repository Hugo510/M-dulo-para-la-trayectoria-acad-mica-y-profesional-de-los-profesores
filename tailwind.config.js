/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0c7464',
          light: '#6aa89a',
          lighter: '#a1d5ca',
        },
        secondary: {
          DEFAULT: '#dbaa04',
          light: '#e7cc7a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};