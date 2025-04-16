const db = require('../config/db');

const Resultado = {
    crear: (id_estudiante, id_actividad, calificacion, comentarios, callback) => {
        const sql = `INSERT INTO resultados (id_estudiante, id_actividad, calificacion, comentarios) VALUES (?, ?, ?, ?)`;
        db.query(sql, [id_estudiante, id_actividad, calificacion, comentarios], callback);
    },

    obtenerTodos: (callback) => {
        const sql = `SELECT * FROM resultados`;
        db.query(sql, callback);
    },

    obtenerPorId: (id, callback) => {
        const sql = `SELECT * FROM resultados WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    actualizar: (id, calificacion, comentarios, callback) => {
        const sql = `UPDATE resultados SET calificacion = ?, comentarios = ? WHERE id = ?`;
        db.query(sql, [calificacion, comentarios, id], callback);
    },

    eliminar: (id, callback) => {
        const sql = `DELETE FROM resultados WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    obtenerPorEstudiante: (id_estudiante, callback) => {
        const sql = `
            SELECT r.*, a.nombre AS nombre_actividad
            FROM resultados r
            JOIN actividades a ON r.id_actividad = a.id
            WHERE r.id_estudiante = ?
        `;
        db.query(sql, [id_estudiante], callback);
    }
};

module.exports = Resultado;
