import { Link } from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import brandbg from '../../../assets/img/bg/barnd-bg.png';
import brand1 from '../../../assets/img/brand/b-logo1.png';
import brand2 from '../../../assets/img/brand/b-logo2.png';
import brand3 from '../../../assets/img/brand/b-logo3.png';
import brand4 from '../../../assets/img/brand/b-logo4.png';
import brand5 from '../../../assets/img/brand/b-logo5.png';
import brand6 from '../../../assets/img/brand/b-logo6.png';

const brandData = [
    {
        id: '1',
        brandLogo: brand1
    },
    {
        id: '2',
        brandLogo: brand2
    },
    {
        id: '3',
        brandLogo: brand3
    },
    {
        id: '4',
        brandLogo: brand4
    },
    {
        id: '5',
        brandLogo: brand5
    },
    {
        id: '6',
        brandLogo: brand6
    }
]
const Brands = () => {

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        pauseOnHover: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <section className="brand-area pt-120 pb-120" style={{ background: `url(${brandbg}) no-repeat` }}>
            <div className="container">
                <h2 className="text-center mb-5" style={{color: '#fff', fontFamily: "'Press Start 2P', cursive", fontSize: '1.5rem'}}>Our Sponsors</h2>
                <div className="row brand-active">
                    <div className="col-12" >
                        <Slider {...settings}>
                            {
                                brandData.map(data => {
                                    return (
                                        <div className="single-brand" key={data.id}>
                                            <Link to={'#'}>
                                                <img src={data.brandLogo} alt={'Sponsor Logo'} />
                                            </Link>
                                        </div>

                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Brands;