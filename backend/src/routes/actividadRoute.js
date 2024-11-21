const express = require('express');
const router = express.Router();
const activityController = require('../controllers/actividadController');
const authenticate = require('../middlewares/authenticate'); // Middleware para proteger rutas

// Rutas de actividades
router.post('/crear-actividad', authenticate, activityController.createActivity);       // Crear actividad
router.get('/mis-actividades', authenticate, activityController.listActivities);     // Listar actividades del usuario autenticado
router.put('/actualizar-actividad/:id', authenticate, activityController.updateActivities); // Actualizar actividad
router.delete('/eliminar-actividad/:id', authenticate, activityController.deleteActivity);  // Eliminar actividad

module.exports = router;
