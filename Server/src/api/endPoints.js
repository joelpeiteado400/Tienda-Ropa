const express = require('express');
const router = express.Router();
const {login} = require('../controllers/loginController');
const { ping } = require('../controllers/pingController');
const {register} = require('../controllers/registerController');
const {agregarProducto, actualizarProducto, eliminarProducto} = require('../controllers/ProductController');
const {buscarProducto} = require('../controllers/BuscarProducto');
const {obtenerSugerencias} = require('../controllers/SugerenciasController');


 

router.get('/ping', ping);
router.post('/login', login);
router.post('/register',register);
router.post('/productos', agregarProducto); 
router.get ('/buscar', buscarProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);
router.get('/sugerencias', obtenerSugerencias);



module.exports = router;