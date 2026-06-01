/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        // Los colores del tema activo se inyectan via CSS custom properties
        theme: {
          bg:       'rgb(var(--theme-bg) / <alpha-value>)',
          surface:  'rgb(var(--theme-surface) / <alpha-value>)',
          border:   'rgb(var(--theme-border) / <alpha-value>)',
          text:     'rgb(var(--theme-text) / <alpha-value>)',
          muted:    'rgb(var(--theme-muted) / <alpha-value>)',
          accent:   'rgb(var(--theme-accent) / <alpha-value>)',
          accent2:  'rgb(var(--theme-accent2) / <alpha-value>)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
