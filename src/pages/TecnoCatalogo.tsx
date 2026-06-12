// src/pages/TecnoCatalogo.tsx
import TecnoCard from "../components/TecnoCard";
import type { Tecnologia } from "../types/product";
import defaultProductImg from "../assets/imagenes/default.png";

// 🌟 Removemos ": JSX.Element" para solucionar el error del namespace de JSX
export default function TecnoCatalogo() {

    // Arreglo de datos simulados utilizando el tipo exclusivo Tecnologia
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
        <div className="tecno-catalogo-container">

            <div className="catalogo-header">
                <h1 className="catalogo-title">Catálogo Tecnológico</h1>
                <p className="catalogo-subtitle">Visualización estática de hardware y componentes de innovación.</p>
            </div>

            <div className="tecno-product-list">
                {productosTecnologicos.map((dispositivo) => (
                    <TecnoCard
                        key={dispositivo.id}
                        tecnologia={dispositivo}
                    />
                ))}
            </div>
        </div>
    );
}