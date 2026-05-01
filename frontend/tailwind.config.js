module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kidhealth: {
          primary: '#6366f1',
          secondary: '#ec4899',
          accent: '#f59e0b',
          light: '#ede9fe',
          dark: '#312e81',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
