const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

router.post('/register', estudianteController.registrarEstudiante);
router.post('/login', estudianteController.loginEstudiante);
router.get('/perfil', estudianteController.obtenerPerfilEstudiante);

module.exports = router;
