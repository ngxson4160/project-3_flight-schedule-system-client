/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0871E1' },
        secondary: '#E6F1FC',
        third: '#CEE3F9',
        white: '#FFFFFF',
        danger: '#FE4B28',
        'danger-second': '#FFEDE9',
        warning: '#fe4b2833',
        gray: '#A3A8AD', // for text
        black: '#333333',
        dark_gray: '#d8d8db',
        'gray-600': '#7f7d7d73',
        'gray-upload': '#33313173',
        'black-800': '#333333cc',
        'color-tag': '#E6F1FC',
        'color-border': '#DADCDE',
        'color-bg': '#F8F8F8',
        'color-message': '#F1F2F3',
        green: '#13A119',
        'gray-400': '#D6D6D6',
        'heading-color': '#0871e140',
        'gray-secondary': '#F1F2F3', // for background
        'gray-third': '#DADCDE', // for border
        'gray-text': '#A3A8AD', // for non-validate
        'gray-700': '#F1F2F3',
        'color-cover': '#c9cccf99',
        'light-gray': '#ffffff99',
        'option-gray': '#f5f7fa',
        pink: '#fe052833',
        'gray-linear': '#CEE3F9',
        'black-bold': '#000000',
        'gray-background': '#D9D9D9',
        'gray-fourth': '#f5f5f5',
        fourth: '#0871e199',
        'blue-secondary': '#85B1E0',
        'gray-fifth': '#33333399',
        'gray-sixth': '#FBFBFB',
        'dark-grey': 'rgba(51, 51, 51, 0.80)',
        'gray-brown': 'rgba(0,0,0,0.45)',
        'gray-disabled': '#C8CBCE',
        'gray-seventh': '#858585',
        'gray-eighth': '#999',
      },
      boxShadow: {
        base: '0px 0px 10px rgba(0, 0, 0, 0.15)',
        'light-box': '0px 0px 20px rgba(0, 0, 0, 0.1)',
      },
    },
    screens: {
      mobile: { max: '480px' },
      // => @media (max-width: 480px) { ... }

      pc: '481px',
      // => @media (min-width: 481px) { ... }
    },
  },
  plugins: [require('tailwindcss/nesting')],
};
