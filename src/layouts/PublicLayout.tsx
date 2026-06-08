// Outlet PERMITE MOSTRAR RUTAS HIJAS
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// IMPORTA EL NAVBAR PUBLICO
import PublicNavbar from "../components/PublicNavbar";

// COMPONENTE LAYOUT PUBLICO
export default function PublicLayout() {
    return (
        <div className="public-shell">
            <header className="public-header">
                <PublicNavbar />
            </header>

            <main className="public-main">
                <Outlet />
            </main>

            <Footer location="Panel público" year={new Date().getFullYear()} />
        </div>
    );
}