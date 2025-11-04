import type { Dispatch, SetStateAction } from "react";
import "./Filters.css";

export interface FilterState {
    category: string;
    priceRange: [number, number];
    minRating: number;
    sortBy: string;
}

interface FiltersProps {
    filters: FilterState;
    setFilters: Dispatch<SetStateAction<FilterState>>;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
    const categories = ["Wszystkie", "Telefony", "Komputery", "Audio", "Gaming", "TV", "Foto"];
    const sortOptions = [
        { value: "default", label: "Domyślne" },
        { value: "price-asc", label: "Cena: rosnąco" },
        { value: "price-desc", label: "Cena: malejąco" },
        { value: "rating-desc", label: "Ocena: najwyższe" },
        { value: "name-asc", label: "Nazwa: A-Z" }
    ];

    return (
        <aside className="filters-sidebar">
            <div className="filters-section">
                <h3 className="filter-title">
                    <i className="bi bi-funnel"></i> Filtry
                </h3>

                <div className="filter-group">
                    <h4>Kategoria</h4>
                    <div className="filter-options">
                        {categories.map(cat => (
                            <label key={cat} className="filter-option">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={filters.category === cat}
                                    onChange={() => setFilters(prev => ({ ...prev, category: cat }))}
                                />
                                <span>{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h4>Zakres cenowy</h4>
                    <div className="price-inputs">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.priceRange[0]}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                priceRange: [Number(e.target.value), prev.priceRange[1]]
                            }))}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.priceRange[1]}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                priceRange: [prev.priceRange[0], Number(e.target.value)]
                            }))}
                        />
                    </div>
                </div>

                <div className="filter-group">
                    <h4>Minimalna ocena</h4>
                    <div className="rating-filter">
                        {[5, 4, 3, 2, 1].map(rating => (
                            <label key={rating} className="filter-option">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={filters.minRating === rating}
                                    onChange={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                                />
                                <span className="rating-stars">
                                    {Array.from({ length: rating }).map((_, i) => (
                                        <i key={i} className="bi bi-star-fill"></i>
                                    ))}
                                    {rating < 5 && <span className="rating-text"> i więcej</span>}
                                </span>
                            </label>
                        ))}
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="rating"
                                checked={filters.minRating === 0}
                                onChange={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
                            />
                            <span>Wszystkie</span>
                        </label>
                    </div>
                </div>

                <button
                    className="reset-filters-btn"
                    onClick={() => setFilters({
                        category: "Wszystkie",
                        priceRange: [0, 20000],
                        minRating: 0,
                        sortBy: "default"
                    })}
                >
                    <i className="bi bi-arrow-clockwise"></i> Wyczyść filtry
                </button>
            </div>

            <div className="filters-section">
                <h3 className="filter-title">
                    <i className="bi bi-sort-down"></i> Sortowanie
                </h3>
                <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="sort-select"
                >
                    {sortOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </aside>
    );
}
