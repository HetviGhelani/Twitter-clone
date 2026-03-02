/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        "twitter-blue": "#1DA1F2",
        "twitter-dark": "#15202B",
        "twitter-darker": "#0B0F14",
        "twitter-light": "#F7F9FA",
      },
    },
  },
  plugins: [],
};
