import aboutShape from '../../../assets/img/features/about-shape.png';
import about4 from '../../../assets/img/features/about-img4.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';
import Button8bit from '../Button/Button8bit';

const AboutGame = () => {
    return (
        <div className="row align-items-center pt-130">
            <div className="col-lg-12 col-md-12">
                <div className="best-gaming">
                    <div className="about-shape">
                        <img src={aboutShape} alt="About Shape" />
                    </div>
                    <div className="row">
                        <div className="col-lg-7 col-12">
                            <div className="about-content s-about-content wow fadeInLeft animated" data-animation="fadeInRight" data-delay=".4s">
                                <SectionTitle titlefirst='We’re the best Gaming' titleSec='Company' />
                                <p>{'Lpsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}</p>
                                <div className="slider-btn2 mt-20">
                                    <Button8bit to={'/about'} variant="primary" size="medium">{'Learn More'}</Button8bit>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="about-right-image wow fadeInRight" data-wow-delay=".4s">
                                <img src={about4} alt="About section" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutGame;