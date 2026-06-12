import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
    requiredRole?: 'admin' | 'user';
}

const PrivateRoute = ({ requiredRole }: Props) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;