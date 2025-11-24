/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

 
    // Asegúrate de que escanee tu carpeta 'app'
    // Esta es la configuración más común para App Router:
    "./app/lugar/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // <--- ASEGURATE QUE ESTO ESTÉ
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
