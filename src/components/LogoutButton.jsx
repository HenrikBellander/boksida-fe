import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    
    return (
        <button 
            onClick={handleLogout}
            className="nav-link"
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                font: 'inherit',
                padding: 0
            }}
        >
            Logout
        </button>
    );
}

export default LogoutButton;