import React from "react";

import mapImg from '../../../assets/img/bg/map-contact.png';
import contactHeader from '../../../assets/img/bg/contant-hd.png';
import Form from "../../Utilities/Form/Form";

import { Link } from "react-router-dom";


const branceAddress = [
    {
        branceName: 'Main Venue',
        location: '[Your College Name], [Address]',
        openingTime: 'Event Date: [Date] 2026',
        email: 'techstorm@college.edu',
        phone: '+91 XXXXX XXXXX'
    },
    {
        branceName: 'Registration Desk',
        location: '[Building Name], [Your College Name]',
        openingTime: 'Open: 8:00 AM - 6:00 PM',
        email: 'register@techstorm.in',
        phone: '+91 XXXXX XXXXX'
    },
]

const ContactUs = () => {

    return (
        <React.Fragment>

            <section className="breadcrumb-area d-flex align-items-center" style={{ background: `url(${contactHeader})` }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-12 col-lg-12">
                            <div className="breadcrumb-wrap text-left">
                                <div className="breadcrumb-title">
                                    <h2>{'Contact Us'}</h2>
                                    <div className="breadcrumb-wrap">
                                        <nav aria-label="breadcrumb">
                                            <ol className="breadcrumb">
                                                <li className="breadcrumb-item">
                                                    <Link to={'/'}>{'Home'}</Link>
                                                </li>
                                                <li className="breadcrumb-item active" aria-current="page">{'Contact Us'}</li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact-map" className="contact-map p-relative fix" style={{ background: `url(${mapImg}) no-repeat` }}>
                <div className="container">
                    <div className="row"></div>
                </div>
            </section>

            <section id="contact" className="contact-area after-none contact-bg pt-120 pb-120 p-relative fix">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="contact-info wow fadeInLeft animated" data-animation="fadeInRight" data-delay=".4s">
                                <div className="section-title center-align">
                                    <h2>
                                        {'Venue'} <br /> <span>{'Information'}</span>
                                    </h2>
                                    <p>{'TechStorm 2026 will be held at [Your College Name]. Find us at the main campus for all event activities, registration, and prize distribution. Reach out for any queries!'}</p>
                                </div>
                                <div className="row mt-50">
                                    {
                                        branceAddress.map((data, index) => {
                                            const { branceName, location, openingTime, email, phone, } = data;
                                            return (
                                                <div className="col-lg-6 contact_info" key={index}>
                                                    <h4>{branceName}</h4>
                                                    <p>{location}</p>
                                                    <p>{openingTime}</p>
                                                    <p>{email}</p>
                                                    <p>{phone}</p>
                                                </div>

                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-bg02 wow fadeInRight animated">
                                <div className="section-title center-align">
                                    <h2>
                                        {'Have Questions?'}<br /> <span>{'Reach Out!'} </span>
                                    </h2>
                                    <p>{'Got questions about events, registration, or participation? Drop us a message and our team will get back to you within 24 hours. We are here to help you level up!'}</p>
                                </div>
                                <Form />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    );

}

export default ContactUs;