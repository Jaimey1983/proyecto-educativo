const mongoose = require('mongoose');


// Definición del esquema para los usuarios
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['teacher', 'student','admin'],
    default: 'teacher',
  },
}, {
  timestamps: true, // Añade automáticamente createdAt y updatedAt
});

// Creación del modelo basado en el esquema
const User = mongoose.model('User', userSchema);

module.exports = User;

