"use client";
import { useEffect, useRef } from 'react';

export default function Mapa({ lugares, onMarkerClick }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // 1. Cargamos los estilos y el script de Leaflet manualmente
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    if (!document.getElementById('leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = initMap; // Cuando cargue, iniciamos el mapa
      document.body.appendChild(script);
    } else if (window.L) {
      initMap(); // Si ya estaba cargado, iniciamos directo
    }

    function initMap() {
        if (!mapContainerRef.current || mapInstanceRef.current) return;
        
        // Configuración básica del mapa centrado en SJR
        const map = window.L.map(mapContainerRef.current, {
            zoomControl: false 
        }).setView([20.3888, -100.0000], 14);

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: ''
        }).addTo(map);

        // Agregamos los marcadores de tus lugares
        lugares.forEach(lugar => {
             const marker = window.L.marker(lugar.coordenadas).addTo(map);
             // Al hacer clic en el pin, llamamos a la función que nos pasaste
             marker.on('click', () => onMarkerClick(lugar));
        });

        mapInstanceRef.current = map;
    }
  }, [lugares, onMarkerClick]);

  return <div ref={mapContainerRef} className="w-full h-full z-0" />;
}