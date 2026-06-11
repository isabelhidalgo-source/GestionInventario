// src/pages/NotFound.tsx
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-screen">
            <div className="not-found-box">
                <h1 className="not-found-code">404</h1>
                <h2 className="not-found-title">Página no encontrada</h2>
                <p className="not-found-text">
                    La página que estás buscando no existe o fue movida.
                </p>
                <div className="not-found-actions">
                    <Button
                        variant="success"
                        size="medium"
                        onClick={() => navigate("/")}
                    >
                        Volver al Inicio
                    </Button>
                </div>
            </div>
        </div>
    );
}