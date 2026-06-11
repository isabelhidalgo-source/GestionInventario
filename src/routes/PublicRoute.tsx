import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
    // Usamos user o isAuthenticated según lo tengas en tu AuthContext
    const { user } = useAuth();

    // Si ya inició sesión, lo mandamos a home. Si no, abrimos las rutas hijas con Outlet
    return user ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoute;