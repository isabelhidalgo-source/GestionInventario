export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
    stock?: number;
    brand?: string;
}

export interface ProductFormData {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}