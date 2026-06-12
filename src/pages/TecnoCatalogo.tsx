
import { useEffect } from "react";
import TecnoCard from "../components/TecnoCard";
import type { Tecnologia } from "../types/product";
import defaultProductImg from "../assets/imagenes/default.png";

export default function TecnoCatalogo() {
    useEffect(() => {
        document.title = "Catálogo Tecnológico Estático | Tecnopolis";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', 'Consulta nuestra vitrina fija de componentes esenciales, periféricos mecánicos, pantallas de alta tasa de refresco y gadgets de vanguardia.');

        const ogTags = [
            { property: "og:title", content: "Catálogo Tecnológico Estático - Tecnopolis" },
            { property: "og:description", content: "Explora una muestra selecta de hardware premium y accesorios de innovación tecnológica sin dependencias de red." },
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

    const productosTecnologicos: Tecnologia[] = [
        {
            id: 1,
            title: "Teclado Mecánico RGB",
            price: 89.99,
            description: "Teclado mecánico con switches red, ideal para desarrollo y gaming de alto rendimiento.",
            category: "Hardware",
            image: defaultProductImg
        },
        {
            id: 2,
            title: "Monitor Gamer 24\" 144Hz",
            price: 180.00,
            description: "Pantalla Full HD con tasa de refresco ultra rápida y tiempo de respuesta de 1ms.",
            category: "Electronics",
            image: defaultProductImg
        },
        {
            id: 3,
            title: "Audífonos Inalámbricos con ANC",
            price: 125.50,
            description: "Auriculares premium con cancelación de ruido activa y batería de larga duración.",
            category: "Gadget",
            image: defaultProductImg
        }
    ];

    return (
        <main className="tecno-catalogo-container" style={{ padding: '20px' }}>
            <header className="catalogo-header">
                <h1 className="catalogo-title">Catálogo Tecnológico</h1>
                <p className="catalogo-subtitle">Visualización estática de hardware y componentes de innovación.</p>
            </header>

            <section aria-label="Muestra estática de dispositivos de vanguardia">
                <div className="tecno-product-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {productosTecnologicos.map((dispositivo) => (
                        <article key={dispositivo.id} style={{ flex: '1 1 300px', maxWidth: '400px' }}>
                            <TecnoCard
                                tecnologia={dispositivo}
                            />
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}