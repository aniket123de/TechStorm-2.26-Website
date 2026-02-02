import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MobileMenu.js';

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
                <div className={`mobile-menu ${this.props.toggleMenu ? 'mobile-menu-active' : ''}`}>
                    <ul className="mean-nav">
                        <li onClick={this.isDropDownOpenOne}>
                            {'Home'}
                            <i className="fa fa-angle-down"></i>
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