"use client";

import { useState, useEffect } from "react";
import TarjetaLugar from "../components/tarjetalugar";
import dynamic from "next/dynamic";
import { lugares } from "./data/lugares";
import Image from "next/image";
import { getFavoritos, addFavorito, removeFavorito } from "./lib/storage";
import { useRouter } from "next/navigation"; 

const Mapa = dynamic(() => import("../components/mapa"), { ssr: false });

const categorias = ["Todos", "Favoritos", "Parque", "Iglesia", "Monumento"];

export default function Home() {
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [favoritos, setFavoritos] = useState(new Set());
  const router = useRouter(); 

  useEffect(() => {
    const cargarFavoritos = async () => {
      const favsGuardados = await getFavoritos();
      setFavoritos(favsGuardados);
    };
    cargarFavoritos();
  }, []); 

  const lugaresFiltrados = lugares.filter(lugar => {
    if (filtro === "Favoritos") return favoritos.has(lugar.id);
    if (filtro === "Todos") return true;
    return lugar.categoria === filtro;
  });

  // 1. ESTA FUNCIÓN AHORA SÓLO SELECCIONA EN EL MAPA
  const handleTarjetaClick = (lugar) => {
    setLugarSeleccionado(lugar); 
  };

  // 2. NUEVA FUNCIÓN SÓLO PARA NAVEGAR
  const handleVerDetallesClick = (idLugar) => {
    router.push(`/lugar/${idLugar}`); 
  };

  const handleToggleFavorito = async (idLugar) => {
    let nuevosFavoritos;
    if (favoritos.has(idLugar)) {
      nuevosFavoritos = await removeFavorito(idLugar);
    } else {
      nuevosFavoritos = await addFavorito(idLugar);
    }
    setFavoritos(nuevosFavoritos);
  };

  return (
    <main className="flex flex-row h-screen bg-gray-100">
      
      <div className="w-[400px] h-full p-4 bg-white overflow-y-auto shadow-lg z-10">
        
        {/* Encabezado */}
        <div className="flex items-center mb-4 px-2">
          <Image 
            src="https://picsum.photos/id/1011/100/100"
            width={50} 
            height={50} 
            alt="Logo Guía SJR" 
            className="rounded-full mr-3" 
          />
          <h1 className="text-2xl font-bold text-slate-900">
            Guía SJR
          </h1>
        </div>
        
        {/* Barra de Búsqueda (Sigue siendo visual por ahora) */}
        <div className="mb-4 px-1">
          <input 
            type="text" 
            placeholder="Buscar un lugar..." 
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botones de Filtro */}
        <div className="flex flex-wrap gap-2 mb-4 px-1">
          {categorias.map(categoria => (
            <button
              key={categoria}
              onClick={() => setFiltro(categoria)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-semibold
                transition-all duration-200
                ${filtro === categoria 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }
                ${filtro === 'Favoritos' && categoria === 'Favoritos' ? 'bg-red-500' : ''}
              `}
            >
              {categoria === 'Favoritos' ? '❤️ ' : ''}{categoria}
            </button>
          ))}
        </div>
        
        {/* Contenedor de las tarjetas */}
        <section className="space-y-3">
          {lugaresFiltrados.map((lugar) => (
            <TarjetaLugar
              key={lugar.id}
              lugar={lugar}
              onTarjetaClick={() => handleTarjetaClick(lugar)} // 3. Pasa la función de seleccionar
              onVerDetallesClick={() => handleVerDetallesClick(lugar.id)} // 4. Pasa la función de navegar
              estaSeleccionada={lugarSeleccionado?.id === lugar.id}
              esFavorito={favoritos.has(lugar.id)}
              onToggleFavorito={handleToggleFavorito}
            />
          ))}
        </section>
      </div>

      {/* COLUMNA DERECHA (Mapa) */}
      <div className="flex-1 h-full">
        <Mapa lugares={lugaresFiltrados} lugarSeleccionado={lugarSeleccionado} />
      </div>
      
    </main>
  );
}