import heroVideo from '../../../../assets/img/HERO.mp4';
import iplogo from '../../../../assets/img/logo/iplogo.png';
import Button8bit from '../../Button/Button8bit';

const heroInformation = {
    id: "1",
    titleTag: "#TECHSTORM 2026",
    title: "Play the Past, Build the Future",
    btnText: "Register Now",
}
const { titleTag, title, btnText } = heroInformation;

const HeroOne = () => {
    return (
        <section id="home" className="slider-area slider-four fix p-relative" style={{ position: 'relative', minHeight: '600px' }}>
            {/* Video Background */}
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 1,
                overflow: 'hidden'
            }}>
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.7
                    }}
                >
                    <source src={heroVideo} type="video/mp4" />
                </video>
            </div>
            <div className="slider-active" style={{ position: 'relative', zIndex: 2 }}>
                <div className="single-slider slider-bg d-flex align-items-center" style={{ background: 'transparent' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 3 }}>
                        <div className="row justify-content-center pt-50">
                            <div className="col-lg-1 col-md-1"></div>
                            <div className="col-lg-6 col-md-6">
                                <div className="slider-content s-slider-content">
                                    {/* IP Logo - Most Important Element */}
                                    <div style={{
                                        marginBottom: '40px',
                                        textAlign: 'left'
                                    }}>
                                        <img 
                                            src={iplogo} 
                                            alt="Event IP Logo" 
                                            style={{
                                                width: '100%',
                                                maxWidth: '650px',
                                                height: 'auto',
                                                filter: 'drop-shadow(0 0 30px rgba(255, 192, 16, 0.8))',
                                                transform: 'scale(1.1)'
                                            }}
                                        />
                                    </div>
                                    <h5 data-animation="fadeInDown" data-delay=".4s">{titleTag}</h5>
                                    <h2 data-animation="fadeInUp" data-delay=".4s">{title}</h2>
                                    <p data-animation="fadeInUp" data-delay=".6s" style={{color: '#fff', fontSize: '18px', marginBottom: '30px'}}>{'INSERT COIN to begin your journey at the ultimate technical fest experience. Where retro meets revolution.'}</p>
                                    <div className="slider-btn btn-8bit-group">
                                        <Button8bit to={'/contact'} variant="primary" size="large">
                                            {btnText}
                                        </Button8bit>
                                        <Button8bit to={'/about'} variant="outline" size="large">
                                            {'Explore Events'}
                                        </Button8bit>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default HeroOne;