import Image from "next/image";
import { ArrowRightIcon } from '@heroicons/react/24/solid'; // Importamos un ícono

export default function TarjetaLugar({
  lugar,
  onTarjetaClick,
  onVerDetallesClick, // 1. Nueva prop para el botón "Ver detalles"
  estaSeleccionada,
  esFavorito,
  onToggleFavorito,
}) {
  
  if (!lugar) return null; 

  const { nombre, descripcion, imagenUrl, id } = lugar;

  const handleFavoritoClick = (e) => {
    e.stopPropagation(); 
    onToggleFavorito(id); 
  };

  // 2. Nueva función para el botón "Ver detalles"
  const handleDetallesClick = (e) => {
    e.stopPropagation(); // Evita que se active el clic de la tarjeta
    onVerDetallesClick(id); // Llama a la nueva función de navegación
  };

  const baseClasses =
    "relative bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 transform";
  
  const selectedClasses = estaSeleccionada
    ? "border-blue-500 ring-2 ring-blue-500 shadow-lg scale-[1.02]"
    : "hover:shadow-md hover:bg-gray-50";

  return (
    // 3. El clic en el div principal AHORA SÓLO SELECCIONA EN EL MAPA
    <div
      className={`${baseClasses} ${selectedClasses}`}
      onClick={onTarjetaClick} // Esta es la función de seleccionar
    >
      {/* Botón de Favorito (El corazón) */}
      <button
        onClick={handleFavoritoClick}
        className="absolute top-2 right-2 z-10 p-1.5 bg-white/70 rounded-full text-xl transition-transform hover:scale-110 backdrop-blur-sm"
        aria-label="Marcar como favorito"
      >
        {esFavorito ? "❤️" : "🤍"}
      </button>

      {/* Contenedor de la Imagen */}
      <div className="flex-shrink-0">
        <Image
          className="h-28 w-28 object-cover"
          src={imagenUrl}
          alt={`Imagen de ${nombre}`}
          width={112}
          height={112}
          priority={true} 
        />
      </div>
      
      {/* Contenido de texto */}
      <div className="p-4 w-full"> {/* Abarca todo el ancho */}
        <h3 className="text-lg font-bold text-gray-900">{nombre}</h3>
        <p className="text-sm text-gray-600 mt-1">{descripcion}</p>
        
        {/* 4. NUEVO BOTÓN "VER DETALLES" */}
        <button
          onClick={handleDetallesClick} // Esta es la función de NAVEGAR
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mt-3"
        >
          Ver detalles
          <ArrowRightIcon className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
}