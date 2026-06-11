// src/components/PublicNavbar.tsx
import { Link } from "react-router-dom";

export default function PublicNavbar() {
    return (
        <nav className="public-navbar">
            <div className="navbar-brand-public">
                {/* Nombre de tu marca */}
                <Link to="/">TECNOPOLIS</Link>
            </div>

            <ul className="navbar-links-public">
                <li>
                    <a href="#catalogo-info">Características</a>
                </li>
                <li>
                    {/* Botón destacado para ir a iniciar sesión */}
                    <Link to="/login" className="btn-login-nav">
                        Iniciar Sesión
                    </Link>
                </li>
            </ul>
        </nav>
    );
}