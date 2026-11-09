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
        olive: {
          50: '#f5f7f0',
          100: '#e8edd9',
          200: '#d1dcaf',
          300: '#b4c77f',
          400: '#97b154',
          500: '#70a83b', // emerald/olive neon
          600: '#6B8E23', // refined primary olive green
          700: '#556B2F', // deep olive
          800: '#435425',
          900: '#384620',
          950: '#1b230d',
          glow: 'rgba(107, 142, 35, 0.35)',
        },
        cyber: {
          olive: '#6B8E23',
          darkOlive: '#556B2F',
          neonOlive: '#70A83B',
          glow: 'rgba(107, 142, 35, 0.3)',
        },
        obsidian: {
          950: '#000000',
          900: '#050505',
          850: '#0a0a0a',
          800: '#111113',
          750: '#18181b',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        heading: ['Orbitron', 'Syne', 'Space Grotesk', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'olive-glow': '0 0 30px -5px rgba(107, 142, 35, 0.4), 0 0 15px -2px rgba(112, 168, 59, 0.25)',
        'olive-deep': '0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(85, 107, 47, 0.35)',
        'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
