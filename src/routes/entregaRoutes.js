const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entregaController');
const { verificarTokenEstudiante } = require('../middlewares/authMiddleware');

router.post('/', verificarTokenEstudiante, entregaController.crearEntrega);
router.get('/', verificarTokenEstudiante, entregaController.obtenerEntregasEstudiante);

module.exports = router;
