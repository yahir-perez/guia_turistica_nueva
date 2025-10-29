// En tu archivo de página, ej: app/lugares/[lugarId]/page.js
"use client";

// --- 1. IMPORTACIONES NECESARIAS ---
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/solid';

// Tus otras importaciones
import ComentariosSection from './ComentariosSection'; // Ajusta la ruta
// Asumo que tienes un CSS Module para esta página
import styles from './PaginaLugar.module.css'; 

// (Asumo que también cargas los datos del lugar)
// import { db } from '../../lib/firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { useState, useEffect } from 'react';

export default function LugarDetallePage({ params }) {
  const { lugarId } = params;
  const router = useRouter();

  // (Aquí iría tu lógica para cargar la info del lugar, si la tienes)
  // const [lugar, setLugar] = useState(null);
  // useEffect(() => { ... lógica para getDoc(doc(db, 'lugares', lugarId)) ... }, [lugarId]);
  // Por ahora, usaremos un nombre genérico para compartir

  // --- 2. FUNCIÓN PARA COMPARTIR ---
  const handleShare = async () => {
    const shareData = {
      title: `¡Mira este lugar!`, // Puedes poner: `¡Mira este lugar: ${lugar.nombre}!`
      text: 'Te recomiendo visitar este lugar.',
      url: window.location.href, // Comparte la URL actual
    };

    try {
      if (navigator.share) {
        // API nativa de compartir (móviles)
        await navigator.share(shareData);
      } else {
        // Fallback para escritorio (copiar al portapapeles)
        await navigator.clipboard.writeText(window.location.href);
        alert('¡Enlace copiado al portapapeles!');
      }
    } catch (err) {
      console.error('Error al compartir:', err);
      alert('No se pudo compartir el enlace.');
    }
  };

  return (
    // 3. CONTENEDOR PRINCIPAL CON ESTILO
    <div className={styles.paginaContenedor}>
      
      {/* --- 4. HEADER CON LOS BOTONES --- */}
      <div className={styles.headerBotones}>
        {/* BOTÓN DE REGRESO */}
        <button 
          onClick={() => router.back()} 
          className={styles.botonIcono}
          aria-label="Regresar"
        >
          <ArrowLeftIcon className={styles.icono} />
        </button>

        {/* BOTÓN DE COMPARTIR */}
        <button 
          onClick={handleShare} 
          className={styles.botonIcono}
          aria-label="Compartir"
        >
          <ShareIcon className={styles.icono} />
        </button>
      </div>

      {/* --- AQUÍ VA EL RESTO DE TU CONTENIDO --- */}
      {/* <img src={lugar?.imagenUrl} alt={lugar?.nombre} />
        <h1>{lugar?.nombre}</h1>
        <p>{lugar?.descripcion}</p>
      */}
      <p>Aquí va la foto, título y descripción...</p>
      

      {/* --- SECCIÓN DE COMENTARIOS (esta ya la tenías) --- */}
      <ComentariosSection lugarId={lugarId} />

    </div>
  );
}