import React from 'react';
import { Link } from 'react-router-dom';

import bgImage from '../../../assets/img/bg/match-bg3.png';
import SectionTitle from '../../Utilities/SectionTitle/SectionTitle';
import img1 from '../../../assets/img/gallery/c1.jpeg';
import img2 from '../../../assets/img/gallery/c2.jpeg';
import img3 from '../../../assets/img/gallery/c3.jpeg';
import img4 from '../../../assets/img/gallery/c4.jpeg';
import img5 from '../../../assets/img/gallery/c5.jpeg';
import img6 from '../../../assets/img/gallery/c6.jpeg';
import img7 from '../../../assets/img/gallery/c7.jpeg';
import img8 from '../../../assets/img/gallery/c8.jpeg';
import img9 from '../../../assets/img/gallery/c9.jpeg';
import img10 from '../../../assets/img/gallery/c10.jpeg';
import img11 from '../../../assets/img/gallery/c11.jpeg';
import img12 from '../../../assets/img/gallery/c12.jpeg';
import img13 from '../../../assets/img/gallery/c13.jpeg';
import img14 from '../../../assets/img/gallery/c14.jpeg';

const galleryImgs = [
    {
        id: '1',
        thumb: img1
    },
    {
        id: '2',
        thumb: img2
    },
    {
        id: '3',
        thumb: img3
    },
    {
        id: '4',
        thumb: img4
    },
    {
        id: '5',
        thumb: img5
    },
    {
        id: '6',
        thumb: img6
    },
    {
        id: '7',
        thumb: img7
    },
    {
        id: '8',
        thumb: img8
    },
    {
        id: '9',
        thumb: img9
    },
    {
        id: '10',
        thumb: img10
    },
    {
        id: '11',
        thumb: img11
    },
    {
        id: '12',
        thumb: img12
    },
    {
        id: '13',
        thumb: img13
    },
    {
        id: '14',
        thumb: img14
    },
]
const Gallery = () => {
    return (
        <React.Fragment>
            <div style={{ 
                background: `url(${bgImage}) repeat`,
                minHeight: '100vh',
                paddingTop: '20px'
            }}>
                {/* Gallery */}
                <section id="work" className="pt-60 pb-90">
                    <div className="container">
                        <div className="row align-items-center mb-30">
                            <div className="col-lg-12">
                                <SectionTitle titlefirst='Gallery' titleSec='' />
                            </div>
                        </div>
                        <div className="portfolio">
                        <div className="grid col4">
                            {
                                galleryImgs.map(data => {
                                    const { id, thumb } = data;
                                    return (
                                        <div className="grid-item p-relative" key={id}>
                                            <div className="box">
                                                <Link to={thumb} className="popup-image">
                                                    <img src={thumb} alt="protfolio" />
                                                </Link>
                                            </div>
                                            <Link to={thumb} className="popup-image box-hover">
                                                <i className="fas fa-search"></i>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
            </div>
        </React.Fragment>
    );
}

export default Gallery;