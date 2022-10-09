/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '9xl': ['16rem', '14rem'],
      },
      fontFamily: {
        Concert: 'Concert One, cursive',
        Gugi: 'Gugi, cursive',
        Gaegu: 'Gaegu, cursive',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
