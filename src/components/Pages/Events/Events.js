import React, { Fragment } from 'react';

import Matches from '../../Utilities/Matches/Matches';
import bgImage from '../../../assets/img/eventroute.png';


const Events = () => {

    return (
        <Fragment>
            <div style={{
                backgroundImage: `url(${bgImage})`,
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
