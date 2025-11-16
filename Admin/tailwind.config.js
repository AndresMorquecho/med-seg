/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B7D534',
        'primary-dark': '#8FB12B',
        'primary-light': '#E6F3C2',
        secondary: '#F2C84B',
        'secondary-dark': '#D4A91F',
        'secondary-light': '#FDF2C2',
        surface: '#F7FBEF',
      },
    },
  },
  plugins: [],
}

