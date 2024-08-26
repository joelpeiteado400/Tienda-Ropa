const connection = require('../models/db.js'); // Ajusta la ruta si es necesario

const obtenerSugerencias = (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    const sql = 'SELECT * FROM productos WHERE nombre LIKE ? LIMIT 5';
    connection.query(sql, [`%${query}%`], (error, results) => {
        if (error) {
            console.error('Error fetching suggestions:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
};

module.exports = { obtenerSugerencias };

