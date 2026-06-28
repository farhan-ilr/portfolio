/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:        '#000000',
        secondary:      '#0c0c0c',
        card:           '#111111',
        'card-2':       '#171717',
        border:         '#262626',
        accent:         '#e11d48',
        'accent-light': '#fb7185',
        'accent-2':     '#f43f5e',
        muted:          '#71717a',
        text:           '#fafafa',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow':   'spin 8s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out 1s infinite',
        'glow-pulse':  'glowPulse 3s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'border-spin': 'borderSpin 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) scale(1)' },
          '50%':     { transform: 'translateY(-24px) scale(1.03)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':     { opacity: '1',   transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        borderSpin: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'glow':    '0 0 40px rgba(225,29,72,0.30)',
        'glow-sm': '0 0 20px rgba(225,29,72,0.18)',
        'glow-lg': '0 0 80px rgba(225,29,72,0.35)',
        'glow-2':  '0 0 40px rgba(244,63,94,0.22)',
      },
    },
  },
  plugins: [],
}
