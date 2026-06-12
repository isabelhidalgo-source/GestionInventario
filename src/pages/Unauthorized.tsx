// src/pages/Unauthorized.tsx
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="unauthorized-screen">
            <div className="unauthorized-box">
                <span className="unauthorized-icon">🔒</span>
                <h1 className="unauthorized-code">403</h1>
                <h2 className="unauthorized-title">Acceso denegado</h2>
                <p className="unauthorized-text">
                    No tienes permisos para ver esta página.<br />
                    Contacta al administrador si crees que es un error.
                </p>
                <div className="unauthorized-actions">
                    <button
                        className="btn-unauthorized-primary"
                        onClick={() => navigate("/inicio")}
                    >
                        Volver al inicio
                    </button>
                    <button
                        className="btn-unauthorized-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Regresar a la página anterior
                    </button>
                </div>
            </div>
        </div>
    );
}