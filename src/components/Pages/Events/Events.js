import React, { Fragment, useEffect, useState } from 'react';

import Matches from '../../Utilities/Matches/Matches';
import bgImage from '../../../assets/img/eventroute.png';
import bgImageMobile from '../../../assets/img/1.png';
import './Events.css';

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
