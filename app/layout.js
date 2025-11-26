// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import PWAServiceWorkerRegister from "../components/PWAServiceWorkerRegister"; // Importamos el componente de registro

const inter = Inter({ subsets: ["latin"] });

/*
  Metadatos para el <head>
*/
export const metadata = {
  title: "Guía Turística de San Juan del Río",
  description: "Descubre los mejores lugares de SJR.",
  // Propiedad 'manifest' para conectar el manifest.json
  manifest: "/manifest.json", 
};

// Propiedad 'viewport' para la configuración del móvil y theme-color
export const viewport = {
  themeColor: "#0ea5e9", // Usamos el color de tu manifest
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Meta tags para iOS */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Guía SJR" />

        {/* Ícono de Apple (la ruta debe coincidir con el tamaño que tienes) */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className={inter.className}>
        {/* REGISTRO DEL SERVICE WORKER */}
        <PWAServiceWorkerRegister /> 
        {children}
      </body>
    </html>
  );
}