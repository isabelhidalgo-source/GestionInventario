// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import LoginLayout from '../layouts/LoginLayout';
import PrivateLayout from '../layouts/PrivateLayout';

// Páginas
import LandingPage from '../pages/LandingPage'; // 👈 Asegúrate de importar tu nueva LandingPage
import Login from '../pages/Login';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import NotFound from '../pages/NotFound';
import Unauthorized from '../pages/Unauthorized';
import Usuarios from "../pages/Usuarios";

const AppRoutes = () => (
    <Routes>
        {/* 🌐 CAPA PÚBLICA: Protegida por PublicRoute (redirige a /home si ya hay sesión) */}
        <Route element={<PublicRoute />}>

            {/* 1. DISEÑO PORTADA: Usa PublicLayout para mostrar la barra de navegación superior */}
            <Route element={<PublicLayout />}>
                {/* 🔥 AQUÍ ESTÁ EL CAMBIO: Ahora la raíz muestra tu Landing Page */}
                <Route path="/" element={<LandingPage />} />
            </Route>

            {/* 2. DISEÑO LOGIN: Conserva tu LoginLayout centrado exclusivo para el formulario */}
            <Route element={<LoginLayout />}>
                {/* El login se desplaza exclusivamente a su propia ruta */}
                <Route path="/login" element={<Login />} />
            </Route>

        </Route>

        {/* 🔐 CAPA PRIVADA: Solo usuarios logueados */}
        <Route element={<PrivateRoute />}>
            <Route element={<PrivateLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
            </Route>
        </Route>

        <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route element={<PrivateLayout />}>
                <Route path="/admin/usuarios" element={<Usuarios />} />
            </Route>
        </Route>

        {/* 🚨 RUTAS DE ERROR GLOBALES */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;