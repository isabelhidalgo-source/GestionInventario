
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        document.title = "Inicio | Tecnología e Innovación";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Bienvenido a nuestro espacio dedicado a hardware de alto rendimiento, gadgets inteligentes y soluciones tecnológicas de vanguardia.');

        const ogTags = [
            { property: "og:title", content: "Tu Hub de Tecnología - Innovación y Hardware" },
            { property: "og:description", content: "Explora herramientas premium diseñadas para potenciar tu productividad y tus proyectos digitales." },
            { property: "og:type", content: "website" }
        ];

        ogTags.forEach(({ property, content }) => {
            let ogTag = document.querySelector(`meta[property="${property}"]`);
            if (!ogTag) {
                ogTag = document.createElement('meta');
                ogTag.setAttribute('property', property);
                document.head.appendChild(ogTag);
            }
            ogTag.setAttribute('content', content);
        });
    }, []);

    return (
        <main className="welcome-container">
            <header className="welcome-header">
                <p className="welcome-user">
                    Bienvenido, <strong>{user?.name ?? (isAuthenticated ? 'Usuario' : 'Invitado')}</strong> — Rol: <span className="role-tag">{user?.role ?? 'N/A'}</span>
                </p>

                <section className="store-description">
                    <h2>Tu Hub de Tecnología</h2>
                    <p>
                        Te damos la bienvenida a nuestro espacio dedicado a los apasionados de la innovación.
                        Somos una tienda especializada en hardware de alto rendimiento, gadgets inteligentes y soluciones
                        tecnológicas de vanguardia. Explorando nuestro catálogo encontrarás herramientas diseñadas para
                        potenciar tu productividad, tus proyectos y tu entorno digital.
                    </p>
                </section>
            </header>

            <section className="cards-section" aria-label="Secciones destacadas">
                <div className="cards">
                    <article className="card">
                        <h3>Novedades</h3>
                        <p>Lo último en hardware y gadgets recién llegados al mercado.</p>
                    </article>

                    <article className="card Highlight">
                        <h3>Más Vendidos</h3>
                        <p>Los componentes favoritos y más solicitados por nuestra comunidad.</p>
                    </article>

                    <article className="card">
                        <h3>Ofertas Especiales</h3>
                        <p>Equipamiento premium con descuentos exclusivos por tiempo limitado.</p>
                    </article>
                </div>
            </section>
        </main>
    );
}