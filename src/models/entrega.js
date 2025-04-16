// src/models/entrega.js
const db = require('../config/db');

const Entrega = {
    crear: (id_estudiante, id_actividad, contenido, fecha_entrega, callback) => {
        const sql = `INSERT INTO entregas (id_estudiante, id_actividad, contenido, fecha_entrega) VALUES (?, ?, ?, ?)`;
        db.query(sql, [id_estudiante, id_actividad, contenido, fecha_entrega], callback);
    },

    obtenerPorEstudiante: (id_estudiante, callback) => {
        const sql = `SELECT * FROM entregas WHERE id_estudiante = ?`;
        db.query(sql, [id_estudiante], callback);
    },

    obtenerTodas: (callback) => {
        const sql = `SELECT * FROM entregas`;
        db.query(sql, callback);
    }
};

module.exports = Entrega;
