import { useAuth } from '../context/AuthContext';
import Button from './Button';
import './ProductCard.css';
import type { Product } from '../types/product';

import defaultProductImg from '../assets/imagenes/default.png';

interface Props {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: Props) => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    const displayImage = !product.image || product.image.includes("pravatar.cc")
        ? defaultProductImg
        : product.image;

    return (
        <article className="product-card">
            <div className="image-wrapper">
                <img
                    src={displayImage}
                    alt={`Imagen de ${product.title}`}
                    className="image"
                    loading="lazy"
                />
                <span className="category">{product.category || 'General'}</span>
            </div>

            <div className="body">
                <h3 className="title" title={product.title}>{product.title}</h3>
                <p className="description">
                    {product.description && product.description.length > 90
                        ? product.description.slice(0, 90) + '…'
                        : product.description || "Sin descripción disponible."}
                </p>

                <div className="footer">
                    <span className="price">${product.price.toFixed(2)}</span>
                    {product.rating && (
                        <span className="rating" aria-label={`Calificación: ${product.rating.rate} de 5`}>
                            ★ {product.rating.rate}
                        </span>
                    )}
                </div>

                {isAdmin && (
                    <div className="actions">
                        <Button variant="guardar" size="small" onClick={() => onEdit?.(product)}>
                            Editar
                        </Button>
                        <Button variant="eliminar" size="small" onClick={() => product.id && onDelete?.(product.id)}>
                            Eliminar
                        </Button>
                    </div>
                )}
            </div>
        </article>
    );
};

export default ProductCard;