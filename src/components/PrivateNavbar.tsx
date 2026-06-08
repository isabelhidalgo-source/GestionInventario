// ELEMENTOS DE NAVEGACION
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// COMPONENTE NAVBAR PRIVADO
export default function PrivateNavbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <div className="sidebar-menu">
            <div className="sidebar-brand">
                <h2>Panel Administrativo</h2>
                <p>{user?.name ?? 'Invitado'}</p>
            </div>

            <ul>
                {/* 1. CAMBIO: Inicio ahora va a /home */}
                <li>
                    <NavLink to="/home">Inicio</NavLink>
                </li>
                {/* 2. CAMBIO: Añadimos Store apuntando a /productos */}
                <li>
                    <NavLink to="/productos">TechStore</NavLink>
                </li>
            </ul>

            <button type="button" className="btn-secondary logout-button" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
    );
}