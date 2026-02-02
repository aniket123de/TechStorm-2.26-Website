import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './MobileMenu.css';

class MobileMenu extends Component {

    state = {
        isOpen: false,
        isOpenTwo: false,
    }

    isDropDownOpenOne = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            isOpenTwo: false
        })
    }

    isDropDownOpenTwo = () => {
        this.setState({
            isOpen: false,
            isOpenTwo: !this.state.isOpenTwo
        })
    }


    render() {

        return (
            <div>
                {/* Overlay backdrop */}
                <div 
                    className={`mobile-menu-overlay ${this.props.toggleMenu ? 'active' : ''}`}
                    onClick={() => this.props.onClose(false)}
                />
                
                {/* Close button - above overlay */}
                <span className={`mobile-menu-close ${this.props.toggleMenu ? 'active' : ''}`} onClick={() => this.props.onClose(false)}>
                    <i className="fas fa-times"></i>
                </span>
                
                <div className={`mobile-menu ${this.props.toggleMenu ? 'mobile-menu-active' : ''}`}>
                    <ul className="mean-nav">
                        <li>
                            <Link onClick={() => this.props.onClose(false)}
                                to={'/'}>
                                {'Home'}
                            </Link>
                        </li>
                        
                        <li>
                            <Link onClick={() => this.props.onClose(false)}
                                to={'/events'}>
                                {'Events'}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => this.props.onClose(false)}
                                to={'/gallery'}>
                                {'Gallery'}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => this.props.onClose(false)}
                                to={'/schedule'}>
                                {'Schedule'}
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => this.props.onClose(false)}
                                to={'/team'}>
                                {'Team'}
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}
export default MobileMenu;