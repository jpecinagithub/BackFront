const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes'); // Importar las rutas
const db = require('./db'); // Asegurar la conexión a la base de datos

//El error que estás viendo es causado por una política de seguridad de los navegadores conocida como CORS 
//(Cross-Origin Resource Sharing). Esta política impide que una aplicación en un dominio (como http://localhost:4200) 
//acceda a recursos en otro dominio (como http://localhost:3000) sin la autorización adecuada.

const cors = require('cors');

// Middleware para procesar datos JSON
//app.use(express.json());
app.use(cors());

// Rutas base de la API
app.get('/', (req, res) => {
  res.send('API de Express con MySQL');
});



// Usar las rutas definidas
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});