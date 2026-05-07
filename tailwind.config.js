export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        accent: 'var(--accent-color)',
        light: 'var(--light-color)',
        dark: 'var(--dark-color)',
        text: 'var(--text-color)',
      },
    },
  },
  plugins: [],
};
