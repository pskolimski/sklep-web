import products from "../../data/exampleProducts.json";
import ProductCard from "../ProductCard/ProductCard";
import SectionHeading from "../SectionHeading/SectionHeading";
import type { Product } from "../../types/types";
import "./Bestsellers.css";

export default function Bestsellers() {
    const bestsellers = products.filter((p: Product) => {
        if (!p.rates || p.rates.length === 0) return false;
        const avg = p.rates.reduce((a, b) => a + b, 0) / p.rates.length;
        return avg >= 4.5;
    });

    if (bestsellers.length === 0) return null;

    return (
        <section style={{ maxWidth: 1100, margin: '1.5rem auto', padding: '0 1rem' }}>
            <SectionHeading title="Bestsellery" />
            <div className="products-grid">
                {bestsellers.map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    )
}
