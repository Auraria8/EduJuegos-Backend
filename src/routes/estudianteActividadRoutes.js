const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/authMiddleware');
const estudianteController = require('../controllers/estudianteController');

// ✅ Ruta para que el estudiante vea actividades asignadas por su docente
router.get('/actividades', verificarToken, estudianteController.verActividadesEstudiante);

module.exports = router;
