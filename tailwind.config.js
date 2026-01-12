/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cs: {
          orange: '#de9b35',
          dark: '#1b1b1b',
          darker: '#0f0f0f',
          light: '#e0e0e0',
          accent: '#de9b35',
        }
      }
    },
  },
  plugins: [],
}
