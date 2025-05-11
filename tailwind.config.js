/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'faroese': {
          DEFAULT: '#64a7f0',
          hover: '#4b8ed7',
          active: '#3275be',
        },
        'foreign': {
          DEFAULT: '#e9c9ed',
          hover: '#d0b0d4',
          active: '#b797bb',
        },
        'tk-buss': {
          DEFAULT: '#90EE90',
          hover: '#5ab55a',
        },
        'kommunalar': {
          DEFAULT: '#FFE4B5',
          hover: '#d4ac6d',
        },
        'kunning-tk': {
          DEFAULT: '#B5E6D8',
          hover: '#7fb3a3',
        },
        'kunning-uttanfyri': {
          DEFAULT: '#E6D8E6',
          hover: '#b396b3',
        },
        'tiltok': {
          DEFAULT: '#B5D8E6',
          hover: '#7fa7b3',
        },
        'annad': {
          DEFAULT: '#FFF0DB',
          hover: '#d4b889',
        },
        'tax-free': {
          DEFAULT: '#eaf6f5',
          hover: '#b3d4d1',
        },
        'ssl': {
          DEFAULT: '#FFD8CC',
          hover: '#d4a494',
        },
        'enda': {
          DEFAULT: '#E6B5D8',
          hover: '#b37f9e',
        },
        'foreign-enda': {
          DEFAULT: '#FF3366',
          hover: '#cc294f',
        },
      },
    },
  },
  plugins: [],
} 