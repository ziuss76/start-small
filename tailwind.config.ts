import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        breath: {
          '0%': { transform: 'scale(0.4)' },
          '40%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.4)' },
        },
      },
      animation: {
        'breath-slow': 'breath 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
