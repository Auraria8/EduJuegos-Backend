// src/routes/resultadoEstudianteRoutes.js
const express = require('express');
const router = express.Router();
const resultadoController = require('../controllers/resultadoController');
const { verificarTokenEstudiante } = require('../middlewares/authMiddleware');

// Ruta protegida para obtener resultados del estudiante autenticado
router.get('/', verificarTokenEstudiante, resultadoController.obtenerResultadosEstudiante);

module.exports = router;
