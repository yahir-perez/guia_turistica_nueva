// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Importa getFirestore para crear la instancia de la base de datos
import { getFirestore } from "firebase/firestore";
// (Opcional pero recomendado) Importa getAuth para la autenticación
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtO-02DWbePUlKgzK5V4Jro53UYYnj-qQ",
  authDomain: "guia-turistica-44244.firebaseapp.com",
  projectId: "guia-turistica-44244",
  storageBucket: "guia-turistica-44244.firebasestorage.app",
  messagingSenderId: "913138018765",
  appId: "1:913138018765:web:da7ffccfd77dc4278b3c84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- ESTA ES LA PARTE IMPORTANTE QUE FALTABA ---

// Inicializa los servicios que necesitas
const db = getFirestore(app);
const auth = getAuth(app); // (Opcional, pero probable que lo necesites)

// Exporta las instancias para que otros archivos puedan usarlas
export { db, auth };