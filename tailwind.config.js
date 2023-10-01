/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#FFC107',
        sec: '#FFE28D',
        backg: '#dddddd',
        backgDark: '#656565',
        tx: '#0F172A',
        txDark: '#ffffff',
      }
    },
    container: {}
  },
  plugins: [],
}
