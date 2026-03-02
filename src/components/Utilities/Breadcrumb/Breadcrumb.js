import { cloudinaryImages } from '../../../config/cloudinary';
import { Link } from 'react-router-dom';
const defaultBg = cloudinaryImages.backgrounds.herobg;
const Breadcrumb = ({ pageTitle, currentPage, bgImage})=>{
    const bg = bgImage || defaultBg;
    return(
        <section className="breadcrumb-area d-flex align-items-center" style={{background:`url(${bg}) no-repeat center center / cover`}}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-12 col-lg-12">
                        <div className="breadcrumb-wrap text-left">
                            <div className="breadcrumb-title">
                                <h2>{pageTitle}</h2>
                                <div className="breadcrumb-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to={'/'}>{'Home'}</Link>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">{currentPage}</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Breadcrumb;