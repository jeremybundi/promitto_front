export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lufga', 'sans-serif'], 
      },
      screens: {
        xs: '360px', 
        md: '768px', 

      },
    },
  },
  plugins: [],
}
