/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: { md: "900px" },
      colors: {
        ink: "#18232f",
        rail: "#12355b",
        sun: "#f6c000",
        soft: "#f2f5f8",
        line: "#dde4ec",
        mut: "#586676",
      },
      fontFamily: {
        fd: ["var(--fd)", "system-ui", "sans-serif"],
        fb: ["var(--fb)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};