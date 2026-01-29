import { Link } from 'react-router-dom';
import aboutBgImg from '../../../assets/img/bg/about-bg.png';
import experienceImg from '../../../assets/img/features/experience-years.png';
import features1 from '../../../assets/img/features/about-img1.jpg';
import features2 from '../../../assets/img/features/about-img2.jpg';
import features3 from '../../../assets/img/features/about-img3.png';
import SectionTitle from '../SectionTitle/SectionTitle';

const About = () => {
    return (
        <section id="about" className="about-area about-p pt-70 pb-140 p-relative" style={{ background: `url(${aboutBgImg}) no-repeat center center / cover` }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="s-about-img p-relative wow fadeInLeft" data-wow-delay=".4s">
                            <div className="experience-years wow fadeInDown" data-wow-delay=".4s">
                                <img src={experienceImg} alt="Experience Years" />
                                <span>{'10'}</span>
                            </div>
                            <img src={features1} alt="About section" />
                            <div className="about-image2 wow fadeInUp" data-wow-delay=".4s">
                                <img src={features2} alt="Gaming feature" />
                            </div>
                            <div className="about-image3 wow fadeInUp" data-wow-delay=".6s">
                                <img src={features3} alt="Gaming feature" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="about-content s-about-content wow fadeInRight" data-wow-delay=".4s">
                            <SectionTitle
                                titlefirst={'We’re the best Gaming'}
                                titleSec={'Company'}
                                className={'about-title second-title'}
                            />
                            <p><b>Lpsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</b></p>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            <div className="about-content3 mt-30">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="green">
                                            <li>{'Suspe ndisse suscipit sagittis leo.'}</li>
                                            <li>{'Entum estibulum dignissim posuere.'}</li>
                                            <li>{'If you are going to use a passage'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-btn2 mt-30">
                                <Link to={'/about'} className="btn ss-btn">{'Discover More'}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;