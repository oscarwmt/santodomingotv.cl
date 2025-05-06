const pool = require('../db');

exports.obtenerPublicidad = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM publicidad ORDER BY id DESC');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener publicidad' });
  }
};

exports.crearPublicidad = async (req, res) => {
    const { titulo, descripcion, url, tipo } = req.body;
    const imagen = req.file?.filename;
  
    if (!imagen) {
      return res.status(400).json({ error: 'Se requiere imagen para la publicidad' });
    }
  
    try {
      const resultado = await pool.query(
        'INSERT INTO publicidad (titulo, descripcion, imagen, url, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [titulo, descripcion, imagen, url, tipo]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear publicidad' });
    }
  };
  

exports.actualizarPublicidad = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, imagen, url, tipo } = req.body;

  try {
    const resultado = await pool.query(
      'UPDATE publicidad SET titulo = $1, descripcion = $2, imagen = $3, url = $4, tipo = $5 WHERE id = $6 RETURNING *',
      [titulo, descripcion, imagen, url, tipo, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Publicidad no encontrada' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar publicidad' });
  }
};

exports.eliminarPublicidad = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query('DELETE FROM publicidad WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Publicidad no encontrada' });
    }
    res.json({ mensaje: 'Publicidad eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar publicidad' });
  }
};
