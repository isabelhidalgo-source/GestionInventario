// ==========================================
// TYPE
// ==========================================

export type Product = {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};


// URL API
const URL = "https://fakestoreapi.com/products";


// ==========================================
// GET -> OBTENER PRODUCTOS
// ==========================================

export const getProducts = async (): Promise<Product[]> => {

    try {

        // petición GET
        const response = await fetch(URL);

        // verificar respuesta
        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }

        // convertir JSON
        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

        throw error;
    }
};


// ==========================================
// POST -> CREAR PRODUCTO
// ==========================================

export const createProduct = async (
    product: Product
): Promise<Product> => {

    try {

        const response = await fetch(URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error("Error al crear producto");
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

        throw error;
    }
};


// ==========================================
// PUT -> ACTUALIZAR PRODUCTO
// ==========================================

export const updateProduct = async (
    id: number,
    product: Product
): Promise<Product> => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar producto");
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error);
        throw error;
    }
};


// ==========================================
// DELETE -> ELIMINAR PRODUCTO
// ==========================================

export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar producto");
        }

        await response.json();

        return true;

    } catch (error) {
        console.error(error);
        throw error;
    }
};