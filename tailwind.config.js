/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    container:{
      center: true,
      padding:'1rem'
    },
    extend: {
      fontFamily:{
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
  
       },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
