import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'mariadb',
    database: 'blog_comida_uvg',
    password: '116611',
});

export default pool;