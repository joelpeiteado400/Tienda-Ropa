import React from "react";
import { useState } from "react";
const Login = () =>{


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handdleLogin = (e)  =>{
        e.preventDefault();
        const data = {
            email:email,
            password:password,
            
        }
        fetch('http://localhost:3000/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
         .then(response => response.json())
         .then(result => {
            console.log(result)
         })
         .catch(error => console.log(error))

        
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    return(
        <div className="flex flex-col items-center" >
            <h1 className="font-bold text-2xl mb-4 ml-4 mt-2">Iniciar Sesion</h1>
            <form className=" border-b-2 border-[#F0F0F0] flex flex-col pl-4 pr-4 w-full">
            <div className="flex flex-col items-center w-auto">
             <div className="w-[80%] mb-4">
                <label className=" block font-semibold mb-2 text-black text-left">Email:</label>
                <input 
                  onChange={handleEmailChange} 
                  placeholder="email" 
                  className=" w-full h-9 custom-input border-2 rounded-md border-gray-400" 
                  type="text"
                />
                </div>
             <div className="w-[80%] mb-4">
               <label className="block font-semibold mb-2 text-black text-left">Contraseña:</label>
               <input 
               onChange={handlePasswordChange} 
               placeholder="password" 
               className="rounded-md w-full h-9 custom-input border-2 border-gray-400" 
               type="password"
              />
              </div>
            </div>
                <div className="flex justify-center">
                <button onClick={handdleLogin} className="rounded-full w-[50vh] h-12 ml-20 mr-20 p-2 mt-4 text-white bg-blue-500 font-semibold   " >Iniciar sesión</button>
                </div>

                <h1 className="flex mt-2 mb-2 justify-center" >¿No tenés cuenta aún? <span className="underline ml-2"><a>Crear cuenta</a></span></h1>
            </form>
        </div>
    );
}

export default Login;