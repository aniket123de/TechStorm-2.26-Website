import React, { Fragment, useEffect, useState } from 'react';

import Matches from '../../Utilities/Matches/Matches';
import { cloudinaryImages } from '../../../config/cloudinary';
import './Events.css';
const bgImage = cloudinaryImages.backgrounds.eventroute;
const bgImageMobile = cloudinaryImages.mobile.bg1;

const MOBILE_BREAKPOINT = 768;

const Events = () => {
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        window.addEventListener('resize', check);
        check();
        return () => window.removeEventListener('resize', check);
    }, []);

    const bg = isMobile ? bgImageMobile : bgImage;

    return (
        <Fragment>
            <div className="events-page-wrap" style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                paddingTop: '20px'
            }}>
                <div>
                    {/* Featured Events Component */}
                    <Matches />
                </div>
            </div>
        </Fragment>
    );
}

export default Events;
