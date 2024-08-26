const connection = require('../models/db.js');

module.exports.register = async (req, res) => {
    const { email, nombreUsuario, password , rol } = req.body;

    try {
        // Verificar si el email ya está registrado
        const checkQuery = 'SELECT email FROM login WHERE email = ?';
        connection.query(checkQuery, [email], (err, result) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            if (result.length > 0) {
                return res.status(400).json({ message: 'El email ya está registrado' });
            }

            // Insertar el nuevo usuario en la base de datos (sin encriptación de la contraseña)
            const insertQuery = 'INSERT INTO login (email, nombreUsuario, password, rol) VALUES (?, ?, ?, ?)';
            connection.query(insertQuery, [email, nombreUsuario, password,rol || 'usuario'], (err, result) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }
                res.status(201).json({ message: 'Usuario registrado con éxito' });
            });
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
