const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Se requiere token.' });
  }

  try {
    const tokenLimpio = token.replace('Bearer ', ''); // En caso de que el token venga precedido por "Bearer "
    const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en la solicitud
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
