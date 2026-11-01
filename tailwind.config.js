/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0B10',
          card: '#12141F',
          border: '#1E2235',
          hover: '#181B2B'
        },
        brand: {
          magenta: '#8A2387',
          coral: '#FF416C',
          orange: '#FF4B2B',
          amber: '#F59E0B'
        },
        material: {
          silk: '#9333EA',
          resin: '#EF4444',
          ceramic: '#F59E0B'
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #8A2387 0%, #FF416C 50%, #FF4B2B 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(30, 34, 53, 0.6) 0%, rgba(18, 20, 31, 0.8) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
