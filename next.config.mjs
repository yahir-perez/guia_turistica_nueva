// next.config.mjs
/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'; // Importa el plugin

const nextConfig = {
  reactStrictMode: true,
  // Aquí puedes añadir otras configuraciones de Next.js
};

// Configuración del PWA. Envuelve la configuración de Next.js.
const pwaConfig = withPWA({
  dest: 'public', // Directorio donde se generarán los archivos PWA (sw.js, workbox-*.js)
  register: true, // Registra el Service Worker automáticamente
  skipWaiting: true, // Para la actualización más rápida
  // disable: process.env.NODE_ENV === 'development', // Desactivar PWA en desarrollo si quieres
})(nextConfig);

export default pwaConfig;