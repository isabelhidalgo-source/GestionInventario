// src/components/TecnoCard.tsx
import type { Product } from "../types/product";

interface Props {
    product: Product;
}

function TecnoCard({ product }: Props): JSX.Element {
    return (
        <div className="card product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-img" />
            </div>
            <div className="product-info">
                <span className="product-category-badge">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-meta">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}

export default TecnoCard;