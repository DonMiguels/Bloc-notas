const express = require('express');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'Miguel02',
  database: 'Bloc_notas',
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.use(cors());
app.use(express.json());

// Manejar Inicio de Sesion
app.post('/api/login', (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  console.log('Datos de inicio de sesión:', req.body);

  client.query('SELECT * FROM blocnotasusuarios WHERE nombre_usuario = $1 AND contrasena = $2', [nombre_usuario, contrasena], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ error: err.message });
    }
    if (results.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: results.rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Manejar Usuarios
app.post('/api/usuarios', (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  client.query('INSERT INTO blocnotasusuarios (nombre_usuario, contrasena) VALUES ($1, $2)', [nombre_usuario, contrasena], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Manejar Notas
app.post('/api/notas', (req, res) => {
  const { titulo, contenido, userId } = req.body;

  client.query('INSERT INTO blocnotasnotas (titulo, contenido, user_id) VALUES ($1, $2, $3)', 
               [titulo, contenido, userId || 1], 
               (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Obtener Notas del usuario
app.get('/api/notas/:userId', (req, res) => {
  const userId = req.params.userId;

  client.query('SELECT * FROM blocnotasnotas WHERE user_id = $1', [userId], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results.rows); 
  });
});

// Actualizar Notas
app.put('/api/notas', (req, res) => {
  const { id, titulo, contenido, userId } = req.body;

  client.query('UPDATE blocnotasnotas SET titulo = $1, contenido = $2 WHERE id = $3 AND user_id = $4', 
               [titulo, contenido, id, userId || 1], 
               (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Nota actualizada' });
  });
});

// Eliminar Notas
app.delete('/api/notas/:id', (req, res) => {
  const id = req.params.id;

  client.query('DELETE FROM blocnotasnotas WHERE id = $1', [id], (err, results) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send(); 
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
