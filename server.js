const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Servir archivos estáticos del frontend desde la carpeta 'model'
app.use(express.static(path.join(__dirname, 'model')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'model', 'index.html'));
});

// Nota: Las consultas a la base de datos (anteriormente en MySQL)
// fueron migradas al frontend usando Firebase Firestore.
// Este servidor ahora actúa únicamente como servidor de UI.

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`--- Servidor AulaClave (Modo Estático) Iniciado ---`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Carpeta actual: ${__dirname}`);
});