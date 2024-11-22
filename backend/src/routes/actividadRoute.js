const express = require('express');

// const { getQuizzes } = require('../controllers/quizController');
// const { protect } = require('../middlewares/middleware');

const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/authenticate');
const { createActividad, getActividadById, updateActivities, deleteActivity, listActivities} = require('../controllers/actividadController');
//const  = require('../controllers/actividadController');
//const authenticate = require('../middlewares/authenticate'); // Middleware para proteger rutas
//const { getQuizById } = require('../controllers/quizController');


// Ruta para crear un quiz (solo para profesores)
router.post('/', authenticate, authorizeRoles('teacher'));
router.post('/crear-actividad', authenticate, createActividad );
router.get('/mis-actividades', authenticate, listActivities);
router.get('/listar-actividad/:id', authenticate, getActividadById);
router.put('/actualizar-actividad/:id', authenticate, updateActivities); // Actualizar actividad
router.delete('/eliminar-actividad/:id', authenticate, deleteActivity); 


module.exports = router;
