/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4a6741', // forest green
          dark: '#3a5331',
          light: '#5a7751'
        },
        secondary: {
          DEFAULT: '#8b4513', // brick red/brown
          dark: '#7b3503',
          light: '#9b5523'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif']
      }
    },
  },
  plugins: [],
}