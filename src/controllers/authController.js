const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Docente = require('../models/Docente');  // ✅ Corregido: "Docente" con D mayúscula

exports.registrarDocente = (req, res) => {
    const { nombre, email, password } = req.body;

    // Validar que todos los campos estén completos
    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Verificar si el docente ya está registrado
    Docente.buscarPorEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error: err });
        }
        if (results.length > 0) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // Cifrar la contraseña
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error al cifrar la contraseña', error: err });
            }

            // Guardar el docente en la base de datos
            Docente.crear(nombre, email, hash, (err) => {
                if (err) {
                    return res.status(500).json({ mensaje: 'Error al registrar el docente', error: err });
                }
                res.status(201).json({ mensaje: 'Docente registrado exitosamente' });
            });
        });
    });
};

exports.loginDocente = (req, res) => {
    const { email, password } = req.body;

    // Buscar docente en la base de datos
    Docente.buscarPorEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error en el servidor', error: err });
        }
        if (results.length === 0) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        const docente = results[0];

        // Comparar la contraseña ingresada con la cifrada
        bcrypt.compare(password, docente.password, (err, esCorrecto) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error al verificar la contraseña', error: err });
            }
            if (!esCorrecto) {
                return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
            }

            // Generar token JWT
            const token = jwt.sign(
                { id: docente.id, nombre: docente.nombre, email: docente.email },
                process.env.JWT_SECRET,
                { expiresIn: '11h' }
            );

            res.json({ mensaje: 'Login exitoso', token });
        });
    });
};

// ✅ Nueva función para obtener los datos del docente autenticado
exports.obtenerPerfil = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: "No se proporcionó un token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ id: decoded.id, nombre: decoded.nombre, email: decoded.email });
    } catch (error) {
        res.status(401).json({ mensaje: "Token inválido", error });
    }
};

