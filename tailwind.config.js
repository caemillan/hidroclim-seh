/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        senamhi: {
          primary: "#0B6FA4",
          dark: "#064A6E",
        },
      },
    },
  },
  plugins: [],
};
