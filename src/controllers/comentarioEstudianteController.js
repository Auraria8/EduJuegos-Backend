const Comentario = require('../models/comentario'); // ya está bien

exports.verComentariosEstudiante = (req, res) => {
    Comentario.obtenerTodos((err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al obtener comentarios' });
        }

        res.json(results);
    });
};


