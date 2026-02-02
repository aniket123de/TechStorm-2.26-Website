import React from 'react';
import Button8bit from './Button8bit';
import './ButtonDemo.css';

/**
 * Button8bit Component Demo
 * Showcases all variants, sizes, and states of the 8-bit button component
 */
const ButtonDemo = () => {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
        <div className="button-demo">
            <div className="demo-container">
                <h1 className="demo-title">8-Bit Button Component Demo</h1>
                <p className="demo-subtitle">Retro arcade-style buttons matching TechStorm's golden theme</p>

                {/* Variants Section */}
                <section className="demo-section">
                    <h2>Variants</h2>
                    <div className="button-row">
                        <div className="button-example">
                            <Button8bit variant="primary">Primary</Button8bit>
                            <span className="button-label">Primary</span>
                        </div>
                        <div className="button-example">
                            <Button8bit variant="secondary">Secondary</Button8bit>
                            <span className="button-label">Secondary</span>
                        </div>
                        <div className="button-example">
                            <Button8bit variant="outline">Outline</Button8bit>
                            <span className="button-label">Outline</span>
                        </div>
                        <div className="button-example">
                            <Button8bit variant="ghost">Ghost</Button8bit>
                            <span className="button-label">Ghost</span>
                        </div>
                    </div>
                </section>

                {/* Sizes Section */}
                <section className="demo-section">
                    <h2>Sizes</h2>
                    <div className="button-row align-center">
                        <div className="button-example">
                            <Button8bit variant="primary" size="small">Small</Button8bit>
                            <span className="button-label">Small</span>
                        </div>
                        <div className="button-example">
                            <Button8bit variant="primary" size="medium">Medium</Button8bit>
                            <span className="button-label">Medium</span>
                        </div>
                        <div className="button-example">
                            <Button8bit variant="primary" size="large">Large</Button8bit>
                            <span className="button-label">Large</span>
                        </div>
                    </div>
                </section>

                {/* Interactive States */}
                <section className="demo-section">
                    <h2>States</h2>
                    <div className="button-row">
                        <div className="button-example">
                            <Button8bit variant="primary" onClick={handleClick}>
                                Clickable
                            </Button8bit>
                            <span className="button-label">Clickable</span>
                        </div>
                        <div className="button-example">
                            <Button8bit variant="primary" disabled>
                                Disabled
                            </Button8bit>
                            <span className="button-label">Disabled</span>
                        </div>
                    </div>
                </section>

                {/* Link Types */}
                <section className="demo-section">
                    <h2>Link Types</h2>
                    <div className="button-row">
                        <div className="button-example">
                            <Button8bit to="/about" variant="primary">
                                React Router
                            </Button8bit>
                            <span className="button-label">React Router Link</span>
                        </div>
                        <div className="button-example">
                            <Button8bit href="https://google.com" variant="secondary">
                                External Link
                            </Button8bit>
                            <span className="button-label">External Anchor</span>
                        </div>
                    </div>
                </section>

                {/* Form Button */}
                <section className="demo-section">
                    <h2>Form Usage</h2>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
                        <div className="form-demo">
                            <input type="text" placeholder="Enter your name" className="demo-input" />
                            <Button8bit type="submit" variant="primary" size="large">
                                Submit Form
                            </Button8bit>
                        </div>
                    </form>
                </section>

                {/* Button Groups */}
                <section className="demo-section">
                    <h2>Button Groups</h2>
                    <div className="btn-8bit-group">
                        <Button8bit variant="primary">Action 1</Button8bit>
                        <Button8bit variant="secondary">Action 2</Button8bit>
                        <Button8bit variant="outline">Action 3</Button8bit>
                    </div>
                </section>

                {/* Combined Variants and Sizes */}
                <section className="demo-section">
                    <h2>All Combinations</h2>
                    
                    <h3 className="subsection-title">Small Buttons</h3>
                    <div className="button-row">
                        <Button8bit variant="primary" size="small">Primary</Button8bit>
                        <Button8bit variant="secondary" size="small">Secondary</Button8bit>
                        <Button8bit variant="outline" size="small">Outline</Button8bit>
                        <Button8bit variant="ghost" size="small">Ghost</Button8bit>
                    </div>

                    <h3 className="subsection-title">Medium Buttons</h3>
                    <div className="button-row">
                        <Button8bit variant="primary" size="medium">Primary</Button8bit>
                        <Button8bit variant="secondary" size="medium">Secondary</Button8bit>
                        <Button8bit variant="outline" size="medium">Outline</Button8bit>
                        <Button8bit variant="ghost" size="medium">Ghost</Button8bit>
                    </div>

                    <h3 className="subsection-title">Large Buttons</h3>
                    <div className="button-row">
                        <Button8bit variant="primary" size="large">Primary</Button8bit>
                        <Button8bit variant="secondary" size="large">Secondary</Button8bit>
                        <Button8bit variant="outline" size="large">Outline</Button8bit>
                        <Button8bit variant="ghost" size="large">Ghost</Button8bit>
                    </div>
                </section>

                {/* With Icons */}
                <section className="demo-section">
                    <h2>With Icons</h2>
                    <div className="button-row">
                        <Button8bit variant="primary" size="large">
                            <i className="fa fa-rocket"></i> Launch
                        </Button8bit>
                        <Button8bit variant="secondary" size="large">
                            <i className="fa fa-download"></i> Download
                        </Button8bit>
                        <Button8bit variant="outline" size="large">
                            Play <i className="fa fa-play"></i>
                        </Button8bit>
                    </div>
                </section>

                {/* Full Width */}
                <section className="demo-section">
                    <h2>Full Width</h2>
                    <Button8bit variant="primary" size="large" className="btn-8bit--full-width">
                        Full Width Button
                    </Button8bit>
                </section>

                {/* Color Palette Reference */}
                <section className="demo-section">
                    <h2>Color Palette</h2>
                    <div className="color-palette">
                        <div className="color-swatch">
                            <div className="swatch" style={{background: '#ffc010'}}></div>
                            <span>#ffc010</span>
                            <span className="color-name">Primary Gold</span>
                        </div>
                        <div className="color-swatch">
                            <div className="swatch" style={{background: '#1a0e22'}}></div>
                            <span>#1a0e22</span>
                            <span className="color-name">Dark Purple</span>
                        </div>
                        <div className="color-swatch">
                            <div className="swatch" style={{background: '#cc9900'}}></div>
                            <span>#cc9900</span>
                            <span className="color-name">Dark Gold</span>
                        </div>
                        <div className="color-swatch">
                            <div className="swatch" style={{background: '#ffd966'}}></div>
                            <span>#ffd966</span>
                            <span className="color-name">Light Gold</span>
                        </div>
                        <div className="color-swatch">
                            <div className="swatch" style={{background: '#2d1b3d'}}></div>
                            <span>#2d1b3d</span>
                            <span className="color-name">Mid Purple</span>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ButtonDemo;
