import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CartItem } from "../types/types";

interface CartContextType {
    cart: CartItem[];
    addToCart: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    getItemQuantity: (productId: number) => number;
    getTotalItems: () => number;
    getTotalPrice: (products: any[]) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (productId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === productId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { productId, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === productId);
            if (!existingItem) return prevCart;

            if (existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prevCart.filter(item => item.productId !== productId);
        });
    };

    const getItemQuantity = (productId: number): number => {
        const item = cart.find(item => item.productId === productId);
        return item ? item.quantity : 0;
    };

    const getTotalItems = (): number => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    const getTotalPrice = (products: any[]): number => {
        return cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return sum;
            const price = product.discountedPrice ?? product.price;
            return sum + (price * item.quantity);
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            getItemQuantity,
            getTotalItems,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
