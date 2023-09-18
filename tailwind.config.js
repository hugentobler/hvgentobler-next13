const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 150ms ease-out forwards',
        'reveal': 'reveal 1ms',
        'underline': 'underLine 150ms ease-out',
        'underline-vertical': 'underLineVertical 150ms ease-out',
      },
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)'
      },
      fontFamily: {
        sans: ['var(--font-univers)'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        reveal: {
          '0%': { opacity: 0 },
          '2%': { opacity: 1 }
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
  plugins: [
    plugin(function({ addVariant }) {
      // this class is applied to html by theme-effect.ts
      // like how dark: gets enabled
      addVariant('system', '.system &')
    }),
    require('@tailwindcss/typography')
  ]
}
