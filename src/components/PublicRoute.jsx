// components/PublicRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { user } = useAuth();

  // Om användaren är inloggad, omdirigera till startsidan
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Annars, rendera de publika rutterna
  return <Outlet />;
};

export default PublicRoute;