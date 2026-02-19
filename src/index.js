import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// import 'pixel-retroui/dist/fonts.css'; // Commented out - path doesn't exist in pixel-retroui package
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/css/dripicons.css';
import './assets/css/magnific-popup.css';
import './assets/fontawesome/css/all.min.css';
import './assets/font-flaticon/flaticon.css';
import './assets/css/slick.css';
import './assets/css/meanmenu.css';
import './assets/css/default.css';
import './assets/css/style.css';
import './assets/css/responsive.css';
import './components/Utilities/Button/Button8bit.css';
// import 'nes.css/css/nes.min.css'; // Removed because module not found
import './assets/css/nes-custom.css';
import './assets/css/scroll-animations.css';
import './assets/css/techstorm-theme.css';

ReactDOM.render(<App />, document.getElementById('root'));

// ─── Service Worker Registration (PWA) ───────────────────────────────────────
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        if (process.env.NODE_ENV === 'production') {
            navigator.serviceWorker
                .register(`${process.env.PUBLIC_URL}/service-worker.js`)
                .then((registration) => {
                    console.log('[TechStorm PWA] Service Worker registered! Scope:', registration.scope);

                    // Check for updates every 60 seconds
                    setInterval(() => registration.update(), 60 * 1000);

                    registration.onupdatefound = () => {
                        const newWorker = registration.installing;
                        if (!newWorker) return;
                        newWorker.onstatechange = () => {
                            if (
                                newWorker.state === 'installed' &&
                                navigator.serviceWorker.controller
                            ) {
                                console.log('[TechStorm PWA] New version available! Reload to update.');
                            }
                        };
                    };
                })
                .catch((error) => {
                    console.error('[TechStorm PWA] Service Worker registration failed:', error);
                });
        } else {
            console.log('[TechStorm PWA] Service Worker skipped in development mode.');
        }
    });
}
