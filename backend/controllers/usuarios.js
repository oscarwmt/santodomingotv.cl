const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/register', usuariosController.registrarUsuario);
router.post('/login', usuariosController.login);
router.get('/', usuariosController.obtenerUsuarios); // opcional, según permisos

module.exports = router;
