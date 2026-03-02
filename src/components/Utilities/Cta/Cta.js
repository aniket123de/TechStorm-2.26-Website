import { cloudinaryImages } from '../../../config/cloudinary';
import Button8bit from '../Button/Button8bit';
import './Cta.css';
const bgImg = cloudinaryImages.backgrounds.eventbg;
const ctaData = {
    bg: bgImg,
    title: 'Ready to Press Start? Register Now for TechStorm 2026!',
    description: 'Join thousands of tech enthusiasts, gamers, and innovators at the most electrifying technical fest of the year. Limited slots available for each event. Early bird registrations get exclusive retro arcade merchandise!',
    btn: 'Verify Registration',
}
const Cta = () => {
    const { bg, title, description, btn } = ctaData;
    return (
    <section
        id="graph"
        className="features-area pt-120 pb-120"
        style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
            <div className="container">
                <div className="row align-items-center text-center">
                    <div className="col-lg-12 col-md-12">
                        <div className="section-title cta-title  mb-20 wow fadeInUp animated" data-animation="fadeInRight" data-delay=".4s">
                            <div className="row justify-content-center">
                                <div className="col-xl-6 col-lg-8">
                                    <h2>{title}</h2>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl-11">
                                    <p>{description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="slider-btn">
                            <Button8bit to={'/verify-registration'} variant="primary" size="large" className="mt-20 wow fadeInDown animated">{btn}</Button8bit>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cta;