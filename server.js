const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());// Ruta para actualizar la cantidad de un objeto
app.put('/actualizar-cantidad/:id', (req, res) => {
    const { id } = req.params;
    const { cantidad } = req.body;
    const query = 'UPDATE objetos SET cantidad = ? WHERE id = ?';

    db.execute(query, [cantidad, id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'Cantidad actualizada correctamente' });
    });
});

// Ruta para eliminar un objeto
app.delete('/eliminar-objeto/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM objetos WHERE id = ?';

    db.execute(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'Objeto eliminado correctamente' });
    });
});


// 1. Dile a Express que los archivos estáticos están en la carpeta 'model'
app.use(express.static(path.join(__dirname, 'model')));

// 2. Ajusta la ruta principal para que busque el index dentro de 'model'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'model', 'index.html'));
});

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '', 
    database: 'aulaclave_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos (Puerto 3307):', err.message);
        return;
    }
    console.log('Conectado exitosamente a la base de datos MySQL en el puerto 3307');
});

// Ruta para el Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT id, nombre FROM usuarios WHERE email = ? AND password = ?';
    
    db.execute(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.json({ success: false, message: 'Credenciales incorrectas' });
        }
    });
});

// Ruta para obtener el Inventario (Actualizada para incluir profesor)
app.get('/inventario', (req, res) => {
    const query = `SELECT id, nombre, cantidad, estado, profesor_encargado 
                   FROM objetos`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ruta para añadir un nuevo objeto al inventario (Actualizada con profesor)
app.post('/añadir-objeto', (req, res) => {
    // Extraemos 'profesor' del body que envía el frontend
    const { nombre, cantidad, estado, profesor } = req.body;
    const query = 'INSERT INTO objetos (nombre, cantidad, estado, profesor_encargado, categoria_id) VALUES (?, ?, ?, ?, 1)';
    
    db.execute(query, [nombre, cantidad, estado, profesor], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'Objeto guardado correctamente' });
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`--- Servidor AulaClave Iniciado ---`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Carpeta actual: ${__dirname}`);
});