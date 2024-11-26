/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: '80px auto',
      },
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      fadeOut: {
        '0%': { opacity: 1 },
        '100%': { opacity: 0 },
      },
      fadeInUp: {
        '0%': { opacity: 0, transform: 'translateY(200px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      fadeInDown: {
        '0%': { opacity: 0, transform: 'translateY(-20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      pulse: {
        '0%': { opacity: 1 },
        '50%': { opacity: 0.5 },
        '100%': { opacity: 1 },
      },
      resize: {
        '0%': { transform: 'scale(0.95)', opacity: 0.5 },
        '100%': { transform: 'scale(1)', opacity: 1 },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.2s ease-in-out',
      fadeOut: 'fadeOut 0.2s ease-in-out',
      fadeInUp: 'fadeInUp 0.3s ease-in-out',
      fadeInDown: 'fadeInDown 0.3s ease-in-out',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
      resize: 'resize 0.3s ease-in-out',
    },
  },
  plugins: [],
}
