const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getUsers } = require('../controllers/userController');
const { authenticate, authorizeRoles }  = require('../middlewares/authenticate');
 

// Rutas
router.post('/register', registerUser);  // Registro de usuarios
router.post('/login', loginUser);        // Inicio de sesión
router.get('/profile', getUserProfile); // Perfil del usuario
router.get('/', authenticate, authorizeRoles('admin'), getUsers); // Ahora esta ruta está protegida


module.exports = router;
