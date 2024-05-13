// Importa el módulo 'conn' desde el archivo './conn'. Este módulo probablemente contiene la configuración de conexión a la base de datos.
const pool = require('./conn');

// Función asincrónica que prueba la conexión a la base de datos.
async function testConnection() {
  try {
    // Ejecuta una consulta para mostrar las tablas en la base de datos.
    const [rows, fields] = await pool.query('SHOW TABLES');
    // Muestra un mensaje de éxito y los datos recuperados (en este caso, las tablas).
    console.log('Conexión exitosa a la base de datos');
    console.log('Datos recuperados:', rows);
  } catch (error) {
    // Captura cualquier error que ocurra durante la conexión o la consulta.
    console.error('Error al conectar a la base de datos:', error);
  } finally {
    // Finaliza la conexión con la piscina de conexiones.
    pool.end();
  }
}

// Llama a la función testConnection para iniciar la prueba de conexión a la base de datos.
testConnection();