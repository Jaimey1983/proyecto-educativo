const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Esquema de usuario
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
    rol: {
        type: String,
        enum: ['teacher', 'student', 'admin'], // Roles posibles
        default: 'teacher',
    },
    registerDay: {
        type: Date,
        default: Date.now,
    },
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para verificar la contraseña
userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Exportar modelo
module.exports = mongoose.model('User', userSchema);
