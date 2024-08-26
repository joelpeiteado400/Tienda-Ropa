// controllers/BuscarProducto.js
const connection = require('../models/db.js');

const buscarProducto = (req, res) => {
    const { nombre } = req.query;

    if (!nombre) {
        return res.status(400).json({ message: 'El nombre es requerido' });
    }

    const queryProducto = `SELECT * FROM productos WHERE nombre LIKE ? LIMIT 10`;

    connection.query(queryProducto, [`%${nombre}%`], (err, productos) => {
        if (err) {
            console.error('Error al buscar productos:', err);
            return res.status(500).json({ message: 'Error al buscar productos', error: err.message });
        }

        if (productos.length > 0) {
            const producto = productos[0];
            const tamanosQuery = `SELECT tamano, stock FROM tamanos WHERE producto_id = ?`;

            connection.query(tamanosQuery, [producto.id], (err, tamanos) => {
                if (err) {
                    console.error('Error al buscar tamaños:', err);
                    return res.status(500).json({ message: 'Error al buscar tamaños', error: err.message });
                }
                res.status(200).json({ ...producto, tamanos });
            });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    });
};

module.exports = { buscarProducto };

