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

// Lógica de Login con Fetch
loginForm.onsubmit = async (e) => {
    e.preventDefault();
    
    // Capturamos los datos del formulario
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Guardamos el nombre en el navegador para usarlo en el dashboard
            localStorage.setItem("usuario_nombre", data.user.nombre);
            // Redirigimos a la gestión del inventario
            window.location.href = "dashboard.html"; 
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
        alert("No se pudo conectar con el servidor. Verifica que node server.js esté corriendo.");
    }
}