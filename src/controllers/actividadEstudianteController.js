const jwt = require('jsonwebtoken');
const ActividadEstudiante = require('../models/actividadEstudiante');

exports.obtenerActividadesDelEstudiante = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const idEstudiante = decoded.id;

        ActividadEstudiante.obtenerPorEstudiante(idEstudiante, (err, results) => {
            if (err) return res.status(500).json({ mensaje: 'Error al obtener actividades' });
            res.json(results);
        });
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};
