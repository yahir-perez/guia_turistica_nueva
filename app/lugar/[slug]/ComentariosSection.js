"use client";

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import StarRating from './StarRating';
// 1. IMPORTAR EL CSS MODULE
import styles from './ComentariosLocal.module.css';

export default function ComentariosSection({ lugarId }) {
  // --- TODA TU LÓGICA DE JAVASCRIPT SE QUEDA IGUAL ---
  const [comentarios, setComentarios] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [nuevaCalificacion, setNuevaCalificacion] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const stringLugarId = String(lugarId);
    const q = query(
      collection(db, 'lugares', stringLugarId, 'comentarios'),
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const comentariosLeidos = [];
      querySnapshot.forEach((doc) => {
        comentariosLeidos.push({ id: doc.id, ...doc.data() });
      });
      setComentarios(comentariosLeidos);
      setLoading(false);
    }, (error) => {
      console.error("Error al leer comentarios: ", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [lugarId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevoComentario.trim() === '' || nuevoNombre.trim() === '' || nuevaCalificacion === 0) {
      alert('Por favor, completa todos los campos (nombre, comentario y calificación).');
      return;
    }
    try {
      await addDoc(collection(db, 'lugares', String(lugarId), 'comentarios'), {
        nombre: nuevoNombre,
        texto: nuevoComentario,
        rating: nuevaCalificacion,
        timestamp: serverTimestamp(),
      });
      setNuevoNombre('');
      setNuevoComentario('');
      setNuevaCalificacion(0);
    } catch (error) {
      console.error("Error al añadir comentario: ", error);
      alert('Hubo un error al enviar tu comentario.');
    }
  };
  // --- FIN DE LA LÓGICA ---

  return (
    // 2. QUITAR CLASES DE TAILWIND DE LOS DIVS PRINCIPALES
    <div style={{ marginTop: '32px', borderTop: '1px solid #E5E7EB', paddingTop: '24px' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>
        Comentarios y Calificaciones
      </h2>
      
      {/* 3. APLICAR CLASES DEL CSS MODULE AL FORMULARIO */}
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div>
          <label htmlFor="nombre" className={styles.label}>Tu Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            className={styles.input}
            placeholder="Juan Pérez"
          />
        </div>
        <div>
          <label htmlFor="comentario" className={styles.label}>Comentario</label>
          <textarea
            id="comentario"
            rows="3"
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
            className={styles.textarea}
            placeholder="¡Me encantó este lugar!"
          ></textarea>
        </div>
        <div>
          <label className={styles.label}>Calificación</label>
          <StarRating rating={nuevaCalificacion} setRating={setNuevaCalificacion} />
        </div>
        <button type="submit" className={styles.boton}>
          Enviar Comentario
        </button>
      </form>

      {/* 4. APLICAR CLASES A LA LISTA DE COMENTARIOS */}
      <div>
        {loading && <p>Cargando comentarios...</p>}
        
        {!loading && comentarios.length === 0 && (
          <p>Aún no hay comentarios. ¡Sé el primero!</p>
        )}
        
        {comentarios.map((comentario) => (
          <div key={comentario.id} className={styles.comentarioCard}>
            <div className={styles.comentarioHeader}>
              <h4 className={styles.comentarioNombre}>{comentario.nombre}</h4>
              <StarRating rating={comentario.rating} />
            </div>
            <p className={styles.comentarioTexto}>{comentario.texto}</p>
            <p className={styles.comentarioTimestamp}>
              {comentario.timestamp ? new Date(comentario.timestamp.toDate()).toLocaleString() : 'Justo ahora'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}