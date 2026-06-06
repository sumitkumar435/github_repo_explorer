/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          dark: '#030712',
          card: '#0F172A',
        },
      },
      maxWidth: {
        app: '1100px',
      },
    },
  },
  plugins: [],
};
