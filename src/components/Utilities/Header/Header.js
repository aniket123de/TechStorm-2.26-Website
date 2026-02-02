import React, { useState, useEffect } from 'react';

import MobileMenu from './MobileMenu/MobileMenu';
import Logo from '../Logo/Logo';
import collegelogo from '../../../assets/img/logo/college-logo.png';
import IIC_logo from '../../../assets/img/logo/IIC_logo.png';
import Abhiyantran_logo from '../../../assets/img/logo/Abhiyantran-logo.png';
import toggolIcon from '../../../assets/img/bg/toggle-menu.png';
import Offcanvas from '../Offcanvas/Offcanvas';



const Header = () => {

    const [openCanvas, setOpenCanves] = useState(false);

    const [iconToggle, setIconToggle] = useState(false);
    
    const [isScrolled, setIsScrolled] = useState(false);

    const heandelOpen = () => {
        setOpenCanves(!openCanvas);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
                document.body.classList.add('header-scrolled');
            } else {
                setIsScrolled(false);
                document.body.classList.remove('header-scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('header-scrolled');
        };
    }, []);


    return (
        <React.Fragment>
            <header className='header-area header-three p-relative'>
                <div 
                    id="header-sticky" 
                    className={`menu-area ${isScrolled ? 'scrolled' : ''}`}
                    style={{
                        background: isScrolled ? 'rgba(0, 0, 0, 0.85) !important' : undefined,
                        backdropFilter: isScrolled ? 'blur(10px) !important' : undefined,
                        WebkitBackdropFilter: isScrolled ? 'blur(10px) !important' : undefined,
                        transition: 'all 0.3s ease',
                        position: isScrolled ? 'fixed' : undefined,
                        top: isScrolled ? 0 : undefined,
                        left: isScrolled ? 0 : undefined,
                        right: isScrolled ? 0 : undefined,
                        width: isScrolled ? '100%' : undefined,
                        zIndex: 9999,
                        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : undefined
                    }}
                >
                    <div className="container-fluid pl-50 pr-50">
                        <div className="second-menu">
                            <div className="row align-items-center">
                                <div className="col-xl-1 col-lg-1 col-6">
                                    <div className="logo ">
                                        <Logo logo={collegelogo}/>
                                        <Logo logo={IIC_logo} />
                                        <Logo logo={Abhiyantran_logo}/>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 text-right d-none d-lg-block mt-30 mb-30 ml-auto">
                                    <button onClick={heandelOpen} className="menu-tigger" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <img src={toggolIcon} alt="Toggle Icon" />
                                    </button>
                                </div>
                                <div className="col-6 d-block d-lg-none">

                                    <div className="mobile-toggler text-right">
                                        <button onClick={() => setIconToggle(!iconToggle)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <i className={`${iconToggle ? 'fas fa-times' : 'fa fa-bars'}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MobileMenu toggleMenu={iconToggle} onClose={setIconToggle} />
                    </div>
                </div>
            </header>
            <Offcanvas onOpne={openCanvas} onClose={setOpenCanves} />

        </React.Fragment>
    )
}

export default Header;
