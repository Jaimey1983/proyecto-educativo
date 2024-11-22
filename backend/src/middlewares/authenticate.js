const jwt = require('jsonwebtoken');


// Middleware de autenticación

const authenticate = async (req, res, next) => {
    try {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No autorizado. Token no proporcionado.' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.createdBy = decoded.id; // Añade los datos del usuario al objeto `req`
    next(); // Permite que la solicitud continúe
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

// Middleware de control de roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado.' });
      }
      next(); // Permite continuar si el rol está autorizado
    };
  };

module.exports = { authenticate, authorizeRoles}
