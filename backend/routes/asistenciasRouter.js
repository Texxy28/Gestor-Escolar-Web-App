import { Router } from 'express';
const asistenciaRouter = Router();
import { actualizarAsistencia, getAsistenciaPorCurso, getAsistenciaPorCursoYFecha } from '../controllers/asistenciaController.js';
import verifyToken from '../middleware/authMiddleware.js'; 

asistenciaRouter.post('/edit', verifyToken, actualizarAsistencia);
asistenciaRouter.get('/curso/:curso_id', verifyToken, getAsistenciaPorCurso);
asistenciaRouter.get('/cursoyfecha/:curso_id', verifyToken, getAsistenciaPorCursoYFecha);

export default asistenciaRouter;