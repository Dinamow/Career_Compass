/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prime: "#19A7CE",
        second: "#146C94",
        back: "#F6F1F1",
        light: "#AFD3E2",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        desctop: "1440px",
      },
    },
  },
  plugins: [],
};
