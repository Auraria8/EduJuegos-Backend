require('dotenv').config(); // Carga .env desde la raíz
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // 💡 si lo tienes definido en .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('❌ Error de conexión a MySQL:', err);
    } else {
        console.log('✅ Conectado a la base de datos MySQL');
    }
});

module.exports = db;
