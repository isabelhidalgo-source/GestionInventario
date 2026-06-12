import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import PrivateNavbar from "../components/PrivateNavbar";
import { useAuth } from "../context/AuthContext";

export default function PrivateLayout() {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="app-shell">
            <header className="app-header">
                <div className="app-header-info">
                    <p className="app-label">
                        {user?.role === "admin" ? "Panel Administrativo" : "Tienda Virtual"}
                    </p>
                    <h1>TECNOPOLIS</h1>
                </div>

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

            <div
                className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
                onClick={closeSidebar}
            />

            <div className="app-body">
                <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
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