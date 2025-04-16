// src/routes/estudianteRoutes.js
const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');
const { verificarToken } = require('../middlewares/authMiddleware');

// 🔹 CRUD desde el rol docente
router.post('/', verificarToken, estudianteController.crearEstudiante);
router.get('/', verificarToken, estudianteController.obtenerEstudiantes);
router.get('/:id', verificarToken, estudianteController.obtenerEstudiantePorId);
router.put('/:id', verificarToken, estudianteController.actualizarEstudiante);
router.delete('/:id', verificarToken, estudianteController.eliminarEstudiante);

// 🔹 Registro y Login del estudiante (sin necesidad de token al inicio)
router.post('/register', estudianteController.registrarEstudiante);
router.post('/login', estudianteController.loginEstudiante);

// 🔹 Perfil autenticado del estudiante
router.get('/perfil', verificarToken, estudianteController.obtenerPerfilEstudiante);

module.exports = router;

