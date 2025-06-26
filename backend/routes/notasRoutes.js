const express = require('express');
const router = express.Router();
const controlador = require('../controllers/notasController');
const verificarToken = require('../middleware/authMiddleware'); // si deseas proteger

router.post('/', verificarToken, controlador.crearNota);
router.get('/:curso_id', verificarToken, controlador.obtenerNotas);
router.put('/:id', verificarToken, controlador.actualizarNota);
router.delete('/:id', verificarToken, controlador.eliminarNota);
router.get('/:alumno_id/:curso_id', verificarToken, controlador.obtenerNotaPorAlumnoYCurso);

module.exports = router;
