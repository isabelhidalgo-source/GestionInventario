
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "404 - Página No Encontrada | Tecnopolis";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Lo sentimos, la página que buscas en Tecnopolis no existe, ha sido eliminada o cambió de dirección. Regresa al inicio para continuar navegando.');

        const ogTags = [
            { property: "og:title", content: "Error 404 - Página No Encontrada" },
            { property: "og:description", content: "El recurso solicitado no está disponible en nuestro Hub de tecnología." },
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
        <main className="not-found-screen">
            <section className="not-found-box" aria-labelledby="error-title">
                <header>
                    <h1 className="not-found-code">404</h1>
                    <h2 id="error-title" className="not-found-title">Página no encontrada</h2>
                </header>
                <p className="not-found-text">
                    La página que estás buscando no existe o fue movida.
                </p>
                <div className="not-found-actions">
                    <Button
                        variant="success"
                        size="medium"
                        onClick={() => navigate("/")}
                    >
                        Volver al Inicio
                    </Button>
                </div>
            </section>
        </main>
    );
}