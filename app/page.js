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

  const handleTarjetaClick = (lugar) => {
    setLugarSeleccionado(lugar);
  };

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
    <main
      className="
      flex flex-row h-screen 
      bg-gradient-to-br from-blue-400 via-teal-300 to-yellow-200
      backdrop-blur-sm
      "
    >
      
      {/* SIDEBAR */}
      <div
        className="
        w-[420px] h-full p-6 
        bg-white/40 backdrop-blur-xl 
        border-r border-white/20 
        shadow-xl overflow-y-auto
        rounded-tr-3xl rounded-br-3xl
        "
      >
        
        {/* Encabezado */}
        <div className="flex items-center mb-6 px-2">
          <Image 
            src="https://picsum.photos/id/1011/100/100"
            width={60} 
            height={60} 
            alt="Logo Guía SJR" 
            className="rounded-full shadow-lg mr-4" 
          />

          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm">
            Guía SJR
          </h1>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6 px-1">
          <input 
            type="text" 
            placeholder="Buscar un lugar..."
            className="
            w-full px-5 py-3 rounded-full 
            bg-white/70 backdrop-blur-sm 
            border border-white/40 
            shadow-inner focus:ring-2 
            focus:ring-teal-400 focus:outline-none
            "
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6 px-1">
          {categorias.map(categoria => (
            <button
              key={categoria}
              onClick={() => setFiltro(categoria)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold
                transition-all duration-200 shadow-md
                ${
                  filtro === categoria
                    ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg scale-105"
                    : "bg-white/70 backdrop-blur-sm border border-gray-300 text-gray-700 hover:bg-white shadow"
                }
                ${categoria === "Favoritos" ? "pr-6" : ""}
              `}
            >
              {categoria === "Favoritos" ? "❤️ " : ""}{categoria}
            </button>
          ))}
        </div>

        {/* TARJETAS */}
        <section className="space-y-4">
          {lugaresFiltrados.map((lugar) => (
            <TarjetaLugar
              key={lugar.id}
              lugar={lugar}
              onTarjetaClick={() => handleTarjetaClick(lugar)}
              onVerDetallesClick={() => handleVerDetallesClick(lugar.id)}
              estaSeleccionada={lugarSeleccionado?.id === lugar.id}
              esFavorito={favoritos.has(lugar.id)}
              onToggleFavorito={handleToggleFavorito}
            />
          ))}
        </section>

      </div>

      {/* COLUMNA DERECHA - MAPA */}
      <div className="flex-1 h-full">
        <Mapa lugares={lugaresFiltrados} lugarSeleccionado={lugarSeleccionado} />
      </div>
      
    </main>
  );
}
