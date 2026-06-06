import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user, isAuthenticated } = useAuth();

    return (
        <>
            <h2>Dashboard</h2>
            <p>Bienvenido {user?.name ?? (isAuthenticated ? 'Usuario' : 'Invitado')} - Rol: {user?.role ?? 'N/A'}</p>

            <div className="cards">
                <div className="card">
                    <h3>Resumen 1</h3>
                    <p>20</p>
                </div>

                <div className="card">
                    <h3>Resumen 2</h3>
                    <p>5</p>
                </div>

                <div className="card">
                    <h3>Resumen 3</h3>
                    <p>1</p>
                </div>
            </div>
        </>
    );
}