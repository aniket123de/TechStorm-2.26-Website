import React from 'react';
import { Link } from 'react-router-dom';
import './Button8bit.css';

/**
 * 8-Bit Retro Button Component
 * A pixel-perfect button with retro gaming aesthetics and beige/brown color scheme
 * 
 * @param {string} variant - Button style variant: 'primary', 'secondary', 'outline', 'ghost'
 * @param {string} size - Button size: 'small', 'medium', 'large'
 * @param {string} to - Navigation path for Link buttons
 * @param {string} href - External URL for anchor buttons
 * @param {function} onClick - Click handler for button elements
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Disabled state
 * @param {string} type - Button type for form buttons: 'button', 'submit', 'reset'
 * @param {node} children - Button content
 */
const Button8bit = ({ 
    variant = 'primary', 
    size = 'medium',
    to,
    href,
    onClick,
    className = '',
    disabled = false,
    type = 'button',
    children,
    ...props 
}) => {
    const baseClass = 'btn-8bit';
    const classes = `${baseClass} ${baseClass}--${variant} ${baseClass}--${size} ${className}`.trim();

    // If 'to' prop is provided, render as Link
    if (to) {
        return (
            <Link 
                to={to} 
                className={`${classes} ${disabled ? 'btn-8bit--disabled' : ''}`}
                onClick={disabled ? (e) => e.preventDefault() : onClick}
                {...props}
            >
                <span className="btn-8bit__text">{children}</span>
                <span className="btn-8bit__shadow"></span>
            </Link>
        );
    }

    // If 'href' prop is provided, render as anchor
    if (href) {
        return (
            <a 
                href={href} 
                className={`${classes} ${disabled ? 'btn-8bit--disabled' : ''}`}
                onClick={disabled ? (e) => e.preventDefault() : onClick}
                {...props}
            >
                <span className="btn-8bit__text">{children}</span>
                <span className="btn-8bit__shadow"></span>
            </a>
        );
    }

    // Default: render as button
    return (
        <button 
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            <span className="btn-8bit__text">{children}</span>
            <span className="btn-8bit__shadow"></span>
        </button>
    );
};

export default Button8bit;
