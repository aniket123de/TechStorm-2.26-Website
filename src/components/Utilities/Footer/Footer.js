import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import logo from '../../../assets/img/logo/f_logo.png';

const Footer = () => {
    return (
        <footer className="footer-bg footer-p">
            <div className="footer-top pt-70">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-xl-4 col-lg-4 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title mb-20">
                                    <Link to={'/'}>
                                        <Logo logo={logo} />
                                    </Link>
                                </div>
                                <div className="footer-link">{'TechStorm 2026 - Play the Past, Build the Future. The flagship technical fest celebrating retro arcade culture and modern innovation.'}</div>
                                <div className="f-contact mt-20">
                                    <ul>
                                        <li>
                                            <i className="icon fal fa-map-marker-alt"></i>
                                            <span>{'Address: [Your College Name], [City], [State]'}</span>
                                        </li>
                                        <li>
                                            <i className="icon far fa-clock"></i>
                                            <span>
                                                Phone : 
                                                <Link to={'#callto:+91XXXXXXXXXX'}>
                                                    {'+91 XXXXX XXXXX'}
                                                    </Link>
                                                    </span>
                                        </li>
                                        <li>
                                            <i className="icon dripicons-mail"></i>
                                            <span>
                                                {'Email :'} 
                                                <Link to={'mailto:techstorm@college.edu'}>
                                                    {'techstorm@college.edu'}
                                                </Link>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title">
                                    <h2>{'Our Links'}</h2>
                                </div>
                                <div className="footer-link">
                                    <ul>
                                        <li><Link to={'/'}>{'Home'}</Link>
                                        </li>
                                        <li><Link to={'/about'}> {'About Us'}</Link>
                                        </li>
                                        <li><Link to={'/service'}> {'Services'} </Link>
                                        </li>
                                        <li><Link to={'/contact'}> {'Contact Us'}</Link>
                                        </li>
                                        <li><Link to={'/blog'}>{'Blog'} </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title">
                                    <h2>{'Events'}</h2>
                                </div>
                                <div className="footer-link">
                                    <ul>
                                        <li><Link to={'#'}>{'Coding Arena'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Robo League'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Gaming Zone'}</Link>
                                        </li>
                                        <li><Link to={'/faq'}>{'FAQ'}</Link>
                                        </li>
                                        <li><Link to={'#'}>{'Rules & Guidelines'}</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-sm-6">
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title">
                                    <h2>{'Follow Us'}</h2>
                                </div>
                                <div className="footer-social  mt-30"> <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}><i className="fab fa-facebook-f"></i></button>
                                    <Link to={'#'}><i className="fab fa-twitter"></i></Link>
                                    <Link to={'#'}><i className="fab fa-instagram"></i></Link>
                                </div>
                            </div>
                            <div className="footer-widget mb-30">
                                <div className="f-widget-title">
                                    <h2>{'Map'}</h2>
                                </div>
                                <div className="map-f">
                                    <div className="map" id="map"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-wrap">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            {'Copyright © 2026'} <span>{'TechStorm | [Your College Name]'}</span> {'All Rights Reserved.'}
                        </div>
                        <div className="col-lg-6 text-right text-xl-right"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;