import heroImg from '../../../../assets/img/slider/slider_img01.png';
import sliderImg from '../../../../assets/img/slider/slider_img05.png';
import Button8bit from '../../Button/Button8bit';
const heroData = {
    bgImg: heroImg,
    titleTag: "#world class game",
    title: "Are You ready For your next Challenge ?",
    btnText: "Read More",
    sliderImg: sliderImg
}

const HeroTwo = () => {
    const { bgImg, titleTag, title, btnText, sliderImg } = heroData;
    return (
        <section id="home" className="slider-area slider-four fix p-relative">
            <div className="slider-active">
                <div className="single-slider slider-bg d-flex align-items-center" style={{ background: `url(${bgImg}) no-repeat center top / cover` }}>
                    <div className="container">
                        <div className="row justify-content-center pt-50">
                            <div className="col-lg-6 col-md-6">
                                <div className="slider-content s-slider-content mt-150">
                                    <h5 data-animation="fadeInDown" data-delay=".4s">{titleTag}</h5>
                                    <h2 data-animation="fadeInUp" data-delay=".4s">{title}</h2>
                                    <div className="slider-btn">
                                        <Button8bit to={'/about'} variant="primary" size="large">
                                            {btnText}
                                        </Button8bit>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div
                                    className="slider-img"
                                    data-animation="fadeInUp"
                                    data-delay=".4s">
                                    <img src={sliderImg} alt={'Slider Avatar'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default HeroTwo;