const express = require('express');
const router = express.Router();
const controlador = require('../controllers/asistenciaController');
const verificarToken = require('../middleware/authMiddleware'); 

router.post('/', verificarToken, controlador.actualizarAsistencia);
router.get('/curso/:curso_id', verificarToken, controlador.getAsistenciaPorCurso);

module.exports = router;