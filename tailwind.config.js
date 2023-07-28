/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A51A1",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
  important: true,
};
