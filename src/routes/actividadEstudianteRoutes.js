const express = require('express');
const router = express.Router();
const actividadEstudianteController = require('../controllers/actividadEstudianteController');

router.get('/', actividadEstudianteController.obtenerActividadesDelEstudiante);

module.exports = router;
