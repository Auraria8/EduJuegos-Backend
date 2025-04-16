// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// 🔐 Verificación para docentes
exports.verificarToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado' });
    }

    try {
        const tokenSinBearer = token.replace("Bearer ", "");
        const verificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
        req.docente = verificado;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: 'Token no válido' });
    }
};

// 🔐 Verificación para estudiantes
exports.verificarTokenEstudiante = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado' });
    }

    try {
        const tokenSinBearer = token.replace("Bearer ", "");
        const verificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
        req.user = verificado; // estudiante
        next();
    } catch (error) {
        res.status(400).json({ mensaje: 'Token no válido' });
    }
};
