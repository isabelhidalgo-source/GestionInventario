import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landing-shell">
            {/* 🚀 HERO SECTION (Sección Principal de Impacto) */}
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

            {/* ⚡ FEATURES SECTION (Tarjetas de Características de la Tienda) */}
            <section className="features-section" id="catalogo-info">
                <div className="section-header">
                    <h2>¿Por qué elegir Tecnopolis?</h2>
                    <p>Ofrecemos una experiencia especializada en tecnología y gestión de inventarios.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card-landing">
                        <div className="feature-icon">💻</div>
                        <h3>Hardware de Élite</h3>
                        <p>Los procesadores, tarjetas gráficas y periféricos más potentes del mercado global.</p>
                    </div>

                    <div className="feature-card-landing">
                        <div className="feature-icon">🛡️</div>
                        <h3>Garantía Real</h3>
                        <p>Todos nuestros equipos tecnológicos cuentan con soporte técnico y respaldo especializado.</p>
                    </div>

                    <div className="feature-card-landing">
                        <div className="feature-icon">⚡</div>
                        <h3>Gestión Ágil</h3>
                        <p>Navega de forma fluida a través de nuestro catálogo optimizado en tiempo real.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}