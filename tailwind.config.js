/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {

      colors : {

          'first' : '#f0f0f0',
          'second' : '#f2f0f1',
      },
      screens : {'sm' : '576px'},
      borderRadius : { 'primary' : '2rem' }

    },
  },
  plugins: [],
}

