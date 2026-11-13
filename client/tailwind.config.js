/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040B13',
          900: '#07111E',
          850: '#0B192C',
          800: '#10223B',
          700: '#1A3353',
          600: '#24456F',
        },
        ivory: {
          50: '#FDFBF7',
          100: '#F7F4EE',
          200: '#EFEAE0',
          300: '#E2DAD0',
          400: '#CFC5B5',
        },
        gold: {
          100: '#F8F4EC',
          200: '#EDE2D0',
          300: '#DFCCAA',
          400: '#D2B785',
          500: '#C5A880',
          600: '#B09062',
          700: '#8E7145',
        },
        emerald: {
          850: '#09291D',
          800: '#0F3E2E',
          700: '#175943',
          600: '#217A5D',
        },
        terracotta: {
          400: '#D87A5E',
          500: '#C86D51',
          600: '#B0583E',
        },
        champagne: {
          100: '#FBF8F1',
          200: '#F4ECE0',
          300: '#EAD7BE',
          400: '#DEC29C',
          500: '#D4AF37',
          600: '#B89328',
          700: '#8E6E18',
        },
        obsidian: {
          950: '#080B10',
          900: '#0D121B',
          850: '#131A26',
          800: '#192231',
        }
      },
      fontFamily: {
        sans: ['"Geist"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        geist: ['"Geist"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        'cinema': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(11, 25, 44, 0.08)',
        'luxury-lg': '0 20px 50px -12px rgba(11, 25, 44, 0.15)',
        'gold-glow': '0 0 25px rgba(197, 168, 128, 0.25)',
        'champagne-glow': '0 0 30px rgba(212, 175, 55, 0.3)',
      }
    },
  },
  plugins: [],
}
