const connection = require('../models/db.js');

module.exports.login = (req,res) =>{
    const {email, password} = req.body;
    const user = req.body;
    console.log(user);
}

