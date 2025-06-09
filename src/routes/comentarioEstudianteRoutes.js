const express = require('express'); 
const router = express.Router();
const comentarioEstudianteController = require('../controllers/comentarioEstudianteController');

// ⛔ Sin middleware de token
router.get('/', comentarioEstudianteController.verComentariosEstudiante);

module.exports = router;
