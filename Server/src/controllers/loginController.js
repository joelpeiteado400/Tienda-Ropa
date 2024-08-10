const connection = require('../models/db.js');
const jwt = require('jsonwebtoken');



module.exports.login = (req,res) =>{
    const {email, password} = req.body;
    
    const consult ='SELECT * FROM login WHERE email = ? AND password = ? '

    try {
        connection.query(consult,[email,password],(err,result) =>{
            if(err){
                res.send(err);
            }
            if(result.length > 0){
                const token = jwt.sign({email},"Stack",{
                   expiresIn:'10s' 
                });
                
                res.send({token})

            } else{
                console.log('wrong user');
                res.send({message:'wrong user'})
            }
        })
    }catch(e){

    }
};

