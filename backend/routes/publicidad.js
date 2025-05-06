const express = require('express');
const router = express.Router();
const publicidadController = require('../controllers/publicidadController');
const upload = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', publicidadController.obtenerPublicidad);
router.post('/', authMiddleware, upload.single('imagen'), publicidadController.crearPublicidad);
router.put('/:id', authMiddleware, upload.single('imagen'), publicidadController.actualizarPublicidad);
router.delete('/:id', authMiddleware, publicidadController.eliminarPublicidad);

module.exports = router;
