// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

// Prueba de conexión
app.get('/', (req, res) => {
    res.send('🚀 Servidor EduJuegos en funcionamiento');
});

// Importar rutas docentes
const authRoutes = require('./routes/authRoutes');
const actividadRoutes = require('./routes/actividadRoutes');
const resultadoRoutes = require('./routes/resultadoRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');

// Importar rutas estudiantes
const estudianteRoutes = require('./routes/estudianteRoutes');
const estudianteAuthRoutes = require('./routes/estudianteAuthRoutes');
const actividadEstudianteRoutes = require('./routes/actividadEstudianteRoutes');
const estudianteActividadRoutes = require('./routes/estudianteActividadRoutes');
const resultadoEstudianteRoutes = require('./routes/resultadoEstudianteRoutes');
const comentarioEstudianteRoutes = require('./routes/comentarioEstudianteRoutes');
const entregaRoutes = require('./routes/entregaRoutes');

// Usar rutas docentes
app.use('/api/auth', authRoutes);
app.use('/api/actividades', actividadRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/comentarios', comentarioRoutes);

// Usar rutas estudiantes
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/estudiantes/auth', estudianteAuthRoutes);
app.use('/api/entregas', entregaRoutes);
app.use('/api/estudiante/actividades', actividadEstudianteRoutes);
app.use('/api/estudiante', estudianteActividadRoutes);
app.use('/api/estudiante/resultados', resultadoEstudianteRoutes);
app.use('/api/estudiante/comentarios', comentarioEstudianteRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
