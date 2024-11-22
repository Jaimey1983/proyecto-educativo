const Actividadd = require('../models/actividadModel');


const createActividad = async (req, res) => {
try {
    const { nombre, descripcion, tipo, datos } = req.body;

    // Validar campos obligatorios
    if (!nombre || !tipo) {
      return res.status(400).json({ message: 'El título y el tipo de actividad son obligatorios.' });
    }

    // Verificar que req.user esté definido
    if (!req.createdBy) {
      return res.status(401).json({ message: 'Usuario no autenticado.' });
    }

    // Crea el quiz con el campo `createdBy`
    const actividad = await Actividadd.create({
        nombre,
        descripcion,
        datos,
        tipo,
        createdBy: req.createdBy, // ID del usuario autenticado
      });

    const savedActividad = await actividad.save();
    res.status(201).json({ message: 'Actividad creada exitosamente.', actividad: savedActividad });
  } catch (error) {
    console.error('Error al crear la actividad:', error);
    res.status(500).json({ message: 'Error al crear la actividad.', error });
  } 
    

};
/*
const getActividad = async (req, res) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
  
      // Crear el filtro de búsqueda
      const query = {
        title: { $regex: search, $options: 'i' }, // Búsqueda insensible a mayúsculas
      };
  
      // Paginar los resultados
      const actividad = await Actividadd.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      // Contar el total de documentos para la paginación
      const total = await Actividadd.countDocuments(query);
  
      res.status(200).json({
        success: true,
        data: actividad,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          totalActividades: total,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener la actividad',
        error: error.message,
      });
    }
  }; */

  const listActivities = async (req, res) => {
    try {
        const actividades = await Actividadd.find({ createdBy: req.createdBy });
        res.status(200).json(actividades);
    } catch (error) {
        console.error('Error al listar actividades:', error);
        res.status(500).json({ error: 'Error al listar actividades' });
    }
};

  // src/controllers/quizController.js

const getActividadById = async (req, res) => {
    try {
        const actv = await Actividadd.findById(req.params.id).populate('createdBy', 'name email'); // Incluye detalles del creador
        if (!actv) {
            return res.status(404).json({ success: false, message: 'Actividad no encontrada.' });
        }
        res.status(200).json({ success: true, data: actv });
    } catch (error) {
        console.error('Error al obtener el la actividad:', error);
        res.status(500).json({ success: false, message: 'Error al obtener la actividad.', error });
    }
};

const updateActivities = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, descripcion, datos } = req.body;

  try {
      const updatedActivity = await Actividadd.findOneAndUpdate(
          { _id: id, createdBy: req.createdBY }, // Verificar que la actividad pertenece al usuario autenticado
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
  //const { nombre, tipo, descripcion, datos } = req.body;

  try {
      const activityDeleted = await Actividadd.findOneAndDelete(
        { _id: id, createdBy: req.createBY }, // Verificar que la actividad pertenece al usuario autenticado
       
       
      );

      if (!activityDeleted) {
          return res.status(404).json({ error: 'Actividad no encontrada' });
      }

      res.status(200).json({ message: 'Actividad eliminada con éxito', actividad: activityDeleted });
  } catch (error) {
      console.error('Error al eliminar actividad:', error);
      res.status(500).json({ error: 'Error al eliminar actividad' });
  }
};



module.exports = { createActividad, getActividadById, updateActivities, deleteActivity, listActivities  };
