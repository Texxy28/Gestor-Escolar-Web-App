import express from "express"

import verifyToken from "../middleware/authMiddleware.js"
const cursoRouter = express.Router();

import { obtenerCursoPorId, obtenerCursoPorProfesorUsuario } from "../controllers/cursosController.js"

cursoRouter.get('/:usuario_id', verifyToken, obtenerCursoPorProfesorUsuario);
cursoRouter.get('/curso/:curso_id', verifyToken, obtenerCursoPorId);

export default cursoRouter;