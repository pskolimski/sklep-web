import products from "../../data/exampleProducts.json";
import { useCart } from "../../context/CartContext";
import "./Header.css";

export default function Header() {
    const { getTotalItems, getTotalPrice } = useCart();

    const count = getTotalItems();
    const total = getTotalPrice(products);

    const formatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

    return (
        <header className="app-header">
            <div className="header-inner">
                <h1 className="app-title">
                    <i className="bi bi-laptop" aria-hidden="true"></i>
                    Katalog Produktów Elektronicznych
                </h1>

                <div className="cart-badge" aria-label="Informacje o koszyku">
                    <i className="bi bi-cart" aria-hidden="true"></i>
                    <span className="cart-count" title="Liczba produktów">{count}</span>
                    <span className="cart-total" title="Łączna wartość">{formatter.format(total)}</span>
                </div>
            </div>
        </header>
    );
}
