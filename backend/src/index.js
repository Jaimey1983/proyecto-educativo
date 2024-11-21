require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite acceso desde el frontend
app.use(express.json()); // Permite trabajar con datos en formato JSON

app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor backend!');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const actividadRoutes = require('./routes/actividadRoute');
app.use('/api/actividades', actividadRoutes)

// Servidor escuchando en el puerto indicado

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);

});
