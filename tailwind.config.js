/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary: warm slate — organic, grounded, not corporate blue
        primary: {
          50:  '#f8f7f4',
          100: '#efede8',
          200: '#dedad0',
          300: '#c8c2b4',
          400: '#aaa390',
          500: '#8c8470',
          600: '#726a57',
          700: '#5c5545',
          800: '#4a4437',
          900: '#3d3a2f',
        },
        // Secondary: deep forest green — earthy, not neon
        secondary: {
          50:  '#f2f7f4',
          100: '#e0ede6',
          200: '#c3dbd0',
          300: '#9bc2b2',
          400: '#6da490',
          500: '#4d8870',
          600: '#3a6e59',
          700: '#305849',
          800: '#29483c',
          900: '#223c32',
        },
        // Accent: warm amber-sand — organic highlight, replaces neon emerald
        accent: {
          50:  '#faf8f2',
          100: '#f4eedd',
          200: '#e8d9b5',
          300: '#d9bf86',
          400: '#c9a25a',
          500: '#b8883a',
          600: '#9e6f2e',
          700: '#815828',
          800: '#694827',
          900: '#573c24',
        },
        // Dark surfaces: warm-tinted dark (not cold blue-gray)
        dark: {
          50:  '#f7f6f4',
          100: '#eeece8',
          200: '#dbd8d0',
          300: '#c0bcb1',
          400: '#a09990',
          500: '#857e74',
          600: '#6b655d',
          700: '#57524c',
          800: '#3a362f',   // card surface
          900: '#242018',   // page background
        },
        // Stone: neutral text and border layer
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in':        'fadeIn 0.5s ease-in-out',
        'slide-up':       'slideUp 0.5s ease-out',
        'slide-down':     'slideDown 0.5s ease-out',
        'slide-left':     'slideLeft 0.5s ease-out',
        'slide-right':    'slideRight 0.5s ease-out',
        'scale-in':       'scaleIn 0.3s ease-out',
        'bounce-in':      'bounceIn 0.6s ease-out',
        'float':          'float 6s ease-in-out infinite',
        'gradient':       'gradient 15s ease infinite',
        'spin-slow':      'spin 8s linear infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:      { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideDown:    { '0%': { transform: 'translateY(-20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        slideLeft:    { '0%': { transform: 'translateX(20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideRight:   { '0%': { transform: 'translateX(-20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        slideInRight: { '0%': { transform: 'translateX(100%)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        scaleIn:      { '0%': { transform: 'scale(0.9)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        bounceIn: {
          '0%':   { transform: 'scale(0.3)', opacity: '0' },
          '50%':  { transform: 'scale(1.05)' },
          '70%':  { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%':      { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
      backdropBlur: { xs: '2px' },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}