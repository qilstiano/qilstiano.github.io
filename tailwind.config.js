/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        garamond: ['Apple Garamond', 'serif'],
        cloister: ['Cloister Black', 'serif'],
        countdown: ['Countdown Regular', 'sans-serif'],
        helveticaLight: ['Helvetica Neue Light', 'sans-serif'],
        helveticaMedium: ['Helvetica Neue Medium', 'sans-serif'],
        helveticaRoman: ['Helvetica Neue Roman', 'sans-serif'],
        jacquard: ['Jacquard12', 'cursive'],
        lordish: ['Lordish', 'serif'],
        nirvana: ['Nirvana', 'sans-serif'],
        kregas: ['Kregas', 'serif'],
        dirtyline: ['Dirtyline', 'serif'],
        gotha: ['Gotha', 'serif']
      },
    },
  },
  plugins: [],
};
