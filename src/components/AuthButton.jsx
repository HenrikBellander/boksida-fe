import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AuthButton() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    useEffect(() => {
        console.log('AuthButton user state:', user);
    }, [user]);

    if (user) {
        return (
        <div className="user-auth-container">
            <span className="username-display">
                Hello, {user.username}
            </span>
            <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="logout-button"
                aria-label="Logout"
            >
                {isLoggingOut ? (
                    <>
                        <span className="spinner"></span> Logging out...
                    </>
                ) : (
                    'Logout'
                )}
            </button>
        </div>
        );
    }

    return (
        <button
            onClick={() => navigate('/login')}
            className="login-button"
            aria-label="Login"
        >
            Login
        </button>
    );
}

export default AuthButton;