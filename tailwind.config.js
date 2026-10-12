/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: v('canvas'),
        surface: v('surface'),
        'surface-2': v('surface-2'),
        'surface-3': v('surface-3'),
        line: v('line'),
        'line-strong': v('line-strong'),
        ink: v('ink'),
        'ink-2': v('ink-2'),
        'ink-3': v('ink-3'),
        brand: {
          DEFAULT: v('brand'),
          50: v('brand-50'),
          100: v('brand-100'),
          200: v('brand-200'),
          300: v('brand-300'),
          400: v('brand-400'),
          500: v('brand-500'),
          600: v('brand-600'),
          700: v('brand-700'),
          800: v('brand-800'),
          900: v('brand-900'),
          ink: v('brand-ink'),
        },
        good: { DEFAULT: v('good'), soft: v('good-soft'), ink: v('good-ink') },
        warn: { DEFAULT: v('warn'), soft: v('warn-soft'), ink: v('warn-ink') },
        bad: { DEFAULT: v('bad'), soft: v('bad-soft'), ink: v('bad-ink') },
        info: { DEFAULT: v('info'), soft: v('info-soft'), ink: v('info-ink') },
        spotlight: { DEFAULT: v('spotlight'), glow: v('spotlight-glow'), accent: v('spotlight-accent') },
        m0: v('m0'),
        m1: v('m1'),
        m2: v('m2'),
        m3: v('m3'),
        m4: v('m4'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Lexend Variable"', 'Lexend', '"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 1px 3px rgb(15 23 42 / 0.06)',
        pop: '0 10px 30px -10px rgb(15 23 42 / 0.25), 0 4px 10px -4px rgb(15 23 42 / 0.1)',
      },
      keyframes: {
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'slide-up': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'none' } },
        pop: { '0%': { transform: 'scale(0.96)' }, '60%': { transform: 'scale(1.02)' }, '100%': { transform: 'scale(1)' } },
        'slide-in-right': { from: { opacity: 0, transform: 'translateX(28px)' }, to: { opacity: 1, transform: 'none' } },
        'slide-in-left': { from: { opacity: 0, transform: 'translateX(-28px)' }, to: { opacity: 1, transform: 'none' } },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%,60%': { transform: 'translateX(-4px)' },
          '40%,80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 160ms ease-out',
        'slide-up': 'slide-up 200ms ease-out',
        pop: 'pop 260ms ease-out',
        'slide-in-right': 'slide-in-right 260ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        'slide-in-left': 'slide-in-left 260ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        shake: 'shake 320ms ease-in-out',
      },
    },
  },
  plugins: [],
};
