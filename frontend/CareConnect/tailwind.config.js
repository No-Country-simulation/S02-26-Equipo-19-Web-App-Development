/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // we'll toggle the `dark` class on <html>
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // background palettes (use CSS variables defined in index.css)
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-tertiary': 'var(--color-bg-tertiary)',

        // text palettes
        'f-primary': 'var(--color-f-primary)',
        'f-secondary': 'var(--color-f-secondary)',

        // page specific
        'page-family': 'var(--color-page-family)',
        'page-family-hover': 'var(--color-page-family-hover)',
        'page-caregivers': 'var(--color-page-caregivers)',
        'page-caregivers-hover': 'var(--color-page-caregivers-hover)',
        'page-login': 'var(--color-page-login)',
        'page-admin': 'var(--color-page-admin)',
        'page-reports': 'var(--color-page-reports)',

        // borders/alerts
        border: 'var(--color-border)',
        alert: 'var(--color-alert)',
        'main-alert': 'var(--color-main-alert)',
        rejected: 'var(--color-rejected)',
      },
    },
  },
  plugins: [],
};
