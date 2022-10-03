/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '9xl': ['15rem', '15rem'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
