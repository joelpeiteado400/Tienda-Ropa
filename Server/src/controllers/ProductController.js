
const connection = require('../models/db.js');

const agregarProducto = (req, res) => {
    const { nombre, descripcion, categoria, color, precio, tamanos } = req.body;
    console.log('Datos recibidos en agregarProducto:', { nombre, descripcion, categoria, color, precio, tamanos });
    const queryProducto = `INSERT INTO productos (nombre, descripcion, categoria, color, precio) VALUES (?, ?, ?, ?, ?)`;

    connection.query(queryProducto, [nombre, descripcion, categoria, color, precio], (err, result) => {
        if (err) {
            console.error('Error al insertar producto:', err);
            res.status(500).json({ message: 'Error al insertar producto', error: err.message });
            return;
        }

        const productoId = result.insertId;

        if (tamanos && tamanos.length > 0) {
            const tamanosQuery = `INSERT INTO tamanos (producto_id, tamano, stock) VALUES ?`;
            const tamanosValues = tamanos.map(t => [productoId, t.tamano, t.stock]);

            connection.query(tamanosQuery, [tamanosValues], (err, result) => {
                if (err) {
                    console.error('Error al insertar tamaños:', err);
                    res.status(500).json({ message: 'Error al insertar tamaños', error: err.message });
                    return;
                }
                res.status(201).json({ message: 'Producto y tamaños agregados correctamente', productoId });
            });
        } else {
            res.status(201).json({ message: 'Producto agregado correctamente', productoId });
        }
    });
};

const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria, color, precio, tamanos } = req.body;

    const queryProducto = `UPDATE productos SET nombre = ?, descripcion = ?, categoria = ?, color = ?, precio = ? WHERE id = ?`;

    connection.query(queryProducto, [nombre, descripcion, categoria, color, precio, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            res.status(500).json({ message: 'Error al actualizar producto', error: err.message });
            return;
        }

        // Eliminar tamaños existentes
        const deleteTamanosQuery = `DELETE FROM tamanos WHERE producto_id = ?`;

        connection.query(deleteTamanosQuery, [id], (err) => {
            if (err) {
                console.error('Error al eliminar tamaños:', err);
                res.status(500).json({ message: 'Error al eliminar tamaños', error: err.message });
                return;
            }

            // Insertar nuevos tamaños
            if (tamanos && tamanos.length > 0) {
                const tamanosQuery = `INSERT INTO tamanos (producto_id, tamano, stock) VALUES ?`;
                const tamanosValues = tamanos.map(t => [id, t.tamano, t.stock]);

                connection.query(tamanosQuery, [tamanosValues], (err) => {
                    if (err) {
                        console.error('Error al insertar tamaños:', err);
                        res.status(500).json({ message: 'Error al insertar tamaños', error: err.message });
                        return;
                    }
                    res.status(200).json({ message: 'Producto y tamaños actualizados correctamente' });
                });
            } else {
                res.status(200).json({ message: 'Producto actualizado correctamente' });
            }
        });
    });
};
const eliminarProducto = (req, res) => {
    const productoId = req.params.id;

    connection.query('DELETE FROM productos WHERE id = ?', [productoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            return res.status(500).json({ error: 'Error al eliminar producto' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado correctamente' });
    });
};

module.exports = { agregarProducto, actualizarProducto, eliminarProducto  };
