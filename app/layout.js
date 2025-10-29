import "./globals.css"; 
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


/*
  Metadatos para el <head>
*/
export const metadata = {
  title: "Guía Turística de San Juan del Río",
  description: "Descubre los mejores lugares de SJR.",
  manifest: "/manifest.json", // <-- CONECTA EL MANIFIESTO
};

// CORRECCIÓN 1: Movemos el 'themeColor' aquí para Next.js 15+
export const viewport = {
  themeColor: "#0056b3",
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/*
          Meta tag para asegurar que la app se vea bien en móviles
        */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/*
          Meta tag para Apple (iOS)
        */}
        <meta name="mobile-web-app-capable" content="yes"/>

        
        {/* CORRECCIÓN 2: 'name' (en lugar de 'name_G') */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Guía SJR" />

        {/*
          Iconos para Apple (iOS)
        */}
        {/* CORRECCIÓN 3: 'rel' (en lugar de 'rel_G') */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

