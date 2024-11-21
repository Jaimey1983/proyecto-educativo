const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
        enum: ['quiz', 'video', 'flashcard', 'encuesta'], // Tipos posibles de actividad
    },
    descripcion: {
        type: String,
        required: true,
    },
    datos: {
        type: Object, // Detalles específicos según el tipo de actividad
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Activities', actividadSchema);

