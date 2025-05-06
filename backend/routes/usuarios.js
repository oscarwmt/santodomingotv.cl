const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas públicas
router.post('/register', usuariosController.registrarUsuario);
router.post('/login', usuariosController.login);

// Rutas protegidas (requieren autenticación)
router.get('/', authMiddleware, usuariosController.obtenerUsuarios); // Ejemplo de ruta protegida

module.exports = router;
