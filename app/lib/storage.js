import localforage from "localforage";

// Configuramos localforage para que use IndexedDB
localforage.config({
  name: "guiaSJR",
  storeName: "favoritos",
  description: "Almacén de lugares favoritos",
});

// Función para OBTENER todos los IDs de favoritos
export const getFavoritos = async () => {
  const favoritos = await localforage.getItem("favoritos");
  // Si no hay nada, regresa un Set (un tipo de array) vacío
  return new Set(favoritos || []);
};

// Función para AÑADIR un favorito
export const addFavorito = async (idLugar) => {
  const favoritos = await getFavoritos();
  favoritos.add(idLugar);
  // Guardamos el Set actualizado
  await localforage.setItem("favoritos", Array.from(favoritos));
  return favoritos;
};

// Función para QUITAR un favorito
export const removeFavorito = async (idLugar) => {
  const favoritos = await getFavoritos();
  favoritos.delete(idLugar);
  await localforage.setItem("favoritos", Array.from(favoritos));
  return favoritos;
};