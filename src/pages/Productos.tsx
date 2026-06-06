import { useEffect, useState } from "react";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    type Product,
} from "../service/productService";

import { useAuth } from "../context/AuthContext";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";


function Products() {

    // ==========================================
    // STATES
    // ==========================================

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // formulario
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);

    const { user } = useAuth();

    // editar
    const [editingId, setEditingId] = useState<number | null>(null);


    // ==========================================
    // GET PRODUCTS
    // ==========================================

    const loadProducts = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            setError("No se pudieron cargar los productos");

        } finally {

            setLoading(false);
        }
    };


    // cargar al iniciar
    useEffect(() => {

        loadProducts();

    }, []);


    // ==========================================
    // CREATE PRODUCT
    // ==========================================

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            const newProduct: Product = {

                title,

                price,

                description: "Producto creado desde React",

                category: "general",

                image:
                    "https://i.pravatar.cc",
            };

            const createdProduct = await createProduct(newProduct);

            // agregar al estado
            setProducts([...products, createdProduct]);

            // limpiar formulario
            setTitle("");
            setPrice(0);

            alert("Producto registrado");

        } catch (error) {

            setError("Error al crear producto");
        }
    };


    const handleEdit = (p: Product) => {
        setEditingId(p.id ?? null);
        setTitle(p.title);
        setPrice(p.price);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;
        try {
            const prod: Product = {
                title,
                price,
                description: "Producto editado desde React",
                category: "general",
                image: "https://i.pravatar.cc",
            };

            const updated = await updateProduct(editingId, prod);

            setProducts(products.map((p) => (p.id === updated.id ? updated : p)));

            setEditingId(null);
            setTitle("");
            setPrice(0);

            alert("Producto actualizado");
        } catch (error) {
            setError("Error al actualizar producto");
        }
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        if (!confirm("Eliminar producto?")) return;
        try {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
            alert("Producto eliminado");
        } catch (error) {
            setError("Error al eliminar producto");
        }
    };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <div>

            <h1>Productos</h1>

            <hr />

            {/* FORMULARIO */}
            {user?.role === "admin" ? (
                <ProductForm
                    title={title}
                    price={price}
                    setTitle={setTitle}
                    setPrice={setPrice}
                    onSubmit={editingId ? handleUpdate : handleSubmit}
                    editing={!!editingId}
                    onCancel={() => { setEditingId(null); setTitle(''); setPrice(0); }}
                />
            ) : (
                <p>Acceso de solo lectura. Inicia sesión como administrador para editar.</p>
            )}

            <hr />

            {/* MENSAJES */}
            {loading &&
                <p>Cargando productos...</p>
            }

            {error &&
                <p>{error}</p>
            }

            {/* LISTA */}
            <h2>Catálogo de Productos</h2>

            <div className="product-list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

        </div>
    );
}

export default Products;