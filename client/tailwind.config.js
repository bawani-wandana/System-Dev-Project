/** @type {import('tailwindcss').Config} */

const { DEFAULT } = require('@material-tailwind/html/theme/base/shadows');
const withMT = require("@material-tailwind/html/utils/withMT");
const { Container } = require('postcss');


module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      c1: '#610c89',
      c2: '#2B3499',
      c3: '#C64D27',
      c4: '#FFEEE8',
      c5: '#FF9209',
      c6: '#090937',
      b1: '#1e22a8',
      b2:'#04043b',
    },
    fontFamily: {
      'font1': ['Lato'],

    },

    extend: {
      
    },
  },
  plugins: [],
});
