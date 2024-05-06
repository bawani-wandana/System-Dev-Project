/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/html/utils/withMT");


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
      b1:'#1e22a8',
    },
    fontFamily:{
      'font1': ['Lato'],

    },
    extend: {},
  },
  plugins:[],
});
