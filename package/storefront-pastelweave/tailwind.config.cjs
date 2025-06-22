const path = require('path');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../react-cart/src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        pastelweave: {
          '50': '#f9f5f2',
          '100': '#f0e6e1',
          '200': '#e3cfc4',
          '300': '#d6b8a7',
          '400': '#c49a8a',
          '500': '#b27c6d',
          '600': '#a06e5f',
          '700': '#8e604f',
          '800': '#7c5240',
          '900': '#6a4431',
        }
      }
    },
  },
  plugins: [],
};
