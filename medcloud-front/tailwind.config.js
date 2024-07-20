/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          550: "#14a8c2",
        },
        zinc: {
          350: "#c5c5c5",
        },
      },
    },
  },
  plugins: [],
};
