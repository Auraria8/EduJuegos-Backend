// src/models/estudiante.js
const db = require('../config/db');

const Estudiante = {
    // Registrar estudiante (usado por docentes para crear)
    crear: (nombre, edad, grado, id_docente, callback) => {
        const sql = `INSERT INTO estudiantes (nombre, edad, grado, id_docente) VALUES (?, ?, ?, ?)`;
        db.query(sql, [nombre, edad, grado, id_docente], callback);
    },

    // Registrar estudiante con email y contraseña (registro propio)
    crearConCredenciales: (nombre, edad, grado, email, password, callback) => {
        const sql = `INSERT INTO estudiantes (nombre, edad, grado, email, password) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [nombre, edad, grado, email, password], callback);
    },

    // Buscar por correo electrónico (para login)
    buscarPorEmail: (email, callback) => {
        const sql = `SELECT * FROM estudiantes WHERE email = ?`;
        db.query(sql, [email], callback);
    },

    obtenerTodos: (callback) => {
        const sql = `SELECT * FROM estudiantes`;
        db.query(sql, callback);
    },

    obtenerPorId: (id, callback) => {
        const sql = `SELECT * FROM estudiantes WHERE id = ?`;
        db.query(sql, [id], callback);
    },

    actualizar: (id, nombre, edad, grado, callback) => {
        const sql = `UPDATE estudiantes SET nombre = ?, edad = ?, grado = ? WHERE id = ?`;
        db.query(sql, [nombre, edad, grado, id], callback);
    },

    eliminar: (id, callback) => {
        const sql = `DELETE FROM estudiantes WHERE id = ?`;
        db.query(sql, [id], callback);
    }
};

module.exports = Estudiante;
