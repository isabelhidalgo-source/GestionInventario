import { useAuth } from '../context/AuthContext';
import Button from './Button';
import styles from './ProductCard.module.css';
import type { Product } from '../service/productService';


interface Props {
    product: Product;
    onEdit?: (product: Product) => void;
    onDelete?: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: Props) => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={product.image}
                    alt={`Imagen de ${product.title}`}
                    className={styles.image}
                    loading="lazy"
                />
                <span className={styles.category}>{product.category}</span>
            </div>
            <div className={styles.body}>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.description}>
                    {product.description.length > 90
                        ? product.description.slice(0, 90) + '…'
                        : product.description}
                </p>
                <div className={styles.footer}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    {product.rating && (
                        <span className={styles.rating} aria-label={`Calificación: ${product.rating.rate} de 5`}>
                            ★ {product.rating.rate}
                        </span>
                    )}
                </div>
                {isAdmin && (
                    <div className={styles.actions}>
                        <Button variant="guardar" size="small" onClick={() => onEdit?.(product)}>
                            Editar
                        </Button>
                        <Button variant="eliminar" size="small" onClick={() => onDelete?.(product.id)}>
                            Eliminar
                        </Button>
                    </div>
                )}
            </div>
        </article>
    );
};

export default ProductCard;