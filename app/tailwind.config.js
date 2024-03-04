/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        primary: "#0072CE",
        secondary: "#75E6DA",
        tertiary: "#D4F1F4",
        "primary-hover": "#1ba4e3",
        "secondary-hover": "#89cf4e",
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
