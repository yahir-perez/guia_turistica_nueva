"use client";
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { lugares } from '../../data/lugares';
import { ArrowLeft, Share2, MapPin, Navigation, Star } from 'lucide-react';
import ComentariosSection from './ComentariosSection';
// IMPORTANTE: Importamos tu CSS Module
import styles from './PaginaLugar.module.css';

export default function LugarDetallePage({ params }) {
  const router = useRouter();
  
  // 1. LÓGICA DE DATOS (Intacta y segura)
  const paramsDesenvueltos = use(params);
  // Usamos '==' para encontrar el lugar sea texto o número
  const lugar = lugares.find(l => l.id == paramsDesenvueltos.slug);
  
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push('/'); 
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try { await navigator.share({ title: lugar?.nombre, url }); } catch (e) {}
    } else {
        await navigator.clipboard.writeText(url);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    }
  };

  const handleRuta = () => {
    if (lugar?.coordenadas) {
      const [lat, lng] = lugar.coordenadas;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  const scrollToComentarios = () => {
    // En este diseño de grid ya se ven los comentarios, pero dejamos el scroll por si acaso en móvil
    document.getElementById('seccion-comentarios')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mensaje de error usando tu clase .centeredMessage
  if (!lugar) return (
    <div className={styles.centeredMessage}>
        <p>Lugar no encontrado</p>
        <button onClick={() => router.push('/')} className={styles.botonRegresar}>
            Volver al Inicio
        </button>
    </div>
  );

  return (
    // Usamos .paginaContenedor del CSS
    <div className={styles.paginaContenedor}>
      
      {/* --- HEADER BOTONES --- */}
      <div className={styles.headerBotones}>
        <button onClick={handleBack} className={styles.botonIcono}>
            <ArrowLeft className={styles.icono} />
        </button>
        
        <div style={{ position: 'relative' }}>
            <button onClick={handleShare} className={styles.botonIcono}>
                <Share2 className={styles.icono} />
            </button>
            {copiado && <span style={{position:'absolute', top:'100%', right:0, background:'#333', color:'#fff', padding:'4px', fontSize:'10px', borderRadius:'4px'}}>Copiado</span>}
        </div>
      </div>

      {/* --- GRID (Info Izquierda - Comentarios Derecha) --- */}
      <div className={styles.gridContenedor}>
        
        {/* COLUMNA IZQUIERDA: FOTO E INFO */}
        <div className={styles.columnaInfo}>
            {/* Aquí se aplica el tamaño del CSS (.infoImagen) */}
            <img 
                src={lugar.imagenUrl} 
                alt={lugar.nombre} 
                className={styles.infoImagen} 
            />

            <span style={{ color: '#2563EB', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {lugar.categoria}
            </span>

            <h1 className={styles.infoTitulo}>{lugar.nombre}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', color: '#6B7280' }}>
                <MapPin size={16} color="#EF4444" />
                <span style={{ fontSize: '14px' }}>San Juan del Río, Qro.</span>
            </div>

            <p className={styles.infoDescripcion}>
                {lugar.acerca || lugar.descripcion}
            </p>

            {/* Botones de acción (Ruta / Calificar) */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <button 
                    onClick={handleRuta}
                    className={styles.botonRegresar} 
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                    <Navigation size={16} /> Cómo llegar
                </button>
                <button 
                     onClick={scrollToComentarios}
                     className={styles.botonIcono}
                     style={{ borderRadius: '6px', padding: '8px 16px', width: 'auto', flex: 1, border: '1px solid #ccc' }}
                >
                    <Star size={16} color="#EAB308" /> Calificar
                </button>
            </div>
        </div>

        {/* COLUMNA DERECHA: COMENTARIOS */}
        <div id="seccion-comentarios" className={styles.columnaComentarios}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Opiniones</h3>
            {/* Pasamos el slug limpio */}
            <ComentariosSection lugarId={String(paramsDesenvueltos.slug)} />
        </div>

      </div>
    </div>
  );
}