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
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(11, 25, 44, 0.08)',
        'luxury-lg': '0 20px 50px -12px rgba(11, 25, 44, 0.15)',
        'gold-glow': '0 0 25px rgba(197, 168, 128, 0.25)',
      }
    },
  },
  plugins: [],
}
