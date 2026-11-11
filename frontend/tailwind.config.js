/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gehuRed: '#990000',
        gehuGold: '#D4AF37'
      }
    },
  },
  plugins: [],
}
