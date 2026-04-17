import { db } from "./firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const loginModal = document.getElementById("loginModal");
const btnAcceder = document.querySelector(".btn-login");
const closeBtn = document.querySelector(".close-btn");
const loginForm = document.querySelector("#loginModal form");

// Abrir modal de login
btnAcceder.onclick = (e) => { 
    e.preventDefault(); 
    loginModal.style.display = "block"; 
}

// Cerrar modal
closeBtn.onclick = () => { loginModal.style.display = "none"; }

// Lógica de Login con Firebase
loginForm.onsubmit = async (e) => {
    e.preventDefault();
    
    // Capturamos los datos del formulario
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
        const q = query(collection(db, "usuarios"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            // Guardamos el nombre en el navegador para usarlo en el dashboard
            localStorage.setItem("usuario_nombre", userDoc.nombre);
            // Redirigimos a la gestión del inventario
            window.location.href = "dashboard.html"; 
        } else {
            alert("Error: Correo institucional no encontrado en Firebase.");
        }
    } catch (error) {
        console.error("Error en la conexión a Firebase:", error);
        alert("No se pudo conectar con Firebase: " + error.message);
    }
}