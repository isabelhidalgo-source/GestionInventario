import { Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import PublicLayout from '../layouts/PublicLayout';
import LoginLayout from '../layouts/LoginLayout';
import PrivateLayout from '../layouts/PrivateLayout';

import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';
import Usuarios from "../pages/Usuarios";
import TecnoCatalogo from '../pages/TecnoCatalogo';

const AppRoutes = () => (
    <Routes>
        <Route element={<PublicRoute />}>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
            </Route>

            <Route element={<LoginLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>
        </Route>

        <Route element={<PrivateRoute />}>
            <Route element={<PrivateLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/tecno-catalogo" element={<TecnoCatalogo />} />
            </Route>
        </Route>

        <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route element={<PrivateLayout />}>
                <Route path="/admin/usuarios" element={<Usuarios />} />
            </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;