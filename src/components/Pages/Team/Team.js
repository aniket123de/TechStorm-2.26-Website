import React, { useEffect, useState } from 'react';
import { cloudinaryImages } from '../../../config/cloudinary';
const teamBg = cloudinaryImages.backgrounds.teamsbg;
const teamBgMobile = cloudinaryImages.mobile.bg2;
import SectionTitle from '../../Utilities/SectionTitle/SectionTitle';
import ProfileCardMember from '../../Utilities/Team/ProfileCardMember';
import { coreMembers } from './teamData';
import TeamEventCards from './TeamEventCards';
import './Team.css';

const MOBILE_BREAKPOINT = 768;

const Teams = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener('resize', check);
    check();
    return () => window.removeEventListener('resize', check);
  }, []);

  const bg = isMobile ? teamBgMobile : teamBg;

  return (
    <React.Fragment>
      {/* Image background for Organizing Committee section */}
      <div
        className="team-org-hero"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="team-hero-overlay">
          <section className="breadcrumb-area d-flex align-items-center team-breadcrumb">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-12 col-lg-12">
                </div>
              </div>
            </div>
          </section>
          <section id="team" className="team-area2 team-org-section pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 p-relative">
                  <SectionTitle
                    titlefirst="Organizing Committee"
                    
                    className="techstorm-arcade-title gallery-heading-title"
                Committee   />
                </div>
              </div>
              <div className="row team-org-members-row">
                <ProfileCardMember teamData={coreMembers} />
              </div>
            </div>
          </section>
        </div>
        <div className="team-hero-bottom-accent" aria-hidden="true" />
      </div>

      {/* Co-ordinators & Volunteers: arcade bg, dark overlay via CSS */}
      <section
        className="team-events-section"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container">
          <div className="team-events-heading">
            <span className="team-events-badge">Event Teams</span>
            <h2 className="team-events-title">Co-ordinators &amp; Volunteers</h2>
            <p className="team-events-subtitle">Student Co-ordinators and Volunteers for each event</p>
            <div className="team-events-title-underline" />
          </div>
          <TeamEventCards />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Teams;
