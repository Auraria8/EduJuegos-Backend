const Estudiante = require('../models/Estudiante');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// CRUD desde docente
exports.crearEstudiante = (req, res) => {
    const { nombre, edad, grado } = req.body;
    const id_docente = req.docente.id;

    if (!nombre || !edad || !grado) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    Estudiante.crear(nombre, edad, grado, id_docente, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al registrar el estudiante' });
        res.status(201).json({ mensaje: 'Estudiante registrado correctamente' });
    });
};

// 🔐 Registro propio del estudiante
exports.registrarEstudiante = (req, res) => {
    const { nombre, edad, grado, email, password } = req.body;

    if (!nombre || !edad || !grado || !email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    Estudiante.buscarPorEmail(email, (err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al buscar el correo' });

        if (results.length > 0) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ mensaje: 'Error al encriptar contraseña' });

            Estudiante.crearConCredenciales(nombre, edad, grado, email, hash, (err) => {
                if (err) return res.status(500).json({ mensaje: 'Error al registrar estudiante' });
                res.status(201).json({ mensaje: 'Estudiante registrado correctamente' });
            });
        });
    });
};

// 🔑 Login del estudiante
exports.loginEstudiante = (req, res) => {
    const { email, password } = req.body;

    Estudiante.buscarPorEmail(email, (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        const estudiante = results[0];

        bcrypt.compare(password, estudiante.password, (err, esCorrecto) => {
            if (!esCorrecto) {
                return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
            }

            const token = jwt.sign(
                { id: estudiante.id, nombre: estudiante.nombre, email: estudiante.email },
                process.env.JWT_SECRET,
                { expiresIn: '11h' }
            );

            res.json({ mensaje: 'Login exitoso', token });
        });
    });
};

// 👤 Perfil autenticado del estudiante
exports.obtenerPerfilEstudiante = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ mensaje: "No se proporcionó un token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ id: decoded.id, nombre: decoded.nombre, email: decoded.email });
    } catch (error) {
        res.status(401).json({ mensaje: "Token inválido" });
    }
};

// 🔄 Obtener todos los estudiantes
exports.obtenerEstudiantes = (req, res) => {
    Estudiante.obtenerTodos((err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener los estudiantes' });
        res.json(results);
    });
};

// 🔍 Obtener un estudiante por ID
exports.obtenerEstudiantePorId = (req, res) => {
    const { id } = req.params;

    Estudiante.obtenerPorId(id, (err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener el estudiante' });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.json(results[0]);
    });
};

// 📝 Actualizar un estudiante
exports.actualizarEstudiante = (req, res) => {
    const { id } = req.params;
    const { nombre, edad, grado } = req.body;

    Estudiante.actualizar(id, nombre, edad, grado, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar el estudiante' });
        res.json({ mensaje: 'Estudiante actualizado correctamente' });
    });
};

// 🗑️ Eliminar un estudiante
exports.eliminarEstudiante = (req, res) => {
    const { id } = req.params;

    Estudiante.eliminar(id, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar el estudiante' });
        res.json({ mensaje: 'Estudiante eliminado correctamente' });
    });
};
// 📘 Módulo 1: Ver actividades del estudiante
exports.verActividadesEstudiante = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: "Token no proporcionado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const estudianteId = decoded.id;

        // Primero obtenemos el id_docente del estudiante
        const sql = `SELECT id_docente FROM estudiantes WHERE id = ?`;
        const db = require('../config/db');

        db.query(sql, [estudianteId], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ mensaje: "Estudiante no encontrado" });
            }

            const id_docente = results[0].id_docente;

            const sqlActividades = `SELECT * FROM actividades WHERE id_docente = ?`;
            db.query(sqlActividades, [id_docente], (err, actividades) => {
                if (err) return res.status(500).json({ mensaje: 'Error al obtener actividades' });
                res.json(actividades);
            });
        });

    } catch (error) {
        res.status(401).json({ mensaje: "Token inválido" });
    }
};


