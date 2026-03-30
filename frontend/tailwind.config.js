/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#667eea',
          DEFAULT: '#764ba2',
          dark: '#5a3d81',
        },
        success: '#48bb78',
        'studio-dark': '#1a1a1a',
        'accent-gold': '#c5a67c',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    },
  },
  plugins: [],
}
