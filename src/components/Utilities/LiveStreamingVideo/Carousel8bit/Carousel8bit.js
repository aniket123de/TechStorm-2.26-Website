import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionTitle from '../../SectionTitle/SectionTitle';
import './Carousel8bit.css';

// Import carousel images
import c1 from '../../../../assets/img/carousel/c1.jpeg';
import c2 from '../../../../assets/img/carousel/c2.jpeg';
import c3 from '../../../../assets/img/carousel/c3.jpeg';
import c4 from '../../../../assets/img/carousel/c4.jpeg';
import c5 from '../../../../assets/img/carousel/c5.jpeg';
import c6 from '../../../../assets/img/carousel/c6.jpeg';
import c7 from '../../../../assets/img/carousel/c7.jpeg';
import c8 from '../../../../assets/img/carousel/c8.jpeg';

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

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
    <button className="carousel-8bit-arrow carousel-8bit-prev" onClick={onClick} aria-label="Previous slide">
        <span className="arrow-icon">←</span>
    </button>
);

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
    <button className="carousel-8bit-arrow carousel-8bit-next" onClick={onClick} aria-label="Next slide">
        <span className="arrow-icon">→</span>
    </button>
);

const Carousel8bit = () => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        dotsClass: 'slick-dots carousel-8bit-dots',
    };

    return (
        <section className="carousel-8bit-section pt-120 pb-120" style={{ background: '#0f0819' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle titlefirst='Event' titleSec='Highlights' />
                    </div>
                </div>
                <div className="row justify-content-center mt-60">
                    <div className="col-lg-12">
                        <div className="carousel-8bit-wrapper">
                            {/* Carousel Container with 8-bit border */}
                            <div className="carousel-8bit-container">
                                <Slider {...settings}>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Carousel8bit;
