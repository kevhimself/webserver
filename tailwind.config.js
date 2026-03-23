/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#141210',
        surface: '#1E1B17',
        card: '#272319',
        green: '#7AAD66',
        amber: '#C4882D',
        red: '#C0604A',
        text: '#F0E8D8',
        muted: '#6E6660',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
