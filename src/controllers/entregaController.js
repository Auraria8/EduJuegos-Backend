const Entrega = require('../models/entrega');

exports.crearEntrega = (req, res) => {
    const { id_actividad, contenido, fecha_entrega } = req.body;
    const id_estudiante = req.user.id; // obtenido del token

    if (!id_actividad || !contenido || !fecha_entrega) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    Entrega.crear(id_estudiante, id_actividad, contenido, fecha_entrega, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al registrar la entrega' });
        res.status(201).json({ mensaje: 'Entrega registrada exitosamente' });
    });
};

exports.obtenerEntregasEstudiante = (req, res) => {
    const id_estudiante = req.user.id;

    Entrega.obtenerPorEstudiante(id_estudiante, (err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener entregas' });
        res.json(results);
    });
};
