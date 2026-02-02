import React, { Fragment } from 'react';

import About from '../../../Utilities/About/About';
import Services from '../../../Utilities/Services/Services';
import Cta from '../../../Utilities/Cta/Cta';
import BlogOne from '../../../Utilities/Blog/BlogOne/BlogOne';
import HeroOne from '../../../Utilities/Hero/HeroOne/HeroOne';
import WorkGallery from '../../../Utilities/WorkGallery/WorkGallery';
import Carousel8bit from '../../../Utilities/LiveStreamingVideo/Carousel8bit/Carousel8bit';


const Home = () => {

    return (
        <Fragment>

            {/* Hero Component */}
            <HeroOne />

            {/* About Component */}
            <About />

            {/* Service Component */}
            <Services />

            {/* Gallery Component */}
            <WorkGallery/>

            {/* 8-bit Carousel Component */}
            <Carousel8bit />

            {/* Cta Component */}
            <Cta />

            {/* Blog Component */}
            <BlogOne />

        </Fragment>
    );
}

export default Home;