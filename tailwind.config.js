/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-univers)'],
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out forwards',
        'underline': 'underLine 150ms ease-out',
        'underline-vertical': 'underLineVertical 150ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 }
        },
        underLine: {
          '0%': { backgroundSize: '0 0' },
          '100%': { backgroundSize: '100% 1px' }
        },
        underLineVertical: {
          '0%': { backgroundSize: '0 0' },
          '100%': { backgroundSize: '1px 100%' }
        }
      }
    },
  },
  plugins: [],
}
