const express = require('express');
const router = express.Router();
const controlador = require('../controllers/cursosController');
const verificarToken = require('../middleware/authMiddleware'); 

router.get('/:usuario_id', verificarToken, controlador.obtenerCursoPorProfesorUsuario);

module.exports = router;