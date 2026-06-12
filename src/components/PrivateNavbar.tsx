// src/components/PrivateNavbar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateNavbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="sidebar-menu">
            <div className="sidebar-brand">
                <h2>
                    {user?.role === "admin" ? "Panel Admin" : " "}
                </h2>
                <p>{user?.name ?? 'Invitado'}</p>
            </div>

            <ul>
                <li>
                    <NavLink to="/home">Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/productos">TechStore</NavLink>
                </li>

                <li>
                    <NavLink to="/tecno-catalogo">Catálogo Tecno</NavLink>
                </li>

                {user?.role === "admin" && (
                    <li>
                        <NavLink to="/admin/usuarios">Usuarios</NavLink>
                    </li>
                )}
            </ul>

            <button type="button" className="btn-secondary logout-button" onClick={handleLogout}>
                Cerrar sesión
            </button>
        </div>
    );
}