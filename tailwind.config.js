/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#F5F5F5",
        "text-primary": "#333333",
        "text-secondary": "#666666",
        "accent-green": "#7ED321",
        "accent-orange": "#F8A531",
      },
      fontFamily: {
        sans: ["San Francisco", "Roboto", "Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
