// components/PWAServiceWorkerRegister.js
"use client";

import { useEffect } from "react";

const PWAServiceWorkerRegister = () => {
  useEffect(() => {
    // Solo registrar en el cliente, en producción, y si el navegador lo soporta
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      // El Service Worker generado por next-pwa se llama 'sw.js' por defecto
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("Service Worker registrado con éxito: ", registration);
        })
        .catch((err) => {
          console.error("Fallo el registro del Service Worker: ", err);
        });
    }
  }, []);

  return null; // Componente sin renderizado visible
};

export default PWAServiceWorkerRegister;