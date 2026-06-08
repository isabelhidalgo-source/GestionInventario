import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginLayout from '../layouts/LoginLayout';
import PrivateLayout from '../layouts/PrivateLayout';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';

const AppRoutes = () => (
    <Routes>
        {/* Rutas de login */}
        <Route element={<LoginLayout />}>
            <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
        </Route>

        {/* Rutas de error */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;