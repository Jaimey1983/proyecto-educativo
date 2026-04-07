const connectDB = require('./config/db');

require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');

// Crear la app de Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Permite leer datos JSON en las solicitudes

// Conexión a MongoDB
connectDB();

// Ruta básica para verificar que el servidor funciona
app.get('/api/ping', (req, res) => {
  res.send({ message: '¡El servidor está funcionando!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const actividadRoutes = require('./routes/actividadRoute');
app.use('/api/actividades', actividadRoutes);

const userRoutes = require('./routes/userRoute');
// Usar las rutas
app.use('/api/users', userRoutes);

