import Image from "next/image";
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function TarjetaLugar({
  lugar,
  onTarjetaClick,
  onVerDetallesClick,
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

  const handleDetallesClick = (e) => {
    e.stopPropagation();
    onVerDetallesClick(id);
  };

  return (
    <div
      onClick={onTarjetaClick}
      className={`
        relative flex items-center gap-4 p-4 w-full
        rounded-2xl cursor-pointer transition-all duration-300
        bg-white/50 backdrop-blur-md border border-white/30
        shadow-md hover:shadow-xl hover:scale-[1.02]
        ${estaSeleccionada ? "ring-2 ring-blue-500 scale-[1.03] shadow-xl" : ""}
      `}
    >
      {/* CORAZÓN DE FAVORITO */}
      <button
        onClick={handleFavoritoClick}
        className="
          absolute top-3 right-3 p-2 rounded-full
          bg-white/80 backdrop-blur-md shadow-md text-xl
          hover:scale-110 transition-transform z-20
        "
      >
        {esFavorito ? "❤️" : "🤍"}
      </button>

      {/* IMAGEN */}
      <div className="flex-shrink-0">
        <Image
          className="rounded-xl object-cover shadow-md w-[110px] h-[110px]"
          src={imagenUrl}
          alt={`Imagen de ${nombre}`}
          width={110}
          height={110}
          priority={true}
        />
      </div>

      {/* TEXTO */}
      <div className="flex flex-col justify-between w-full pr-8">
        <h3 className="text-lg font-bold text-gray-900 drop-shadow-sm">
          {nombre}
        </h3>

        <p className="text-sm text-gray-700 mt-1 line-clamp-2">
          {descripcion}
        </p>

        {/* BOTÓN DE VER DETALLES */}
        <button
          onClick={handleDetallesClick}
          className="
            flex items-center gap-1 mt-3 w-fit
            text-sm font-semibold text-blue-700
            hover:text-blue-900 hover:gap-2 transition-all
          "
        >
          Ver detalles
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
