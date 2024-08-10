import React, { useEffect, useState } from "react";
import Inicio from './components/Inicio.jsx';
import Login from './components/Login/Login.jsx';
import { useAuth } from './context/AuthContext'; // Asegúrate de que AuthContext esté exportado y configurado correctamente

const Main = () => {
    const { token, setToken } = useAuth(); // Obtener el token y la función para actualizar el token del contexto
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const checkTokenValidity = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const payload = parseJwt(token);
                    if (payload.exp * 1000 > Date.now()) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                        localStorage.removeItem('token');
                        window.location.reload(); // Recargar la página
                    }
                } catch (e) {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                    window.location.reload(); // Recargar la página
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        checkTokenValidity();

        const interval = setInterval(checkTokenValidity, 60000); // Verificar cada minuto

        return () => clearInterval(interval);
    }, []);

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    return (
        <>
            {isLoggedIn ? <Inicio /> : <Login />}
        </>
    );
};

export default Main;
