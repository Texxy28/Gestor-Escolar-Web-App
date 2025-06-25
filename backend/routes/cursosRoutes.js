const express = require('express');
const router = express.Router();
const controlador = require('../controllers/cursosController');
const verificarToken = require('../middleware/authMiddleware'); 

router.get('/:usuario_id', verificarToken, controlador.obtenerCursoPorProfesorUsuario);
router.get('/curso/:curso_id', verificarToken, controlador.obtenerCursoPorId);

module.exports = router;