import products from "../../data/exampleProducts.json";
import ProductCard from "../ProductCard/ProductCard";
import SectionHeading from "../SectionHeading/SectionHeading";
import type { Product } from "../../types/types";
import "./Discounts.css";

export default function Discounts() {
    const discounted = products.filter((p: Product) => p.discountedPrice !== undefined);

    if (discounted.length === 0) return null;

    return (
        <section style={{ maxWidth: 1100, margin: '1.5rem auto', padding: '0 1rem' }}>
            <SectionHeading title="Promocje" />
            <div className="products-grid">
                {discounted.map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    )
}
