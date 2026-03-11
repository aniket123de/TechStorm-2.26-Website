import React, { useState, useEffect } from "react";
import merchBg from "../../../assets/img/merch.webp";
import merchPhBg from "../../../assets/img/MERCHPH.webp";
import "./Merchandise.css";

const MOBILE_BREAKPOINT = 768;

// Set shopLink to a real store URL and image to a local import / URL for each product.
const PRODUCTS = [
    { id: 1, name: "TechStorm Event T-Shirt", category: "Apparel",     price: "₹299", image: null, shopLink: "#" },
    { id: 2, name: "TechStorm Hoodie",         category: "Apparel",     price: "₹699", image: null, shopLink: "#" },
    { id: 3, name: "TechStorm Cap",            category: "Accessories", price: "₹199", image: null, shopLink: "#" },
];

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, index }) => {
    const isReverse = index % 2 === 1;
    return (
        <article className={`mcat-card${isReverse ? ' mcat-card--reverse' : ''}`}>
            <div className="mcat-card-img">
                {product.image
                    ? <img src={product.image} alt={product.name} />
                    : <span className="mcat-card-img-placeholder">{product.name.charAt(0)}</span>
                }
            </div>
            <div className="mcat-card-body">
                <span className="mcat-item-num">[{String(index + 1).padStart(2, '0')}]</span>
                <h3 className="mcat-name">{product.name}</h3>
                {product.price && <span className="mcat-price">{product.price}</span>}
                <div className="mcat-card-divider" />
                <a
                    href={product.shopLink}
                    className="mcat-shop-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Buy ${product.name}`}
                >
                    BUY NOW
                </a>
            </div>
        </article>
    );
};

// ─── Main page ────────────────────────────────────────────────────────────────
const MerchandiseCatalog = () => {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT
    );

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const bg = isMobile ? merchPhBg : merchBg;

    return (
        <React.Fragment>
            {/* ── Hero ── */}
            <section
                className="mcat-hero"
                style={{
                    background: `linear-gradient(160deg, rgba(4,0,12,0.88) 0%, rgba(10,2,22,0.84) 50%, rgba(4,0,12,0.92) 100%), url(${bg}) center center / cover no-repeat fixed`,
                }}
            >
                <div className="mcat-hero-inner">
                    <h1 className="mcat-hero-title">MERCH CATALOGUE</h1>
                    <p className="mcat-hero-sub">[Official TechStorm 2026 Collection]</p>
                </div>
            </section>

            {/* ── Separator ── */}
            <div className="mcat-sep" aria-hidden="true">
                <span className="mcat-sep-label">SELECT YOUR GEAR</span>
            </div>

            {/* ── Products ── */}
            <section id="mcat-products" className="mcat-section">
                <div className="mcat-grid">
                    {PRODUCTS.map((product, index) => (
                        <React.Fragment key={product.id}>
                            {index > 0 && (
                                <div className="mcat-row-sep" aria-hidden="true">
                                    <span className="mcat-sep-label"> NEXT ITEM </span>
                                </div>
                            )}
                            <ProductCard product={product} index={index} />
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* ── End separator ── */}
            <div className="mcat-sep" aria-hidden="true">
                <span className="mcat-sep-label">END OF CATALOGUE</span>
            </div>
        </React.Fragment>
    );
};

export default MerchandiseCatalog;