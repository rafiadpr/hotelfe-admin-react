/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#64CCC5",
      },
      backgroundImage: {
        "bg-container": "url('/images/bg-event.png')",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};