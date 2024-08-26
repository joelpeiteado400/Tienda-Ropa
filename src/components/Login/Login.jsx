import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem('token', result.token);
                    setToken(result.token);
                    setLoginSuccessful(true);
                    navigate('/'); // Redirigir al inicio o a la página deseada
                    window.location.reload();
                    
                } else {
                    setLoginSuccessful(false);
                    setErrorMessage('Correo o contraseña incorrectos.');
                }
            })
            .catch(error => console.log(error));
            setErrorMessage('Error en la conexión. Inténtalo de nuevo.');
    };

    return (
        <>
            {loginSuccessful ? <Inicio /> :
                <div className=" w-auto bg-white ml-6 mr-6 mt-6 mb-6 flex flex-col items-center">
                    <h1 className="font-bold text-2xl mb-4 ml-4 mt-2">Iniciar Sesion</h1>
                    <form className="border-b-2 border-[#F0F0F0] flex flex-col pl-4 pr-4 w-full">
                        <div className="flex flex-col items-center w-auto">
                            <div className="w-[80%] mb-4">
                                <label className="block font-semibold mb-2 text-black text-left">Email:</label>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Example@gmail.com"
                                    className="w-full h-9 custom-input border-2 rounded-md border-gray-400"
                                    type="email"
                                    value={email}
                                />
                            </div>
                            <div className="w-[80%] mb-4">
                                <label className="block font-semibold mb-2 text-black text-left">Contraseña:</label>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="rounded-md w-full h-9 custom-input border-2 border-gray-400"
                                    type="password"
                                    value={password}
                                />
                            </div>
                            {errorMessage && (
                                <div className="w-[80%] mb-4 text-red-600 text-center font-semibold">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleLogin} className="rounded-full w-[50vh] h-12 ml-20 mr-20 p-2 mt-4 text-white bg-blue-500 font-semibold">Iniciar sesión</button>
                        </div>
                        <h1 className="flex mt-2 mb-2 justify-center">¿No tenés cuenta aún? <span className="underline ml-2"><Link to="/registro">Crear cuenta</Link></span></h1>
                    </form>
                </div>
            }
        </>
    );
}

export default Login;
