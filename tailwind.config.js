/* eslint-env node */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF914F",
        black: "#454545",
        "gray-secondary": "#999999",
        background: "#FAF1F2",
      },
      boxShadow: {
        default: "0 7px 30px rgba(0, 0, 0, 0.1)",
        "default-sm": "0 2px 15px rgba(0, 0, 0, 0.1)",
        "custom-primary": "0 15px 30px rgba(255, 145, 79, 0.5)",
        "custom-primary-sm": "0 2px 10px rgba(255, 145, 79, 0.5)",
      },
    },
  },
  plugins: [],
};
