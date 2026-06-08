import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user, isAuthenticated } = useAuth();

    return (
        <>
            <div className="welcome-header">
                <p className="welcome-user">
                    Bienvenido, <strong>{user?.name ?? (isAuthenticated ? 'Usuario' : 'Invitado')}</strong> — Rol: <span className="role-tag">{user?.role ?? 'N/A'}</span>
                </p>

                <div className="store-description">
                    <h3>Tu Hub de Tecnología</h3>
                    <p>
                        Te damos la bienvenida a nuestro espacio dedicado a los apasionados de la innovación.
                        Somos una tienda especializada en hardware de alto rendimiento, gadgets inteligentes y soluciones
                        tecnológicas de vanguardia. Explorando nuestro catálogo encontrarás herramientas diseñadas para
                        potenciar tu productividad, tus proyectos y tu entorno digital.
                    </p>
                </div>
            </div>

            <div className="cards">
                <div className="card">
                    <h3>Novedades</h3>
                    <p>Lo último en hardware y gadgets recién llegados al mercado.</p>
                </div>

                <div className="card Highlight">
                    <h3>Más Vendidos</h3>
                    <p>Los componentes favoritos y más solicitados por nuestra comunidad.</p>
                </div>

                <div className="card">
                    <h3>Ofertas Especiales</h3>
                    <p>Equipamiento premium con descuentos exclusivos por tiempo limitado.</p>
                </div>
            </div>
        </>
    );
}