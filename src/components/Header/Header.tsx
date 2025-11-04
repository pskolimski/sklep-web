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
            <div className="header-top">
                <div className="header-inner">
                    <div className="brand-section">
                        <div className="brand-icon">
                            <i className="bi bi-shop" aria-hidden="true"></i>
                        </div>
                        <div className="brand-content">
                            <h1 className="app-title">
                                <span className="title-main">ElectroShop</span>
                                <span className="title-sub">Najlepsze produkty elektroniczne</span>
                            </h1>
                        </div>
                    </div>

                    <div className="header-actions">
                        <div className="cart-badge" aria-label="Informacje o koszyku">
                            <div className="cart-icon-wrapper">
                                <i className="bi bi-cart3" aria-hidden="true"></i>
                                {count > 0 && <span className="cart-count-bubble">{count}</span>}
                            </div>
                            <div className="cart-info">
                                <span className="cart-label">Koszyk</span>
                                <span className="cart-total">{formatter.format(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
