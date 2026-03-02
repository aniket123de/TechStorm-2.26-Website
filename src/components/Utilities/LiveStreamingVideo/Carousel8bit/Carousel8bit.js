import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { cloudinaryImages } from '../../../../config/cloudinary';
import SectionTitle from '../../SectionTitle/SectionTitle';
import './Carousel8bit.css';
const highlightBg = cloudinaryImages.backgrounds.eventbg;

// Carousel images from Cloudinary
const c1 = cloudinaryImages.carousel.c1;
const c2 = cloudinaryImages.carousel.c2;
const c3 = cloudinaryImages.carousel.c3;
const c4 = cloudinaryImages.carousel.c4;
const c5 = cloudinaryImages.carousel.c5;
const c6 = cloudinaryImages.carousel.c6;
const c7 = cloudinaryImages.carousel.c7;
const c8 = cloudinaryImages.carousel.c8;

const carouselData = [
    { id: 1, img: c1, alt: 'TechStorm Gaming Event 1' },
    { id: 2, img: c2, alt: 'TechStorm Gaming Event 2' },
    { id: 3, img: c3, alt: 'TechStorm Gaming Event 3' },
    { id: 4, img: c4, alt: 'TechStorm Gaming Event 4' },
    { id: 5, img: c5, alt: 'TechStorm Gaming Event 5' },
    { id: 6, img: c6, alt: 'TechStorm Gaming Event 6' },
    { id: 7, img: c7, alt: 'TechStorm Gaming Event 7' },
    { id: 8, img: c8, alt: 'TechStorm Gaming Event 8' },
];

const Carousel8bit = () => {
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    };

    return (
        <section
            className="carousel-8bit-section pt-120 pb-120"
            style={{
                position: 'relative',
                backgroundColor: '#05030a',
                backgroundImage: `url(${highlightBg})`,
                // Show the full artwork without zooming / cropping
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center top',
            }}
        >
            {/* Top fade blend from previous section */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '160px',
                    background: 'linear-gradient(to bottom, #05030a 0%, transparent 100%)',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle
                            titlefirst="PREVIOUS YEAR HIGHLIGHTS"
                            titleSec=""
                            className="techstorm-arcade-title"
                        />
                    </div>
                </div>
            </div>
            <div className="carousel-8bit-wrapper mt-30">
                {/* Custom arrows outside container */}
                <button 
                    className="carousel-8bit-arrow carousel-8bit-prev" 
                    onClick={() => sliderRef.current?.slickPrev()}
                    aria-label="Previous slide"
                >
                    <span className="arrow-icon">←</span>
                </button>
                <button 
                    className="carousel-8bit-arrow carousel-8bit-next" 
                    onClick={() => sliderRef.current?.slickNext()}
                    aria-label="Next slide"
                >
                    <span className="arrow-icon">→</span>
                </button>
                {/* Carousel Container with 8-bit border */}
                <div className="carousel-8bit-container">
                    <Slider ref={sliderRef} {...settings}>
                        {carouselData.map((item) => (
                            <div key={item.id} className="carousel-8bit-slide">
                                <div className="carousel-8bit-image-wrapper">
                                    <img src={item.img} alt={item.alt} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        {/* Dots outside carousel */}
                        <div className="carousel-8bit-dots-container">
                            <ul className="carousel-8bit-dots">
                                {carouselData.map((item, index) => (
                                    <li key={item.id} className={index === currentSlide ? 'slick-active' : ''}>
                                        <button onClick={() => sliderRef.current?.slickGoTo(index)}></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Carousel8bit;
