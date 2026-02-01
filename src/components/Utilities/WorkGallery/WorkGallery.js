import React, { useState } from 'react';
import { Link } from "react-router-dom";

import bgImg from '../../../assets/img/bg/trendiang-bg.png';


import SectionTitle from '../SectionTitle/SectionTitle';
import LiveStreamingVideo from '../LiveStreamingVideo/LiveStreamingVideo';

import workImg1 from '../../../assets/img/gallery/protfolio-img01.png';
import workImg2 from '../../../assets/img/gallery/protfolio-img02.png';
import workImg3 from '../../../assets/img/gallery/protfolio-img03.png';
import workImg4 from '../../../assets/img/gallery/protfolio-img04.png';

const galleryItems = [
    {
        id: '1',
        img: workImg1,
        tag: 'Coding',
        label: 'Code-Bee',
        description: 'Speed coding competition',
        cat: 'Coding',
    },
    {
        id: '2',
        img: workImg2,
        tag: 'Hackathon',
        label: 'Hack Storm',
        description: '24-hour innovation sprint',
        cat: 'Coding',
    },
    {
        id: '3',
        img: workImg3,
        tag: 'Robotics',
        label: 'Ro-Combat',
        description: 'Robot battle arena',
        cat: 'Robotics',
    },
    {
        id: '4',
        img: workImg4,
        tag: 'Gaming',
        label: 'Forza Horizon',
        description: 'Racing wheel setup',
        cat: 'Gaming',
    },
]

const WorkGallery = () => {
    const [items, setItems] = useState(galleryItems);


    const fliterItem = (cat) => {
        const filterUpdate = galleryItems.filter((currentItem) => {
            return currentItem.cat === cat;
        })
        setItems(filterUpdate);
    }


    return (
        <section id="work" className="pt-120 pb-120" style={{ background: `url(${bgImg}) no-repeat` }}>
            <div className="container">
                <div className="portfolio ">
                    <div className="row align-items-center mb-30 wow fadeInUp animated" data-animation="fadeInRight" data-delay=".4s">
                        <div className="col-lg-12">
                            <SectionTitle
                                titlefirst='All'
                                titleSec='Events' />
                        </div>
                        <div className="col-lg-12">
                            <div className="my-masonry wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                                <div className="button-group filter-button-group ">
                                    <button className="active" onClick={() => setItems(galleryItems)}>All</button>
                                    <button onClick={() => fliterItem('Coding')}>
                                        {'Coding'}
                                    </button>
                                    <button onClick={() => fliterItem('Robotics')}>
                                        {'Robotics'}
                                    </button>
                                    <button onClick={() => fliterItem('Gaming')}>
                                        {'Gaming'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid col4">
                        {
                            items.map(item => {
                                const { id, img, tag, label, description } = item
                                return (
                                    <div className="grid-item" key={id}>
                                        <Link to={img} className="popup-image">
                                            <figure className="gallery-image">
                                                <img src={img} alt="img" className="img" />
                                                <figcaption>
                                                    <span>{tag}</span>
                                                    <h4>{label}</h4>
                                                    <p>{description}</p>
                                                </figcaption>
                                            </figure>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <LiveStreamingVideo />
            </div>
        </section>
    );
}


export default WorkGallery;