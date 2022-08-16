/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        px: "1px",
      },
    },
  },
  plugins: [
    require("@shrutibalasa/tailwind-grid-auto-fit"),
    require("@tailwindcss/line-clamp"),
  ],
};
