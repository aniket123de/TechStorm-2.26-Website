import { Link } from 'react-router-dom';
import PixelSnow from '../../PixelSnow/PixelSnow';

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
            {/* Pixel Snow Background Effect */}
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 2,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}>
                <PixelSnow 
                    color="#ffffff"
                    flakeSize={0.026}
                    minFlakeSize={1.25}
                    pixelResolution={400}
                    speed={1.25}
                    density={0.3}
                    direction={125}
                    brightness={1}
                    depthFade={8}
                    farPlane={20}
                    gamma={0.4545}
                    variant="square"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
            <div className="slider-active" style={{ position: 'relative', zIndex: 1 }}>
                <div className="single-slider slider-bg d-flex align-items-center" style={{ background: '#0a0a0a' }}>
                    <div className="container" style={{ position: 'relative', zIndex: 3 }}>
                        <div className="row justify-content-center pt-50">
                            <div className="col-lg-1 col-md-1"></div>
                            <div className="col-lg-6 col-md-6">
                                <div className="slider-content s-slider-content">
                                    <h5 data-animation="fadeInDown" data-delay=".4s">{titleTag}</h5>
                                    <h2 data-animation="fadeInUp" data-delay=".4s">{title}</h2>
                                    <p data-animation="fadeInUp" data-delay=".6s" style={{color: '#fff', fontSize: '18px', marginBottom: '30px'}}>{'INSERT COIN to begin your journey at the ultimate technical fest experience. Where retro meets revolution.'}</p>
                                    <div className="slider-btn">
                                        <Link to={'/contact'} className="btn ss-btn mr-15">
                                            {btnText}
                                        </Link>
                                        <Link to={'/about'} className="btn ss-btn" style={{background: 'transparent', border: '2px solid #ffc010'}}>
                                            {'Explore Events'}
                                        </Link>
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