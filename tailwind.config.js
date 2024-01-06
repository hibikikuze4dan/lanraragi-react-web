/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        screen: "100svw",
      },
    },
  },
  important: true,
  plugins: [],
};
