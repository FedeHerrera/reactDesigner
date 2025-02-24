/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0C10",  
        border: "#1F2833",      
        text: "#C5C6C7",      
        primary: "#66FCF1",    
        primary_hover: "#45A29E",      
      },
      fontFamily: {
        techno: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};
