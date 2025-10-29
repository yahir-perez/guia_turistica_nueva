"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";

// Arreglo del ícono de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Mapa({ lugares, lugarSeleccionado }) {
  const markerRefs = useRef({});
  const mapRef = useRef(null);

  useEffect(() => {
    if (lugarSeleccionado) {
      const marker = markerRefs.current[lugarSeleccionado.id];
      const map = mapRef.current;

      if (marker && map) {
        map.flyTo(lugarSeleccionado.coordenadas, 15);

        // Retrasamos ligeramente la apertura del popup para dar tiempo a la animación
        setTimeout(() => {
          marker.openPopup();
        }, 300); // 300ms de retraso
      }
    }
  }, [lugarSeleccionado]);

  return (
    <MapContainer
      center={[20.3883, -100.0000]}
      zoom={14}
      className="h-full w-full"
      // Usamos 'ref' para obtener la instancia del mapa
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {lugares.map((lugar) => (
        <Marker
          key={lugar.id}
          position={lugar.coordenadas}
          ref={(el) => (markerRefs.current[lugar.id] = el)}
        >
          <Popup>
            <strong>{lugar.nombre}</strong> <br />
            {lugar.descripcion}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

