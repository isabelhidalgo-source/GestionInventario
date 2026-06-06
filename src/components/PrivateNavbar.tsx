// ELEMENTOS DE NAVEGACION
import { Link, useNavigate } from "react-router-dom";
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
        <nav>
            <Link to="/productos">Productos</Link>
            {" | "}
            <button onClick={handleLogout}>Logout</button>
            <hr />
            <p>Usuario: {user?.name ?? 'Invitado'}</p>
            <p>Rol: {user?.role ?? 'N/A'}</p>
            <hr />
        </nav>
    );
}