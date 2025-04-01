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

    // Debugging: Verify auth state
    useEffect(() => {
        console.log('AuthButton user state:', user);
    }, [user]);

    if (user) {
        return (
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










/*import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AuthButton() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login'); // Redirect after logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (user) {
        return (
            <button
                onClick={handleLogout}
                className="logout-button" // Add your styles
            >
                Logout
            </button>
        );
    }

    return (
        <button
            onClick={() => navigate('/login')}
            className="login-button" // Add your styles
        >
            Login
        </button>
    );
}

export default AuthButton;*/