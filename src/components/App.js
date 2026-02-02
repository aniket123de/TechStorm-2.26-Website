import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import Header from './Utilities/Header/Header';
import collegelogo from '../assets/img/logo/college-logo.png';
import PillNav from './Utilities/PillNav/PillNav';
import Home from './Pages/Home/HomeMain/HomeMain';
import HomeTwo from './Pages/Home/HomeTwo/HomeTwo';
import HomeThree from './Pages/Home/HomeThree/HomeThree';
import Footer from './Utilities/Footer/Footer';
import AboutUs from './Pages/AboutUs/AboutUs';
import Gallery from './Pages/Gallery/Gallery';
import Teams from './Pages/Team/Team';
import Faqs from './Pages/Faq/Faq';
import Games from './Pages/Games/Games';
import Matchese from './Pages/Matchese/Matchese';
import MatcheseDetails from './Pages/MatcheseDetails/MatcheseDetails';
import LiveStreaming from './Pages/LiveStreaming/LiveStreaming';
import Error404 from './Pages/404';
import BlogPost from './Pages/Blog/Blog';
import ContactUs from './Pages/ContactUs/ContactUs';
import SinglePost from './Pages/SinglePost/SinglePost';
import Events from './Pages/Events/Events';

const navItems = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Team', href: '/team' }
];

const AppContent = () => {
  const location = useLocation();
  
  return (
    <div className="App">

      {/* Header */}
      <Header />

      {/* PillNav - Desktop Only */}
      <PillNav
          logo={collegelogo}
          logoAlt="College Logo"
          items={navItems}
          activeHref={location.pathname}
          baseColor="#ffc010"
          pillColor="#1a0e22"
          hoveredPillTextColor="#000000"
          pillTextColor="#ffffff"
          initialLoadAnimation={true}
      />

      <Switch>

        <Route exact path="/" component={Home} />
        <Route exact path="/home-two" component={HomeTwo} />
        <Route exact path="/home-three" component={HomeThree} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/team" component={Teams} />
        <Route exact path="/faq" component={Faqs} />
        <Route exact path="/game" component={Games} />
        <Route exact path="/matchese" component={Matchese} />
        <Route exact path="/matchese-details" component={MatcheseDetails} />
        <Route exact path="/live-streaming" component={LiveStreaming} />
        <Route exact path="/404" component={Error404} />
        <Route exact path="/blog" component={BlogPost} />
        <Route exact path="/single-post" component={SinglePost} />
        <Route exact path="/contact" component={ContactUs} />

      </Switch>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
