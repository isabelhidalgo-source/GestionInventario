// src/types/product.ts

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    // 🌟 Lo dejamos opcional para que no falle si no lo pones en tus datos estáticos
    rating?: {
        rate: number;
        count: number;
    };
}

export interface ProductFormData {
    title: string;
    price: number;
    description: string;
    category: string;
}