import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMensage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMensage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                email,
                nombreUsuario,
                password,
            });

            if (response.status === 201) {
                
                navigate('/login'); // Redirige al login después de un registro exitoso
            }
        } catch (error) {
            if (error.response && error.response.status === 409){
                setErrorMensage(error.response.data.message);
            } else {
                setErrorMensage('Direccion de correo electrónico ya existe.');
            }
        }
    };

    return (
        <div className="w-auto bg-white ml-6 mr-6 mt-6 mb-6 flex flex-col items-center">
            <h1 className="font-bold text-2xl mb-4 ml-4 mt-2">Cuenta Nueva</h1>
            <form onSubmit={handleSubmit} className="border-b-2 border-[#F0F0F0] flex flex-col pl-4 pr-4 w-full">
                <div className="flex flex-col items-center w-auto">
                    <div className="w-[80%] mb-4">
                        <label className="block font-semibold mb-2 text-black text-left">Email:</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-9 custom-input border-2 rounded-md border-gray-400" 
                            required
                        />
                    </div>

                    <div className="w-[80%] mb-4">
                        <label className="block font-semibold mb-2 text-black text-left">Nombre De Usuario:</label>
                        <input 
                            type="text"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            className="w-full h-9 custom-input border-2 rounded-md border-gray-400" 
                            required
                        />
                    </div>

                    <div className="w-[80%] mb-4">
                        <label className="block font-semibold mb-2 text-black text-left">Contraseña:</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-9 custom-input border-2 rounded-md border-gray-400" 
                            required
                        />
                    </div>

                    <div className="w-[80%] mb-4">
                        <label className="block font-semibold mb-2 text-black text-left">Confirmar Contraseña:</label>
                        <input 
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-9 custom-input border-2 rounded-md border-gray-400" 
                            required
                        />
                    </div>
                        {errorMessage &&(
                            <div className="w-[80%] mb-4 text-red-600 text-center font-semibold">
                                {errorMessage}    
                             </div>
                        )}

                    <label>
                        <input
                            type="checkbox"
                            className="mr-2"
                            required
                            onInvalid={(e) => e.target.setCustomValidity('Por favor, acepta los términos y condiciones para continuar.')}
                            onInput={(e) => e.target.setCustomValidity('')}
                        />
                        Acepto los <Link to="/terms" className="underline" target="_blank" rel="noopener noreferrer">términos y condiciones</Link>
                    </label>
                </div>

                <div className="flex justify-center mb-4">
                    <button className="rounded-full w-[50vh] h-12 ml-20 mr-20 p-2 mt-4 text-white bg-blue-500 font-semibold">
                        Crear Cuenta
                    </button>
                </div>
                <h1 className="flex mb-2 justify-center">¿Ya tenes cuenta? <span className="underline ml-2"><Link to="/login">Iniciar Sesion</Link></span></h1>
            </form>
        </div>
    );
}

export default Registro;
