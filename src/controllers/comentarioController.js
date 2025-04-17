const Comentario = require('../models/Comentario');


exports.crearComentario = (req, res) => {
    const { id_estudiante, mensaje } = req.body;
    const id_docente = req.docente.id;

    if (!id_estudiante || !mensaje) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    comentario.crear(id_docente, id_estudiante, mensaje, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al registrar el comentario' });
        res.status(201).json({ mensaje: 'Comentario registrado correctamente' });
    });
};

exports.obtenerComentarios = (req, res) => {
    comentario.obtenerTodos((err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
        res.json(results);
    });
};

exports.obtenerComentarioPorId = (req, res) => {
    const { id } = req.params;

    comentario.obtenerPorId(id, (err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener el comentario' });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Comentario no encontrado' });
        res.json(results[0]);
    });
};

exports.actualizarComentario = (req, res) => {
    const { id } = req.params;
    const { mensaje } = req.body;

    comentario.actualizar(id, mensaje, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar el comentario' });
        res.json({ mensaje: 'Comentario actualizado correctamente' });
    });
};

exports.eliminarComentario = (req, res) => {
    const { id } = req.params;

    comentario.eliminar(id, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar el comentario' });
        res.json({ mensaje: 'Comentario eliminado correctamente' });
    });
};
