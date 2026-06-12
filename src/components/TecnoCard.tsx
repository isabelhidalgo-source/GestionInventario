import type { Tecnologia } from "../types/product";

interface Props {
    tecnologia: Tecnologia;
}

function TecnoCard({ tecnologia }: Props) {
    return (
        <div className="card product-card">
            <div className="product-image-container">
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