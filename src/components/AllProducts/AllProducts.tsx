import { useState, useMemo } from "react";
import products from "../../data/exampleProducts.json";
import ProductCard from "../ProductCard/ProductCard";
import SectionHeading from "../SectionHeading/SectionHeading";
import Filters, { type FilterState } from "../Filters/Filters";
import type { Product } from "../../types/types";
import "./AllProducts.css";

export default function AllProducts() {
    const [filters, setFilters] = useState<FilterState>({
        category: "Wszystkie",
        priceRange: [0, 20000],
        minRating: 0,
        sortBy: "default"
    });

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products] as Product[];

        if (filters.category !== "Wszystkie") {
            filtered = filtered.filter(p => {
                const name = p.name.toLowerCase();
                const cat = filters.category.toLowerCase();
                if (cat === "telefony") return name.includes("iphone") || name.includes("phone");
                if (cat === "komputery") return name.includes("macbook") || name.includes("imac");
                if (cat === "audio") return name.includes("sony") || name.includes("wh");
                if (cat === "gaming") return name.includes("playstation") || name.includes("ps");
                if (cat === "tv") return name.includes("samsung") || name.includes("oled");
                if (cat === "foto") return name.includes("canon") || name.includes("eos");
                return false;
            });
        }

        filtered = filtered.filter(p => {
            const price = p.discountedPrice ?? p.price;
            return price >= filters.priceRange[0] && price <= filters.priceRange[1];
        });

        if (filters.minRating > 0) {
            filtered = filtered.filter(p => {
                if (!p.rates || p.rates.length === 0) return false;
                const avg = p.rates.reduce((a, b) => a + b, 0) / p.rates.length;
                return avg >= filters.minRating;
            });
        }

        switch (filters.sortBy) {
            case "price-asc":
                filtered.sort((a, b) => (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price));
                break;
            case "price-desc":
                filtered.sort((a, b) => (b.discountedPrice ?? b.price) - (a.discountedPrice ?? a.price));
                break;
            case "rating-desc":
                filtered.sort((a, b) => {
                    const avgA = a.rates ? a.rates.reduce((x, y) => x + y, 0) / a.rates.length : 0;
                    const avgB = b.rates ? b.rates.reduce((x, y) => x + y, 0) / b.rates.length : 0;
                    return avgB - avgA;
                });
                break;
            case "name-asc":
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return filtered;
    }, [filters]);

    return (
        <section style={{ maxWidth: 1100, margin: '1.5rem auto', padding: '0 1rem' }}>
            <SectionHeading title="Wszystkie produkty" />

            <div className="products-container">
                <Filters filters={filters} setFilters={setFilters} />

                <div className="products-content">
                    {filteredAndSortedProducts.length > 0 ? (
                        <>
                            <div className="products-count">
                                Znaleziono: <strong>{filteredAndSortedProducts.length}</strong> {filteredAndSortedProducts.length === 1 ? 'produkt' : 'produktów'}
                            </div>
                            <div className="products-grid">
                                {filteredAndSortedProducts.map((p: any) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-products">
                            <i className="bi bi-inbox"></i>
                            <p>Brak produktów spełniających kryteria</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
