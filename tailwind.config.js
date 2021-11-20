const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
    screens: {
      'sm': {'max': '767px'},
      'md': {'min': '768px'},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
