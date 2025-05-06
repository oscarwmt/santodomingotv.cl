// backend/routes/noticias.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const noticiasController = require('../controllers/noticiasController');
const upload = require('../middlewares/uploadMiddleware'); // Usar el middleware de upload
const authMiddleware = require('../middlewares/authMiddleware');

const {
  obtenerNoticias,
  obtenerNoticia,
  crearNoticia,
  actualizarNoticia,
  eliminarNoticia
} = require('../controllers/noticiasController');

// Rutas
router.get('/', obtenerNoticias);
router.get('/:id', obtenerNoticia);

router.get('/', async (req, res) => {
    console.log('➡️ Entrando a GET /api/noticias'); // Este debería verse en consola
  
    try {
      // Aquí está fallando: prueba temporalmente con esto:
      const noticias = await db.query('SELECT * FROM noticias'); // O tu tabla real
  
      res.json(noticias.rows); // Asume que usas pg
    } catch (error) {
      console.error('❌ ERROR en /api/noticias:', error); // <-- importante
      res.status(500).json({ error: 'Error al obtener noticias' });
    }
  });
  
  

// Aquí ya no es necesario declarar nuevamente `upload`, ya que se importa desde `uploadMiddleware`.
router.post('/', upload.fields([
  { name: 'imagen_destacada', maxCount: 1 },
  { name: 'imagenes_contenido', maxCount: 4 }
]), crearNoticia);

router.put('/:id', upload.fields([
  { name: 'imagen_destacada', maxCount: 1 },
  { name: 'imagenes_contenido', maxCount: 4 }
]), actualizarNoticia);

router.delete('/:id', eliminarNoticia);

// Esta ruta parece estar duplicada, así que la he comentado
// router.post('/', authMiddleware, upload.single('imagen'), noticiasController.crearNoticia);

module.exports = router;
