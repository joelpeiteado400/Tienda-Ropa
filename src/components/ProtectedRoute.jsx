import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
    const { loginSuccessful, rol } = useAuth();
    if (loginSuccessful === false && rol === null) {
        return null;  // O puedes mostrar un spinner de carga
    }

    if (!loginSuccessful || rol !== 'admin') {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

