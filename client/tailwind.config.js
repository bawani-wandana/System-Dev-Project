/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      c1: '#610c89',
      c2: '#2B3499',
      c3:'#C64D27',
      c4: '#FFEEE8',
      c5:'#FF9209',
      c6: '#090937',
      c7: '#'
    },
    fonts:{

    },
    extend: {},
  },
  plugins: [],
});

