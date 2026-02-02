import React from "react";
import { Link } from "react-router-dom";
import "./Offcanvas.css";

const Offcanvas = ({ onOpne, onClose }) => {

    return (
        <React.Fragment>
            <div className={`offcanvas-menu offcanvas-retro ${onOpne ? 'active' : ''}`}>
                <span className="menu-close" onClick={() => onClose(!onOpne)}>
                    <i className="fas fa-times"></i>
                </span>
                
                {/* Retro Menu Header */}
                <div className="retro-menu-header">
                    <h2 className="retro-menu-title">Main Menu</h2>
                    <p className="retro-menu-subtitle">Retro 8-bit Quest</p>
                </div>

                <div id="cssmenu3" className="menu-one-page-menu-container retro-menu-container">
                    <ul id="menu-one-page-menu-2" className="menu retro-menu-list">
                        <li className="menu-item retro-menu-item">
                            <a 
                                href="#home" 
                                className="retro-menu-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    onClose(!onOpne);
                                }}
                            >
                                {'START GAME'}
                            </a>
                        </li>
                        <li className="menu-item retro-menu-item">
                            <Link to={'/events'} className="retro-menu-button">{'EVENTS'}</Link>
                        </li>
                        <li className="menu-item retro-menu-item">
                            <a 
                                href="#about" 
                                className="retro-menu-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const element = document.getElementById('about');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        onClose(!onOpne);
                                    }
                                }}
                            >
                                {'ABOUT'}
                            </a>
                        </li>
                        <li className="menu-item retro-menu-item">
                            <Link to={'/gallery'} className="retro-menu-button">{'GALLERY'}</Link>
                        </li>
                        <li className="menu-item retro-menu-item">
                            <Link to={'/schedule'} className="retro-menu-button">{'SCHEDULE'}</Link>
                        </li>
                        <li className="menu-item retro-menu-item">
                            <Link to={'/team'} className="retro-menu-button">{'TEAM'}</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
            <div className={`offcanvas-overly ${onOpne ? 'active' : ''}`} 
            onClick={() => onClose(!onOpne)}></div>
        </React.Fragment>
    );

}

export default Offcanvas;