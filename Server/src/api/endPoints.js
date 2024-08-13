const express = require('express');
const router = express.Router();
const {login} = require('../controllers/loginController');
const { ping } = require('../controllers/pingController');
const { getUsername } = require('../controllers/userController');

router.get('/ping', ping);
router.post('/login', login);
router.get('/username/:email', getUsername);


module.exports = router;