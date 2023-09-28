import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    /* colors: {
      // text-white-300, bg-white-50
      'white': {
        '50': '#ffffff',
        '100': '#efefef',
        '200': '#dcdcdc',
        '300': '#bdbdbd',
        '400': '#989898',
        '500': '#7c7c7c',
        '600': '#656565',
        '700': '#525252',
        '800': '#464646',
        '900': '#3d3d3d',
        '950': '#292929',
      },
      'peach-orange': {
        '50': '#fff5ed',
        '100': '#ffe8d5',
        '200': '#ffc194',
        '300': '#ffaa72',
        '400': '#fd7c3a',
        '500': '#fc5813',
        '600': '#ed3d09',
        '700': '#c42b0a',
        '800': '#9c2310',
        '900': '#7d2011',
        '950': '#440d06',
      },
    }, */
    extend: {},
  },
  plugins: [],
} satisfies Config

