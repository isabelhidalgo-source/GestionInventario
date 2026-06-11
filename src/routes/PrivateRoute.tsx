import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
    requiredRole?: 'admin' | 'user';
}

const PrivateRoute = ({ requiredRole }: Props) => {
    const { user } = useAuth(); // Asumiendo que user null significa no autenticado

    // Si no está logueado, al login
    if (!user) return <Navigate to="/login" replace />;

    // Si hay un rol requerido y el usuario no lo cumple, a unauthorized
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Si todo está bien, renderiza las pantallas hijas
    return <Outlet />;
};

export default PrivateRoute;