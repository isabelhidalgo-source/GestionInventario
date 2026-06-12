
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "403 - Acceso Denegado | Tecnopolis";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Acceso denegado. No dispones de los permisos o roles necesarios para visualizar este módulo de Tecnopolis. Contacta con soporte si consideras que es un error.');

        const ogTags = [
            { property: "og:title", content: "Error 403 - Acceso Restringido" },
            { property: "og:description", content: "Módulo protegido por políticas de control de acceso y seguridad del sistema." },
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
        <main className="unauthorized-screen">
            <section className="unauthorized-box" aria-labelledby="restriction-title">
                <header>
                    <div className="unauthorized-icon" role="img" aria-label="Candado cerrado de seguridad">🔒</div>
                    <h1 className="unauthorized-code">403</h1>
                    <h2 id="restriction-title" className="unauthorized-title">Acceso denegado</h2>
                </header>
                <p className="unauthorized-text">
                    No tienes permisos para ver esta página.<br />
                    Contacta al administrador si crees que es un error.
                </p>
                <div className="unauthorized-actions">
                    <button
                        className="btn-unauthorized-primary"
                        onClick={() => navigate('/home')}
                    >
                        Volver al inicio
                    </button>
                </div>
            </section>
        </main>
    );
}