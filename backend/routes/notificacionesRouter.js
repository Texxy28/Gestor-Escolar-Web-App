import express from "express"

import { crearNotificacion, getNotificacionesPorProfesorId, marcarComoLeida } from "../controllers/notificacionesController.js"
import verifyToken from "../middleware/authMiddleware.js"

const notificacionesRouter = express.Router();

notificacionesRouter.get('/:profesor_id', verifyToken, getNotificacionesPorProfesorId);
notificacionesRouter.put('/update/:notificacion_id', verifyToken, marcarComoLeida);
notificacionesRouter.post('/', verifyToken, crearNotificacion);

export default notificacionesRouter;

