// backend/controllers/noticiasController.js
const pool = require('../db');
const fs = require('fs');
const path = require('path');

exports.obtenerNoticias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM noticias ORDER BY creado_en DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.obtenerNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM noticias WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.crearNoticia = async (req, res) => {
  try {
    const {
      titulo,
      destacada,
      categoria_id,
      subcategoria_id,
      contenido,
      etiquetas,
    } = req.body;

    const usuario_id = req.usuario?.id || 1;
    const fecha_creacion = new Date();

    let imagen_destacada = null;
    if (req.file) {
      imagen_destacada = req.file.filename;
    }

    const result = await pool.query(
      `INSERT INTO noticias 
       (titulo, destacada, categoria_id, subcategoria_id, contenido, etiquetas, imagen_destacada, usuario_id, creado_en)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        titulo,
        destacada === 'true',
        categoria_id,
        subcategoria_id,
        contenido,
        etiquetas,
        imagen_destacada,
        usuario_id,
        fecha_creacion,
      ]
    );

    res.json({ id: result.rows[0].id, message: 'Noticia creada' });
  } catch (error) {
    console.error('Error al crear noticia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.actualizarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    // Lógica para actualizar noticia según req.body y req.files
    res.json({ message: `Noticia ${id} actualizada (implementación pendiente)` });
  } catch (error) {
    console.error('Error al actualizar noticia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.eliminarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM noticias WHERE id = $1', [id]);
    res.json({ message: 'Noticia eliminada' });
  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
