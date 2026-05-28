/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#6366f1',
          cyan: '#06b6d4',
          emerald: '#10b981',
          slate: {
            950: '#0a0e17',
            900: '#0f1626',
            800: '#161e31',
            700: '#1d273f',
            400: '#94a3b8',
            300: '#cbd5e1',
            50: '#f8fafc',
          }
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'floatAvatar 6s ease-in-out infinite',
        'pulse-glow': 'glowPulse 8s infinite alternate',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
