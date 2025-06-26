const express = require('express');
const router = express.Router();
const controlador = require('../controllers/asistenciaController');
const verificarToken = require('../middleware/authMiddleware'); 

router.post('/edit', verificarToken, controlador.actualizarAsistencia);
router.get('/curso/:curso_id', verificarToken, controlador.getAsistenciaPorCurso);
router.get('/cursoyfecha/:curso_id', verificarToken, controlador.getAsistenciaPorCursoYFecha);

module.exports = router;