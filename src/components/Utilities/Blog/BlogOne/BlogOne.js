import React from 'react';
import PixelCard from './PixelCard';
import './BlogOne.css';

const sponsorLogoContext = require.context('../../../../assets/SPONSOR LOGOS', true, /\.webp$/i);

const formatLabel = (value) => value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());

const normalizeSectionLabel = (value) => {
    const lower = value.toLowerCase();
    if (lower === 'eeducational') {
        return 'Educational';
    }
    return formatLabel(value);
};

const sponsorSections = (() => {
    const grouped = {};
    sponsorLogoContext.keys().forEach((key) => {
        const cleanPath = key.replace(/^\.\//, '');
        const parts = cleanPath.split('/');
        if (parts.length < 2) {
            return;
        }

        const sectionRaw = parts[0];
        const subsectionRaw = parts.length > 2 ? parts[1] : 'main';
        const fileName = parts[parts.length - 1].replace(/\.webp$/i, '');

        const sectionLabel = normalizeSectionLabel(sectionRaw);
        const subsectionLabel = subsectionRaw === 'main' ? 'Partners' : formatLabel(subsectionRaw);

        if (!grouped[sectionLabel]) {
            grouped[sectionLabel] = {};
        }
        if (!grouped[sectionLabel][subsectionLabel]) {
            grouped[sectionLabel][subsectionLabel] = [];
        }

        grouped[sectionLabel][subsectionLabel].push({
            name: formatLabel(fileName),
            src: sponsorLogoContext(key)
        });
    });

    return Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([section, subsectionMap]) => ({
            section,
            subsections: Object.entries(subsectionMap)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([subsection, logos]) => ({
                    subsection,
                    logos: logos.sort((a, b) => a.name.localeCompare(b.name))
                }))
        }));
})();

const sectionMap = sponsorSections.reduce((acc, section) => {
    acc[section.section] = section;
    return acc;
}, {});

const buildCards = (section, fallbackCategory) => {
    if (!section) {
        return [];
    }

    return section.subsections.flatMap((subsection) =>
        subsection.logos.map((logo) => ({
            ...logo,
            category: subsection.subsection === 'Partners' ? fallbackCategory : subsection.subsection
        }))
    );
};

const educationCards = buildCards(sectionMap.Educational, 'Educational');
const generalCards = [
    ...buildCards(sectionMap.General, 'General'),
    ...buildCards(sectionMap.Stalls, 'Stalls')
];

const orderedSponsorSections = [
    {
        heading: 'Education Partners',
        cards: educationCards
    },
    {
        heading: 'General Partners',
        cards: generalCards
    }
].filter((section) => section.cards.length > 0);

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
                <h2 className="text-center sponsor-preview-title techstorm-arcade-title" style={{ marginBottom: '55px' }}>
                    Our Sponsors
                </h2>

                {orderedSponsorSections.map((group) => (
                    <div className="sponsor-group-block" key={group.heading}>
                        <h3 className="sponsor-section-title">{group.heading}</h3>
                        <div className="sponsor-mystery-row" aria-label={`${group.heading} sponsors`}>
                            {group.cards.filter(logo => logo.name !== 'Featherless').map((logo) => (
                                <PixelCard
                                    key={`${group.heading}-${logo.category}-${logo.name}`}
                                    className="sponsor-pixel-card"
                                    variant="yellow"
                                    speed={22}
                                    gap={4}
                                    colors="#ffe58f,#ffc447,#ff9f1a"
                                    noFocus
                                >
                                    <div className="sponsor-card-inner">
                                        <img
                                            src={logo.src}
                                            alt={logo.name}
                                            className="sponsor-placeholder-box"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <p className="sponsor-card-category">{logo.category}</p>
                                    </div>
                                </PixelCard>
                            ))}
                        </div>
                    </div>
                ))}

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