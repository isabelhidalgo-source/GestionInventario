// Outlet PERMITE MOSTRAR RUTAS HIJAS
import { useState } from "react";
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

    // Estado que controla si el sidebar está abierto o cerrado en móvil
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Alterna entre abierto / cerrado
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Cierra el sidebar (usado al hacer clic en el overlay)
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="app-shell">

            <header className="app-header">
                <div className="app-header-info">
                    {/* CAMBIO DINÁMICO SEGÚN EL ROL */}
                    <p className="app-label">
                        {user?.role === "admin" ? "Panel Administrativo" : "Tienda Virtual"}
                    </p>
                    <h1>TECNOPOLIS</h1>
                </div>

                {/* BOTÓN HAMBURGUESA — visible solo en móvil (CSS lo oculta en tablet+) */}
                <button
                    className={`hamburger-btn ${sidebarOpen ? "open" : ""}`}
                    onClick={toggleSidebar}
                    aria-label="Abrir menú"
                    aria-expanded={sidebarOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            {/* OVERLAY — fondo oscuro detrás del sidebar en móvil.
                Al hacer clic fuera del sidebar, lo cierra. */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
                onClick={closeSidebar}
            />

            <div className="app-body">

                {/* SIDEBAR — recibe clase "open" para deslizarse en móvil */}
                <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

                    {/* BOTÓN CERRAR dentro del sidebar (solo visible en móvil) */}
                    <div className="sidebar-close-btn">
                        <button onClick={closeSidebar} aria-label="Cerrar menú">
                            ✕
                        </button>
                    </div>

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