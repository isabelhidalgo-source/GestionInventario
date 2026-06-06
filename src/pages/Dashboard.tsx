//useNavigate PARA REDIRECCIONAR ENTRE PAGINAS
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const logout = () => {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        navigate("/");
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>
                Bienvenido: {username}
            </h2>
            {/* BOTON PARA CERRAR SESION */}
            <button onClick={logout}> Cerrar Sesión</button>
        </div>
    );
}