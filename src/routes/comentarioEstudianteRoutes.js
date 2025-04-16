const express = require('express');
const router = express.Router();
const comentarioEstudianteController = require('../controllers/comentarioEstudianteController');
const { verificarTokenEstudiante } = require('../middlewares/authMiddleware');

router.get('/', verificarTokenEstudiante, comentarioEstudianteController.verComentariosEstudiante);

module.exports = router;
