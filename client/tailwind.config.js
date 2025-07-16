/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode based on 'dark' class in HTML
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        perceivePurple: '#3F1470',
        perceiveGold: '#FFA301',
        // You can define more custom colors here if needed
      },
    },
  },
  plugins: [],
}