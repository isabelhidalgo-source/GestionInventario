import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    useEffect(() => {
        document.title = "Tecnopolis | Hardware de Alto Rendimiento y Componentes Premium";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Tu hub definitivo de hardware de alto rendimiento, componentes premium y soluciones digitales de vanguardia. Potenciamos tu productividad y tu pasión tecnológica.');

        const ogTags = [
            { property: "og:title", content: "TECNOPOLIS - Revolución Tecnológica e Innovación" },
            { property: "og:description", content: "Explora nuestro catálogo especializado en hardware de élite, soporte técnico real y gestión optimizada en tiempo real." },
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
        <main className="landing-shell">
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <span className="hero-badge">Bienvenidos a la Revolución Tecnológica</span>
                    <h1 className="hero-title">TECNOPOLIS</h1>
                    <p className="hero-subtitle">
                        Tu Hub definitivo de hardware de alto rendimiento, componentes premium
                        y soluciones digitales de vanguardia. Potenciamos tu productividad y tu pasión.
                    </p>
                    <div className="hero-actions">
                        <Link to="/login" className="btn-hero-primary">
                            Ingresar a la Tienda
                        </Link>
                        <a href="#catalogo-info" className="btn-hero-secondary">
                            Saber Más
                        </a>
                    </div>
                </div>
            </section>

            <section className="features-section" id="catalogo-info" aria-label="Características clave de Tecnopolis">
                <header className="section-header">
                    <h2>¿Por qué elegir Tecnopolis?</h2>
                    <p>Ofrecemos una experience especializada en tecnología y gestión de inventarios.</p>
                </header>

                <div className="features-grid">
                    <article className="feature-card-landing">
                        <div className="feature-icon" role="img" aria-label="Laptop e indicador de hardware">💻</div>
                        <h3>Hardware de Élite</h3>
                        <p>Los procesadores, tarjetas gráficas y periféricos más potentes del mercado global.</p>
                    </article>

                    <article className="feature-card-landing">
                        <div className="feature-icon" role="img" aria-label="Escudo de seguridad y respaldo técnico">🛡️</div>
                        <h3>Garantía Real</h3>
                        <p>Todos nuestros equipos tecnológicos cuentan con soporte técnico y respaldo especializado.</p>
                    </article>

                    <article className="feature-card-landing">
                        <div className="feature-icon" role="img" aria-label="Rayo de velocidad y dinamismo">⚡</div>
                        <h3>Gestión Ágil</h3>
                        <p>Navega de forma fluida a través de nuestro catálogo optimizado en tiempo real.</p>
                    </article>
                </div>
            </section>
        </main>
    );
}