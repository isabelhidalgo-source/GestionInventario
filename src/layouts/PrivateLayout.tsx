// Outlet PERMITE MOSTRAR RUTAS HIJAS
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// IMPORTA EL NAVBAR PRIVADO
import PrivateNavbar from "../components/PrivateNavbar";

// COMPONENTE LAYOUT PRIVADO
export default function PrivateLayout() {
    return (
        <div className="app-shell">
            <header className="app-header">
                <div className="app-header-info">
                    <p className="app-label">Panel Administrativo</p>
                    <h1>Dashboard de Inventario</h1>
                </div>
                <div className="app-header-meta">
                    <p>Bienvenido al sistema de administración.</p>
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

            <Footer location="Ciudad: Cochabamba" year={2026} />
        </div>
    );
}