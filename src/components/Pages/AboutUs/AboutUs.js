import React from 'react';
import About from '../../Utilities/About/About';
import Breadcrumb from "../../Utilities/Breadcrumb/Breadcrumb";
import Team from '../../Utilities/Team/Team';
import UpComingGameTwo from '../../Utilities/UpComingGameTwo/UpComingGameTwo';

const AboutUs = () => {
    return (

        <React.Fragment>
            
            {/* Breadcrumb component */}
            <Breadcrumb pageTitle={'About TechStorm'} currentPage={'About'} />
            {/* About component */}
            <About/>
            {/* Team component */}
            <Team/>
            {/* Up coming game component */}
            <UpComingGameTwo/>

        </React.Fragment>

    );
}

export default AboutUs;