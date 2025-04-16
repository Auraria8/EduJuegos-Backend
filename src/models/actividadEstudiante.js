const db = require('../config/db');

const ActividadEstudiante = {
    obtenerPorEstudiante: (idEstudiante, callback) => {
        const sql = `
            SELECT actividades.*
            FROM actividades
            JOIN estudiantes ON actividades.id_docente = estudiantes.id_docente
            WHERE estudiantes.id = ?
        `;
        db.query(sql, [idEstudiante], callback);
    }
};

module.exports = ActividadEstudiante;
