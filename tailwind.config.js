/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto'] },
      colors: {
        brand: {
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
          light: '#7dd3fc'
        }
      }
    },
  },
  plugins: [],
}
