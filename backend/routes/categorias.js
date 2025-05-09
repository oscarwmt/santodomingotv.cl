// backend/routes/categorias.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las categorías
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM categorias ORDER BY nombre');
      res.json(result.rows);
    } catch (error) {
      console.error('Error al obtener categorías', error);
      res.status(500).json({ error: 'Error al obtener categorías' });
    }
  });
  

// Obtener subcategorías por categoría
router.get('/subcategorias/:categoriaId', async (req, res) => {
  const { categoriaId } = req.params;
  const result = await pool.query(
    'SELECT id, nombre FROM subcategorias WHERE categoria_id = $1 ORDER BY nombre',
    [categoriaId]
  );
  res.json(result.rows);
});

module.exports = router;
