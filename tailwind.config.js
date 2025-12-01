/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Anarres custom palette
        primary: {
          DEFAULT: '#262626',
          dark: '#131313',
          light: '#3a3a3a',
        },
        secondary: {
          DEFAULT: '#bf0a26',
          dark: '#8a0719',
          light: '#e81d3d',
        },
        accent: {
          blue: '#1c366c',
          'blue-light': '#2a4d9c',
        },
        surface: {
          DEFAULT: 'rgba(38, 38, 38, 0.8)',
          light: 'rgba(38, 38, 38, 0.5)',
          dark: 'rgba(19, 19, 19, 0.9)',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/img/background.svg')",
      },
      animation: {
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(191, 10, 38, 0.3)',
        'glow-blue': '0 0 20px rgba(28, 54, 108, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(191, 10, 38, 0.1)',
      },
    },
  },
  plugins: [],
}

