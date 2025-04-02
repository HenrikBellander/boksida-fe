import React from 'react';
import { useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <ProtectedRoute>
            <div>
                <h1>Välkommen, {user.username}!</h1>
                <button onClick={logout}>Logga ut</button>
            </div>
        </ProtectedRoute>
    );
}

export default Dashboard;