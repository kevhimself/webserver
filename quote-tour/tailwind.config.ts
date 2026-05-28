import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#1a2e1e",
          800: "#243828",
          700: "#2d4733",
          600: "#3a5c42",
        },
        timber: {
          900: "#5c3a1e",
          700: "#8b5e3c",
          500: "#c17e3c",
          300: "#dba96e",
          100: "#f5e6d3",
          50:  "#fdf8f3",
        },
        cream: "#f8f4ec",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
