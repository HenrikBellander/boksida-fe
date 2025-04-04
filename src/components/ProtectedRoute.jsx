import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    console.log("ProtectedRoute check:", { 
        user, 
        isLoading,
        path: location.pathname 
    });

    if (isLoading) {
        return <div className="auth-loading">Verifying session...</div>;
    }

    if (!user) {
        console.log("Redirecting to login from:", location.pathname);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;