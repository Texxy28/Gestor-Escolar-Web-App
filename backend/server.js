import express from "express"
import cors from 'cors';

import authRouter from "./routes/authRoutes.js";
import notasRouter from "./routes/notasRoutes.js";
import cursoRouter from "./routes/cursosRoutes.js";
import asistenciaRouter from "./routes/asistenciasRouter.js";
import notificacionesRouter from "./routes/notificacionesRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/notas', notasRouter);
app.use('/api/cursos', cursoRouter);
app.use('/api/asistencias', asistenciaRouter);
app.use('/api/notificaciones', notificacionesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
