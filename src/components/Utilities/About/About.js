import aboutBgImg from '../../../assets/img/bg/about-bg.png';
import Button8bit from '../Button/Button8bit';
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
                                <span>{'1st'}</span>
                            </div>
                            <img src={features1} alt="TechStorm fest" />
                            <div className="about-image2 wow fadeInUp" data-wow-delay=".4s">
                                <img src={features2} alt="Retro arcade" />
                            </div>
                            <div className="about-image3 wow fadeInUp" data-wow-delay=".6s">
                                <img src={features3} alt="Tech competition" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="about-content s-about-content wow fadeInRight" data-wow-delay=".4s">
                            <SectionTitle
                                titlefirst={'About TechStorm'}
                                titleSec={'2026'}
                                className={'about-title second-title'}
                            />
                            <p><b>Welcome to TechStorm 2026 - where pixels meet passion and classic gaming culture collides with cutting-edge innovation.</b></p>
                            <p>TechStorm is the flagship annual technical fest of [Your College Name], designed to ignite creativity, challenge intellects, and celebrate the spirit of technology. This year, we take you on a nostalgic journey through the golden era of computing and arcade gaming.</p>
                            <div className="about-content3 mt-30">
                                <div className="row">
                                    <div className="col-md-12">
                                        <ul className="green">
                                            <li>{'15+ Technical and Creative Events'}</li>
                                            <li>{'Robotics, Coding and Gaming Competitions'}</li>
                                            <li>{'Prizes Worth [AMOUNT]+'}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="slider-btn2 mt-30">
                                <Button8bit to={'/about'} variant="primary" size="medium">{'Discover More'}</Button8bit>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;