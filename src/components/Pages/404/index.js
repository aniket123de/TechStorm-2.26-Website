import React from "react";
import { cloudinaryImages } from '../../../config/cloudinary';
import Button8bit from '../../Utilities/Button/Button8bit';
const errorImg = cloudinaryImages.backgrounds.mystery;
const errorHdImg = cloudinaryImages.backgrounds.herobg;
const Error404 = () => {
    return (
        <React.Fragment>
            <section className="breadcrumb-area d-flex align-items-center" style={{ background: `url(${errorHdImg})` }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-12 col-lg-12"></div>
                    </div>
                </div>
            </section>
            <section id="about" className="about-area about-p pb-120 p-relative">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="error-page text-center">
                                <div className="error-code"> <strong>{'404'}</strong>
                                </div>
                                <div className="error-message">
                                    <h3>{'Oops... Page Not Found!'}</h3>
                                </div>
                                <div className="error-body">
                                    <p>{'Try using the button below to go to main page of the site'}</p>
                                    <Button8bit to={'/'} variant="primary" size="medium">
                                        <i className="fa fa-arrow-circle-left">&nbsp;</i>
                                        {'Go to Home'}
                                    </Button8bit>
                                </div>
                            </div>
                            <div className="error-img">
                                <img src={errorImg} alt="logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default Error404;