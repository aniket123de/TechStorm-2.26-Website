import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import merchBg from "../../../assets/img/merch.webp";
import merchPhBg from "../../../assets/img/MERCHPH.webp";
import rn1Img      from "../../../assets/img/rn1.webp";
import rn2Img      from "../../../assets/img/rn2.webp";
import rnBackImg   from "../../../assets/img/rn-back.webp";
import collarFixImg  from "../../../assets/img/collar-fix.webp";
import collarCustImg from "../../../assets/img/collar-cust.webp";
import "./Merchandise.css";

const MOBILE_BREAKPOINT = 768;

const PRODUCTS = [
    {
        id: 1,
        name: "TechStorm 2.26 Round Neck T-Shirt",
        category: "Apparel",
        price: "₹299",
        desc: "180 GSM premium cotton",
        images: [
            rn1Img,
            rn2Img,
            rnBackImg,
        ],
        shopLink: "https://forms.gle/ny75NhSSk68XVAT6A",
    },
    {
        id: 2,
        name: "TechStorm 2.26 Polo T-Shirt (Non-Customized)",
        category: "Apparel",
        price: "₹399",
        desc: "220 GSM premium polo fabric",
        image: collarFixImg,
        shopLink: "https://forms.gle/ny75NhSSk68XVAT6A",
    },
    {
        id: 3,
        name: "TechStorm 2.26 Polo T-Shirt (Customized)",
        category: "Apparel",
        price: "₹499",
        desc: "220 GSM premium polo fabric",
        image: collarCustImg,
        shopLink: "https://forms.gle/ny75NhSSk68XVAT6A",
    },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ images, startIndex, onClose }) => {
    const [current, setCurrent] = useState(startIndex);

    const goPrev = useCallback((e) => {
        e.stopPropagation();
        setCurrent(i => (i - 1 + images.length) % images.length);
    }, [images.length]);

    const goNext = useCallback((e) => {
        e.stopPropagation();
        setCurrent(i => (i + 1) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handle = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft" && images.length > 1) setCurrent(i => (i - 1 + images.length) % images.length);
            if (e.key === "ArrowRight" && images.length > 1) setCurrent(i => (i + 1) % images.length);
        };
        document.addEventListener("keydown", handle);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handle);
            document.body.style.overflow = "";
        };
    }, [onClose, images.length]);

    return (
        <div className="mcat-lb-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <button className="mcat-lb-close" onClick={onClose} aria-label="Close">✕</button>
            {images.length > 1 && (
                <button className="mcat-lb-arrow mcat-lb-arrow--prev" onClick={goPrev} aria-label="Previous">&#9664;</button>
            )}
            <div className="mcat-lb-img-wrap" onClick={e => e.stopPropagation()}>
                <img src={images[current]} alt={`Product view ${current + 1}`} className="mcat-lb-img" />
                {images.length > 1 && (
                    <div className="mcat-lb-counter">{current + 1} / {images.length}</div>
                )}
            </div>
            {images.length > 1 && (
                <button className="mcat-lb-arrow mcat-lb-arrow--next" onClick={goNext} aria-label="Next">&#9654;</button>
            )}
        </div>
    );
};

// ─── Slider arrow buttons ─────────────────────────────────────────────────────
const PrevArrow = ({ onClick }) => (
    <button className="mcat-slider-arrow mcat-slider-arrow--prev" onClick={onClick} aria-label="Previous image">&#9664;</button>
);
const NextArrow = ({ onClick }) => (
    <button className="mcat-slider-arrow mcat-slider-arrow--next" onClick={onClick} aria-label="Next image">&#9654;</button>
);

const SLIDER_SETTINGS = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dotsClass: "slick-dots mcat-slider-dots",
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, index }) => {
    const isReverse = index % 2 === 1;
    const hasMultiple = Array.isArray(product.images) && product.images.length > 0;
    const hasSingle   = !hasMultiple && product.image;
    const allImages   = hasMultiple ? product.images : hasSingle ? [product.image] : [];

    const [lightboxIndex, setLightboxIndex] = useState(null);

    // Track current slick slide so lightbox opens on the visible one
    const [slickCurrent, setSlickCurrent] = useState(0);

    return (
        <>
        {lightboxIndex !== null && (
            <Lightbox
                images={allImages}
                startIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
            />
        )}
        <article className={`mcat-card${isReverse ? ' mcat-card--reverse' : ''}`}>
            <div className="mcat-card-img">
                {hasMultiple ? (
                    <Slider
                        {...SLIDER_SETTINGS}
                        className="mcat-slider"
                        afterChange={idx => setSlickCurrent(idx)}
                    >
                        {product.images.map((src, i) => (
                            <div
                                key={i}
                                className="mcat-slide mcat-slide--clickable"
                                onClick={() => setLightboxIndex(slickCurrent)}
                            >
                                <img src={src} alt={`${product.name} view ${i + 1}`} />
                                <span className="mcat-zoom-hint" aria-hidden="true">🔍</span>
                            </div>
                        ))}
                    </Slider>
                ) : hasSingle ? (
                    <div
                        className="mcat-single-img-wrap mcat-slide--clickable"
                        onClick={() => setLightboxIndex(0)}
                    >
                        <img src={product.image} alt={product.name} />
                        <span className="mcat-zoom-hint" aria-hidden="true">🔍</span>
                    </div>
                ) : (
                    <span className="mcat-card-img-placeholder">{product.name.charAt(0)}</span>
                )}
            </div>
            <div className="mcat-card-body">
                <span className="mcat-item-num">[{String(index + 1).padStart(2, '0')}]</span>
                <h3 className="mcat-name">{product.name}</h3>
                {product.price && <span className="mcat-price">{product.price}</span>}
                {product.desc && <span className="mcat-desc">{product.desc}</span>}
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
        </>
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