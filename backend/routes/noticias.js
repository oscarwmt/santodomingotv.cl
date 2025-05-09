// backend/routes/noticias.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const noticiasController = require('../controllers/noticiasController');
const { upload } = require('../middlewares/uploadMiddleware');

// Rutas
router.get('/', noticiasController.obtenerNoticias);
router.get('/:id', noticiasController.obtenerNoticia);

// Crear noticia con imágenes
router.post('/', upload.single('imagenDestacada'), noticiasController.crearNoticia);


// Actualizar noticia
router.put(
  '/:id',
  upload.fields([
    { name: 'imagen_destacada', maxCount: 1 },
    { name: 'imagenes_contenido', maxCount: 4 }
  ]),
  noticiasController.actualizarNoticia
);

// Eliminar noticia
router.delete('/:id', noticiasController.eliminarNoticia);

module.exports = router;