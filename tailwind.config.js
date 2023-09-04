/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1120px",
      },
      colors: {
        primary: "#464646",
        secondary: "#666666",
        bgColor: "#f6f6f6",
        borderColor: "dddddd",
      },
    },
    fontFamily: {
      primary: ["Montserrat", "sans-serif"],
      secondary: ["Lato", "sans-serif"],
    },
  },
  plugins: [],
};
