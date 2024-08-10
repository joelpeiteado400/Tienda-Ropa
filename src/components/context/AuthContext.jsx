// src/components/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate(); // Asegúrate de que `useNavigate` esté importado

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = parseJwt(storedToken);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setLoginSuccessful(true);
                    setToken(storedToken); // Establece el token en el estado
                    startTokenExpirationTimer(decodedToken.exp * 1000 - Date.now());
                } else {
                    localStorage.removeItem('token');
                }
            } catch (e) {
                localStorage.removeItem('token');
            }
        }
    }, []);
    const startTokenExpirationTimer = (expirationTime) => {
        setTimeout(() => {
            localStorage.removeItem('token');
            setLoginSuccessful(false);
            setToken(null);
            navigate('/login');
            window.location.reload(); // Recarga la página
        }, expirationTime);
    };

    const logOut = () => {
        localStorage.removeItem('token');
        setLoginSuccessful(false);
        setToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ loginSuccessful, setLoginSuccessful, token, setToken, logOut }}>
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
const storedToken = localStorage.getItem('token');
if (storedToken) {
    const decodedToken = parseJwt(storedToken);
    console.log('Token Expiration Time:', new Date(decodedToken.exp * 1000));
}

export const useAuth = () => useContext(AuthContext);
