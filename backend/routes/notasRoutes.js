import express from "express"

import { actualizarNota, crearNota, eliminarNota, obtenerNotaPorAlumnoYCurso, obtenerNotas } from "../controllers/notasController.js"
import verifyToken from "../middleware/authMiddleware.js"

const notasRouter = express.Router();

notasRouter.post('/', verifyToken, crearNota);
notasRouter.get('/:curso_id', verifyToken, obtenerNotas);
notasRouter.post('/edit', verifyToken, actualizarNota);
notasRouter.delete('/:id', verifyToken, eliminarNota);
notasRouter.get('/:alumno_id/:curso_id', verifyToken, obtenerNotaPorAlumnoYCurso);

export default notasRouter;
