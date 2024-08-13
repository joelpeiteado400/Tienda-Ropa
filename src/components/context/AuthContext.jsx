import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null); // Agrega estado para email
    const [nombreUsuario, setNombreusuario] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = parseJwt(storedToken);
                console.log("Decoded Token:", decodedToken);
    
                const expirationTime = decodedToken.exp * 1000 - Date.now();
                console.log("Expiration Time (ms):", expirationTime);
    
                if (expirationTime > 0) {
                    setLoginSuccessful(true);
                    setToken(storedToken);
                    setEmail(decodedToken.email); // Establece el email del token
                    setNombreusuario(decodedToken.nombreUsuario);
                    const timer = startTokenExpirationTimer(expirationTime);
                    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
                } else {
                    console.log("Token expired. Removing from storage.");
                    localStorage.removeItem('token');
                }
            } catch (e) {
                console.log("Error decoding token:", e);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const startTokenExpirationTimer = (expirationTime) => {
        return setTimeout(() => {
            console.log("Token has expired. Logging out...");
            localStorage.removeItem('token');
            setLoginSuccessful(false);
            setToken(null);
            setEmail(null); // Limpia el email al hacer logout
            setNombreusuario(null);
            navigate('/login');
            window.location.reload();
        }, expirationTime);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        setLoginSuccessful(false);
        setToken(null);
        setEmail(null); // Limpia el email al hacer logout
        setNombreusuario(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ loginSuccessful, setLoginSuccessful, token, setToken, email,nombreUsuario, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    return JSON.parse(jsonPayload);
};

export const useAuth = () => useContext(AuthContext);
