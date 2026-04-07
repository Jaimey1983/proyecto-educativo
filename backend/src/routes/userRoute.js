const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { registerUser, loginUser, getUserProfile, getUsers } = require('../controllers/userController');
const { authenticate, authorizeRoles }  = require('../middlewares/authenticate');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login attempts per window
  message: { message: 'Demasiados intentos de inicio de sesión. Inténtelo de nuevo más tarde.' },
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { message: 'Demasiadas solicitudes. Inténtelo de nuevo más tarde.' },
});

// Rutas
router.post('/register', generalLimiter, registerUser);  // Registro de usuarios
router.post('/login', loginLimiter, loginUser);        // Inicio de sesión
router.get('/profile', generalLimiter, authenticate, getUserProfile); // Perfil del usuario
router.get('/', authenticate, authorizeRoles('admin'), getUsers); // Ahora esta ruta está protegida


module.exports = router;
