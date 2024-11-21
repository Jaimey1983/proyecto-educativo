/*const express = require('express');
const router = express.Router();
const { autenticate } = require('../middlewares');

// Ruta de prueba para autenticación
router.get('/', autenticate);
router.get('/login', (req, res) => {
  res.send('Ruta de inicio de sesión');
});

module.exports = router; 

const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController'); // Importa el controlador
const { authenticate } = require('../middlewares'); // Importa el middleware de validación


router.post('/register', authControl.registerUser);// Ruta para registrar usuarios
router.post('/login', authControl.loginUser); // Ruta para iniciar sesión
router.get('/profile', authenticate, authControl.getProfile); // Ruta protegida de prueba (requiere token)

module.exports = router; */