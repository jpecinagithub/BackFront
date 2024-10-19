const express = require('express');
const router = express.Router();
const db = require('./db');

// Obtener todos los autores
router.get('/autores', (req, res) => {
  db.query('SELECT * FROM autores', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Obtener todos los posts
router.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
  });

// Obtener un autores por ID
router.get('/autores/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM autores WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json(results[0]);
  });
});

// Obtener un post por ID
router.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Post no encontrado' });
      }
      res.json(results[0]);
    });
  });

// Crear un nuevo autor
router.post('/autores', (req, res) => {
  const { nombre, email, imagen } = req.body;
  db.query('INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)', [nombre, email, imagen], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ id: results.insertId, nombre, email, imagen });
  });
});

// Crear un nuevo post
router.post('/posts', (req, res) => {
  const { titulo, descripcion, fecha, categoria, autores_id } = req.body;
  db.query('INSERT INTO posts (titulo, descripcion, fecha, categoria, autores_id ) VALUES (?, ?, ?, ?, ?)', [titulo, descripcion, fecha, categoria, autores_id ], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ id: results.insertId, titulo, descripcion, fecha, categoria, autores_id });
  });
});

// Actualizar un autor
router.put('/autores/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email ,imagen} = req.body;
  db.query('UPDATE autores SET nombre = ?, email = ? , imagen = ? WHERE id = ?', [nombre, email, imagen, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Autor actualizado' });
  });
});

// Actualizar un post
router.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha, categoria, autores_id} = req.body;
  db.query('UPDATE posts SET titulo = ?, descripcion = ? , fecha = ?, categoria = ?, autores_id = ? WHERE id = ?', [titulo, descripcion, fecha, categoria, autores_id, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Post actualizado' });
  });
});

// Eliminar un autor
router.delete('/autores/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM autores WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Autor eliminado' });
  });
});

// Eliminar un post
router.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: 'Post eliminado' });
  });
});

// Ruta para obtener todos los posts de un autor concreto
router.get('/autores/:autorId/posts', (req, res) => {
  const autorId = req.params.autorId; // Obtener el id del autor desde la URL

  // Consulta para obtener todos los posts del autor especificado
  db.query('SELECT * FROM posts WHERE autores_id = ?', [autorId], (error, results) => {
      if (error) {
          return res.status(500).send(error);
      }
      res.json(results); // Devuelve los resultados en formato JSON
  });
});

module.exports = router;
