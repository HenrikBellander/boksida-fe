import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };
    
    return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;