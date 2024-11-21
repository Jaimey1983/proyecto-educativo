const Activities = require('../models/actividadModel');

// Crear una nueva actividad
const createActivity = async (req, res) => {
    const { nombre, tipo, descripcion, datos } = req.body;
    try {
        const newActividad = new Activities({
            nombre,
            tipo,
            descripcion,
            datos,
            userId: req.userId, // Obtenido del middleware authenticate
        });

        const savedActivity = await newActividad.save();
        res.status(201).json({ message: 'Actividad creada con éxito', actividad: savedActivity });
    } catch (error) {
        console.error('Error al guardar actividad:', error);
        res.status(500).json({ error: 'Error al guardar actividad' });
    }
};

// Listar actividades del usuario autenticado
 const listActivities = async (req, res) => {
    try {
        const actividades = await Activities.find({ userId: req.userId });
        res.status(200).json(actividades);
    } catch (error) {
        console.error('Error al listar actividades:', error);
        res.status(500).json({ error: 'Error al listar actividades' });
    }
};

// Actualizar una actividad
const updateActivities = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, descripcion, datos } = req.body;

    try {
        const updatedActivity = await Activities.findOneAndUpdate(
            { _id: id, userId: req.userId }, // Verificar que la actividad pertenece al usuario autenticado
            { nombre, tipo, descripcion, datos },
            { new: true } // Retorna el documento actualizado
        );

        if (!updatedActivity) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        res.status(200).json({ message: 'Actividad actualizada con éxito', actividad: updatedActivity });
    } catch (error) {
        console.error('Error al actualizar actividad:', error);
        res.status(500).json({ error: 'Error al actualizar actividad' });
    }
};

// Eliminar una actividad
const deleteActivity = async (req, res) => {
    const { id } = req.params;

    try {
        const activityDeleted = await Activities.findOneAndDelete({
            _id: id,
            userId: req.userId, // Verificar que la actividad pertenece al usuario autenticado
        });

        if (!activityDeleted) {
            return res.status(404).json({ error: 'Actividad no encontrada' });
        }

        res.status(200).json({ message: 'Actividad eliminada con éxito', actividad: activityDeleted });
    } catch (error) {
        console.error('Error al eliminar actividad:', error);
        res.status(500).json({ error: 'Error al eliminar actividad' });
    }
};

module.exports = { createActivity, listActivities, updateActivities, deleteActivity };
