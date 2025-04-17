const Comentario = require('../models/Comentario');


exports.verComentariosEstudiante = (req, res) => {
    const id_estudiante = req.user.id;

    comentario.obtenerPorEstudiante(id_estudiante, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al obtener comentarios' });
        }

        res.json(results);
    });
};

