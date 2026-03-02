import React from 'react';
import newBg from '../../../../assets/img/sponserbg.png';
import { cloudinaryImages } from '../../../../config/cloudinary';
import './BlogOne.css';
const mysteryBox = cloudinaryImages.backgrounds.mystery;

/*
import brand1 from '../../../../assets/img/brand/b-logo1.png';
import brand2 from '../../../../assets/img/brand/b-logo2.png';
import brand3 from '../../../../assets/img/brand/b-logo3.png';

const sponsorPreviewData = [
    { id: '1', name: 'Sponsor Name 1', logo: brand1 },
    { id: '2', name: 'Sponsor Name 2', logo: brand2 },
    { id: '3', name: 'Sponsor Name 3', logo: brand3 }
];
*/

const BlogOne = () => {
    return (
        <section
            id="blog"
            className="brand-area sponsor-preview-section"
            style={{
                backgroundImage: `url(${newBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Dark overlay to reduce background image intensity */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    zIndex: 0,
                }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <h2 className="text-center sponsor-preview-title techstorm-arcade-title" style={{ marginBottom: '30px' }}>
                    Our Sponsors
                </h2>
                <p className="text-center sponsor-coming-soon mb-5" style={{ marginTop: '30px' }}>
                    Talks are currently going on. Sponsor announcements coming soon.
                </p>

                <div className="sponsor-mystery-row" aria-label="Sponsors coming soon">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <img
                            key={idx}
                            src={mysteryBox}
                            alt="Mystery sponsor"
                            className="sponsor-mystery-box"
                            loading="lazy"
                            decoding="async"
                        />
                    ))}
                </div>

                {/* <div className="row justify-content-center mb-4">
                    <div className="col-lg-10">
                        <p className="text-center sponsor-preview-label mb-0">
                            Preview: This is how sponsor logo + name will look after adding final sponsors.
                        </p>
                    </div>
                </div>

                <div className="row brand-active sponsor-preview-grid">
                    {sponsorPreviewData.map((sponsor) => (
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-4" key={sponsor.id}>
                            <div className="single-brand sponsor-preview-card">
                                <img src={sponsor.logo} alt={`${sponsor.name} logo`} />
                                <h6 className="sponsor-name mb-0">{sponsor.name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
                */}
            </div>
        </section>
    );
};

export default BlogOne;