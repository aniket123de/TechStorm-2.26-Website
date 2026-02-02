import aboutBgImg from '../../../assets/img/bg/about-bg.png';
import Button8bit from '../Button/Button8bit';
import experienceImg from '../../../assets/img/features/experience-years.png';
import features1 from '../../../assets/img/features/about1.jpeg';
import features2 from '../../../assets/img/features/about2.jpeg';
import SectionTitle from '../SectionTitle/SectionTitle';
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const About = () => {
    return (
        <section id="about" className="about-area about-p pt-70 pb-140 p-relative" style={{ background: `url(${aboutBgImg}) no-repeat center center / cover` }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <AnimateOnScroll animation="slide-in-left">
                            <div className="s-about-img p-relative" style={{ position: 'relative' }}>
                                <div className="experience-years">
                                    <img src={experienceImg} alt="Experience Years" />
                                    <span>{'1st'}</span>
                                </div>
                            <img src={features1} alt="TechStorm fest" style={{ 
                                width: '100%',
                                position: 'relative',
                                zIndex: 1
                            }} />
                            <div className="about-image2 wow fadeInUp" data-wow-delay=".4s" style={{
                                position: 'absolute',
                                bottom: '-238px',
                                right: '-30px',
                                zIndex: 2,
                                width: '70%'
                            }}>
                                <img src={features2} alt="Retro arcade" style={{ 
                                    width: '100%',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                                    border: '4px solid #ffc010'
                                }} />
                            </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <AnimateOnScroll animation="slide-in-right">
                            <div className="about-content s-about-content">
                                <SectionTitle
                                    titlefirst={'About TechStorm'}
                                    titleSec={''}
                                    className={'about-title second-title'}
                                />
                            
                            {/* NES.css Message Balloons */}
                            <div className="nes-container is-dark with-title" style={{
                                background: 'rgba(26, 14, 34, 0.9)',
                                border: '4px solid #ffc010',
                                marginBottom: '30px'
                            }}>
                                <p className="title" style={{
                                    background: '#1a0e22',
                                    color: '#ffc010',
                                    fontFamily: 'Press Start 2P, Minecraft, monospace',
                                    fontSize: '12px',
                                    padding: '5px 15px'
                                }}>Event Info</p>
                                
                                <div className="message-list">
                                    <div className="message -left" style={{ marginBottom: '20px' }}>
                                        <i className="nes-mario" style={{ 
                                            fontSize: '32px'
                                        }}></i>
                                        <div className="nes-balloon from-left is-dark" style={{
                                            background: '#2d1b3d',
                                            border: '4px solid #ffc010',
                                            color: '#ffd966',
                                            maxWidth: '400px'
                                        }}>
                                            <p style={{ 
                                                fontFamily: 'Minecraft, monospace',
                                                fontSize: '13px',
                                                margin: 0
                                            }}>
                                                Welcome to TechStorm 2026! Where pixels meet passion and retro gaming collides with cutting-edge tech!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="message -right" style={{ marginBottom: '20px' }}>
                                        <div className="nes-balloon from-right is-dark" style={{
                                            background: '#2d1b3d',
                                            border: '4px solid #ffc010',
                                            color: '#ffd966',
                                            maxWidth: '400px'
                                        }}>
                                            <p style={{ 
                                                fontFamily: 'Minecraft, monospace',
                                                fontSize: '13px',
                                                margin: 0
                                            }}>
                                                Press START to join 15+ events including Coding, Robotics, Gaming, and Creative competitions!
                                            </p>
                                        </div>
                                        <i className="nes-ash" style={{ 
                                            fontSize: '32px'
                                        }}></i>
                                    </div>

                                    <div className="message -left">
                                        <i className="nes-kirby" style={{ 
                                            fontSize: '32px'
                                        }}></i>
                                        <div className="nes-balloon from-left is-dark" style={{
                                            background: '#2d1b3d',
                                            border: '4px solid #ffc010',
                                            color: '#ffd966',
                                            maxWidth: '400px'
                                        }}>
                                            <p style={{ 
                                                fontFamily: 'Minecraft, monospace',
                                                fontSize: '13px',
                                                margin: 0
                                            }}>
                                                🏆 Massive prizes + exclusive retro arcade merch! INSERT COIN to begin your journey.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;