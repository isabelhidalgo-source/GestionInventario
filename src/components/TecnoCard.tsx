// src/components/TecnoCard.tsx
import type { Tecnologia } from "../types/product"; // 🌟 Importamos el nuevo nombre

interface Props {
    tecnologia: Tecnologia; // 🌟 Cambiado de product a tecnologia
}

function TecnoCard({ tecnologia }: Props): JSX.Element {
    return (
        <div className="card product-card">
            <div className="product-image-container">
                {/* 🌟 Ahora usamos tecnologia.image y tecnologia.title */}
                <img src={tecnologia.image} alt={tecnologia.title} className="product-img" />
            </div>
            <div className="product-info">
                <span className="product-category-badge">{tecnologia.category}</span>
                <h3 className="product-title">{tecnologia.title}</h3>
                <p className="product-description">{tecnologia.description}</p>
                <div className="product-meta">
                    <span className="product-price">${tecnologia.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}

export default TecnoCard;