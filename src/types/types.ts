export interface Product {
    id: number;
    name: string;
    price: number;
    discountedPrice?: number;
    rates?: number[];
    stock: number;
    imageUrl?: string;
}

export interface CartItem {
    productId: number;
    quantity: number;
}
