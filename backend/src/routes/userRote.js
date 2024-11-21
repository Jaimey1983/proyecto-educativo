const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');


// Define la ruta y asigna la función del controlador
router.post('/register', userController.createUser); // Registrar usuario
router.post('/login', userController.loginUser);       // Iniciar sesión
router.get('/profile', authenticate, userController.getUserProfile); // Obtener perfil del usuario autenticado
module.exports = router;
