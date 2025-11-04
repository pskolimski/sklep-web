import type { Product } from "../../types/types";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart, removeFromCart, getItemQuantity } = useCart();
    const formatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
    const avgRate = product.rates && product.rates.length > 0
        ? product.rates.reduce((a, b) => a + b, 0) / product.rates.length
        : 0;

    const quantity = getItemQuantity(product.id);
    const isInCart = quantity > 0;
    const isBestseller = avgRate >= 4.5;
    const isOnSale = product.discountedPrice !== undefined;

    return (
        <article className="product-card" aria-labelledby={`product-${product.id}`}>
            <div className="product-badges">
                {isOnSale && <span className="badge badge-sale">PROMOCJA</span>}
                {isBestseller && <span className="badge badge-bestseller">BESTSELLER</span>}
            </div>

            <div className="product-image">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} />
                ) : (
                    <span>{product.name.split(" ")[0]}</span>
                )}
            </div>
            <div className="product-name" id={`product-${product.id}`}>{product.name}</div>

            <div className="product-prices">
                {product.discountedPrice ? (
                    <>
                        <div className="price-regular">{formatter.format(product.price)}</div>
                        <div className="price-current">{formatter.format(product.discountedPrice)}</div>
                    </>
                ) : (
                    <div className="price-current">{formatter.format(product.price)}</div>
                )}
            </div>

            <div className="product-meta">
                <div className="rating" aria-label={`Średnia ocena ${avgRate.toFixed(1)}`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className={`bi ${i < Math.round(avgRate) ? 'bi-star-fill' : 'bi-star'}`} />
                    ))}
                </div>

                <div className={`stock ${product.stock === 0 ? 'stock-out' : product.stock <= 5 ? 'stock-low' : 'stock-ok'}`}>
                    {product.stock > 0 ? `W magazynie: ${product.stock}` : 'Brak w magazynie'}
                </div>
            </div>

            {isInCart ? (
                <div className="cart-controls">
                    <button
                        className="cart-btn cart-btn-minus"
                        onClick={() => removeFromCart(product.id)}
                        aria-label="Usuń jeden z koszyka"
                    >
                        <i className="bi bi-dash"></i>
                    </button>
                    <span className="cart-quantity">{quantity}</span>
                    <button
                        className="cart-btn cart-btn-plus"
                        onClick={() => addToCart(product.id)}
                        disabled={product.stock === 0}
                        aria-label="Dodaj kolejny"
                    >
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
            ) : (
                <button
                    className="add-btn"
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock === 0}
                    aria-disabled={product.stock === 0}
                >
                    Dodaj do koszyka
                </button>
            )}
        </article>
    )
}
