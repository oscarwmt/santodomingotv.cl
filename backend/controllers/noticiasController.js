const pool = require('../db');
const path = require('path');

exports.obtenerNoticias = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM noticias ORDER BY creado_en DESC');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
};

exports.obtenerNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('SELECT * FROM noticias WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la noticia' });
  }
};

exports.crearNoticia = async (req, res) => {
    const { titulo, contenido } = req.body;
    const imagenDestacada = req.file?.filename;
  
    if (!imagenDestacada) {
      return res.status(400).json({ error: 'La imagen destacada es obligatoria' });
    }
  
    try {
      const resultado = await pool.query(
        'INSERT INTO noticias (titulo, contenido, imagen_destacada) VALUES ($1, $2, $3) RETURNING *',
        [titulo, contenido, imagenDestacada]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear noticia' });
    }
  };
  

exports.actualizarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, resumen, contenido, autor_id } = req.body;

    const imagenDestacada = req.files['imagen_destacada']?.[0]?.filename;
    const imagenesContenido = req.files['imagenes_contenido']?.map(f => f.filename);

    const noticiaActual = await pool.query('SELECT * FROM noticias WHERE id = $1', [id]);
    if (noticiaActual.rows.length === 0) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    const nuevaImagenDestacada = imagenDestacada || noticiaActual.rows[0].imagen_destacada;
    const nuevasImagenesContenido = imagenesContenido?.length
      ? imagenesContenido
      : noticiaActual.rows[0].imagenes_contenido;

    const resultado = await pool.query(
      `UPDATE noticias SET titulo = $1, resumen = $2, contenido = $3, 
       imagen_destacada = $4, imagenes_contenido = $5, autor_id = $6 WHERE id = $7 RETURNING *`,
      [titulo, resumen, contenido, nuevaImagenDestacada, nuevasImagenesContenido, autor_id, id]
    );

    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la noticia' });
  }
};

exports.eliminarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('DELETE FROM noticias WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }
    res.json({ mensaje: 'Noticia eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la noticia' });
  }
};
