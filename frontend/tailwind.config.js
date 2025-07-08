/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0fa',   // very light blue
          100: '#b3d1f2',
          200: '#80b3ea',
          500: '#0057b8', // 99acres blue
          600: '#004494',
          700: '#003366',
        },
        accent: {
          50: '#fff8e1',   // very light gold
          100: '#ffecb3',
          200: '#ffd54f',
          500: '#ffb300',  // gold/orange
        },
        background: {
          50: '#ffffff',   // white
          100: '#f5f6fa', // light gray
        },
        neutral: {
          50: '#f5f6fa',   // light gray
          100: '#e0e0e0',
          200: '#bdbdbd',
          500: '#757575',  // gray
          600: '#424242',  // dark gray
          700: '#212121',  // almost black
        },
        text: {
          50: '#212121',   // black
          100: '#424242',  // dark gray
          200: '#757575',  // gray
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 