// src/pages/Productos.tsx
import { useEffect, useState } from "react";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../service/productService";

import defaultProductImg from "../assets/imagenes/default.png";

import type { Product, ProductFormData } from "../types/product";
import { useAuth } from "../context/AuthContext";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";

const initialFormState: ProductFormData = {
    title: "",
    price: 0,
    description: "",
    category: ""
};

function Productos() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user } = useAuth();
    const [editingId, setEditingId] = useState<number | null>(null);

    const [formData, setFormData] = useState<ProductFormData>(initialFormState);

    // Estados de validaciones visuales
    const [clases, setClases] = useState<Record<string, string>>({});
    const [mensajes, setMensajes] = useState<Record<string, string>>({});
    const [colores, setColores] = useState<Record<string, string>>({});

    // Evaluación dinámica en el evento onBlur
    const handleBlurField = (field: keyof ProductFormData) => {
        const value = formData[field];

        if (value === "" || value === 0) {
            setMensajes(prev => ({ ...prev, [field]: "" }));
            setClases(prev => ({ ...prev, [field]: "" }));
            return;
        }

        if (field === 'title' && String(value).trim().length < 3) {
            setMensajes(prev => ({ ...prev, title: "El nombre debe tener al menos 3 caracteres" }));
            setColores(prev => ({ ...prev, title: "red" }));
            setClases(prev => ({ ...prev, title: "error" }));
        } else if (field === 'price' && Number(value) <= 0) {
            setMensajes(prev => ({ ...prev, price: "El precio debe ser mayor a 0" }));
            setColores(prev => ({ ...prev, price: "red" }));
            setClases(prev => ({ ...prev, price: "error" }));
        } else {
            setMensajes(prev => ({ ...prev, [field]: "Campo válido" }));
            setColores(prev => ({ ...prev, [field]: "green" }));
            setClases(prev => ({ ...prev, [field]: "correcto" }));
        }
    };

    const limpiarValidaciones = () => {
        setClases({}); setMensajes({}); setColores({});
    };

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            setError("No se pudieron cargar los productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadProducts(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.title.trim().length < 3 || formData.price <= 0) {
            setError("Por favor, corrige las alertas del formulario.");
            return;
        }

        try {
            const newProduct: Omit<Product, 'id'> = {
                ...formData,
                image: defaultProductImg,
                rating: { rate: 0, count: 0 }
            };

            const createdProduct = await createProduct(newProduct as Product);
            setProducts([...products, createdProduct]);

            setFormData(initialFormState);
            limpiarValidaciones();
            alert("Producto registrado");
        } catch (error) {
            setError("Error al crear producto");
        }
    };

    const handleEdit = (p: Product) => {
        setEditingId(p.id ?? null);
        setFormData({
            title: p.title,
            price: p.price,
            description: p.description,
            category: p.category
        });
        limpiarValidaciones();
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        if (formData.title.trim().length < 3 || formData.price <= 0) {
            setError("Por favor, corrige las alertas del formulario.");
            return;
        }

        const originalProduct = products.find((p) => p.id === editingId);
        if (!originalProduct) return;

        try {
            const prod: Product = {
                ...originalProduct,
                ...formData,
            };

            const updated = await updateProduct(editingId, prod);
            const finalUpdatedProduct = { ...originalProduct, ...updated };

            setProducts(products.map((p) => (p.id === editingId ? finalUpdatedProduct : p)));

            setEditingId(null);
            setFormData(initialFormState);
            limpiarValidaciones();
            alert("Producto actualizado");
        } catch (error) {
            setError("Error al actualizar producto");
        }
    };

    const handleDelete = async (id?: number) => {
        if (!id || !confirm("¿Eliminar producto?")) return;
        try {
            await deleteProduct(id);
            setProducts(products.filter((p) => p.id !== id));
            alert("Producto eliminado");
        } catch (error) {
            setError("Error al eliminar producto");
        }
    };

    return (
        <div>
            <h1>Productos</h1>
            <hr />

            {user?.role === "admin" ? (
                <ProductForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={editingId ? handleUpdate : handleSubmit}
                    editing={!!editingId}
                    onCancel={() => {
                        setEditingId(null);
                        setFormData(initialFormState);
                        limpiarValidaciones();
                    }}
                    clases={clases}
                    mensajes={mensajes}
                    colores={colores}
                    onBlurField={handleBlurField}
                />
            ) : (
                <p>Acceso de solo lectura. Inicia sesión como administrador para editar.</p>
            )}

            <hr />
            {loading && <p>Cargando productos...</p>}
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

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

export default Productos;