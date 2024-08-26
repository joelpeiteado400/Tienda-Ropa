const connection = require('../models/db.js');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    console.log("Request received with email:", req.body.email);
  
    const { email, password } = req.body;
    const consult = 'SELECT email, password, nombreUsuario, rol FROM login WHERE email = ? AND password = ?';
  
    connection.query(consult, [email, password], (err, result) => {
      if (err) {
        console.error('Error en la consulta:', err);
        if (!res.headersSent) {
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
        return;
      }
  
      if (result.length > 0) {
        console.log('Usuario autenticado');
        const usuario = result[0];
        const token = jwt.sign({ email: usuario.email, nombreUsuario: usuario.nombreUsuario, rol: usuario.rol }, "Stack", { expiresIn: '10m' });
        return res.json({ token });
      } else {
        console.log('Usuario incorrecto');
        if (!res.headersSent) {
          return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
      }
    });
  };
