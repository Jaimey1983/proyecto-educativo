const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe.' });

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const user = await User.create({ name, email, password: hashedPassword, role });

    res.status(201).json({ message: 'Usuario registrado con éxito.', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario.', error });
  }
};

// Inicio de sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Validar que se envíen los campos necesarios
    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    // Buscar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET, // Clave secreta almacenada en .env
      { expiresIn: '1d' } // Duración del token
    );

    res.status(200).json({ 
      message: 'Inicio de sesión exitoso.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },    
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor.', 
      error: error.message || error, });
  }
};

// Perfil del usuario
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Supongamos que el middleware de autenticación ya añadió esto
    const user = await User.findById(userId).select('-password'); // Excluir la contraseña

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil del usuario.', error });
  }
};

// Controlador para listar todos los usuarios
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, name } = req.query;

    // Filtros dinámicos
    const filters = {};
    if (role) filters.role = role;
    if (name) filters.name = { $regex: name, $options: 'i' }; // Búsqueda parcial e insensible a mayúsculas

    // Calcular el número de documentos a saltar
    const skip = (page - 1) * limit;

    // Buscar usuarios con filtros, paginación y excluir passwords
    const users = await User.find(filters, '-password')
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    // Contar el total de documentos que cumplen los filtros
    const total = await User.countDocuments(filters);

    res.status(200).json({
      message: 'Usuarios obtenidos con éxito.',
      users,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      message: 'Error al obtener usuarios.',
      error: error.message || error,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers
};

