// Outlet PERMITE MOSTRAR RUTAS HIJAS
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// IMPORTA EL NAVBAR PRIVADO
import PrivateNavbar from "../components/PrivateNavbar";
// IMPORTA EL CONTEXTO DE AUTENTICACIÓN
import { useAuth } from "../context/AuthContext";

// COMPONENTE LAYOUT PRIVADO
export default function PrivateLayout() {
    // Obtenemos los datos del usuario logueado
    const { user } = useAuth();

    return (
        <div className="app-shell">
            <header className="app-header">
                <div className="app-header-info">
                    {/* 🔥 CAMBIO DINÁMICO SEGÚN EL ROL */}
                    <p className="app-label">
                        {user?.role === "admin" ? "Panel Administrativo" : "Tienda Virtual"}
                    </p>
                    <h1>TECNOPOLIS</h1>
                </div>
            </header>

            <div className="app-body">
                <aside className="sidebar">
                    <PrivateNavbar />
                </aside>

                <main className="main">
                    <Outlet />
                </main>
            </div>

            <Footer location="Bolivia" year={2026} />
        </div>
    );
}