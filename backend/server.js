require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notas', require('./routes/notasRoutes'));
app.use('/api/cursos', require('./routes/cursosRoutes'));
app.use('/api/asistencias', require('./routes/asistenciasRouter'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
