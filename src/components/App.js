import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';

import Header from './Utilities/Header/Header';
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
import Schedule from './Pages/Schedule/Schedule';

// Import Event Detail Pages
import CodeBeeEvent from './Pages/EventDetail/CodeBee/CodeBeeEvent';
import HackStormEvent from './Pages/EventDetail/HackStorm/HackStormEvent';
import TechnomaniaEvent from './Pages/EventDetail/Technomania/TechnomaniaEvent';
import OmegatrixEvent from './Pages/EventDetail/Omegatrix/OmegatrixEvent';
import TechHuntEvent from './Pages/EventDetail/TechHunt/TechHuntEvent';
import RoNavigatorEvent from './Pages/EventDetail/RoNavigator/RoNavigatorEvent';
import RoCombatEvent from './Pages/EventDetail/RoCombat/RoCombatEvent';
import RoSoccerEvent from './Pages/EventDetail/RoSoccer/RoSoccerEvent';
import RoTerranceEvent from './Pages/EventDetail/RoTerrance/RoTerranceEvent';
import CreativeCanvasEvent from './Pages/EventDetail/CreativeCanvas/CreativeCanvasEvent';
import PassionWithReelsEvent from './Pages/EventDetail/PassionWithReels/PassionWithReelsEvent';
import ForzaHorizonEvent from './Pages/EventDetail/ForzaHorizon/ForzaHorizonEvent';
import FifaMobileEvent from './Pages/EventDetail/FifaMobile/FifaMobileEvent';
import KhetEvent from './Pages/EventDetail/Khet/KhetEvent';
import RoSumoEvent from './Pages/EventDetail/RoSumo/RoSumoEvent';

// Import Registration Pages
import CodeBeeRegistration from './Pages/Registration/CodeBeeRegistration';
import HackStormRegistration from './Pages/Registration/HackStormRegistration';
import TechnomaniaRegistration from './Pages/Registration/TechnomaniaRegistration';
import OmegatrixRegistration from './Pages/Registration/OmegatrixRegistration';
import TechHuntRegistration from './Pages/Registration/TechHuntRegistration';
import RoNavigatorRegistration from './Pages/Registration/RoNavigatorRegistration';
import RoCombatRegistration from './Pages/Registration/RoCombatRegistration';
import RoSoccerRegistration from './Pages/Registration/RoSoccerRegistration';
import RoTerranceRegistration from './Pages/Registration/RoTerranceRegistration';
import CreativeCanvasRegistration from './Pages/Registration/CreativeCanvasRegistration';
import PassionWithReelsRegistration from './Pages/Registration/PassionWithReelsRegistration';
import ForzaHorizonRegistration from './Pages/Registration/ForzaHorizonRegistration';
import FifaMobileRegistration from './Pages/Registration/FifaMobileRegistration';
import KhetRegistration from './Pages/Registration/KhetRegistration';

// Import Admin Pages
import AdminRoleSelection from './Pages/Admin/AdminRoleSelection';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';

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
  const [activeSection, setActiveSection] = React.useState('');
  
  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // Track scroll position and update active section
  React.useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/') return;
      
      const sections = ['home', 'about'];
      const scrollPosition = window.scrollY + 100; // Offset for header
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);
  
  // Determine active href including hash
  const getActiveHref = () => {
    // For home page sections
    if (location.pathname === '/') {
      if (location.hash) {
        return `/${location.hash}`;
      }
      // Use detected section based on scroll position
      if (activeSection) {
        return `/#${activeSection}`;
      }
      return '/#home';
    }
    // For other pages
    return location.pathname;
  };
  
  return (
    <div className="App">

      {/* Integrated Header with PillNav - Hide on admin routes */}
      {!isAdminRoute && <Header navItems={navItems} activeHref={getActiveHref()} />}

      <Switch>

        {/* Admin Routes */}
        <Route exact path="/admin" component={AdminRoleSelection} />
        <Route exact path="/admin/core" component={AdminLogin} />
        <Route exact path="/admin/coordinator" component={AdminLogin} />
        <Route exact path="/admin/volunteer" component={AdminLogin} />
        <Route exact path="/admin/core/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/coordinator/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/volunteer/dashboard" component={AdminDashboard} />

        <Route exact path="/" component={Home} />
        <Route exact path="/home-two" component={HomeTwo} />
        <Route exact path="/home-three" component={HomeThree} />
        <Route exact path="/about" component={AboutUs} />
        <Route exact path="/events" component={Events} />
        
        {/* Event Detail Routes */}
        <Route exact path="/events/code-bee" component={CodeBeeEvent} />
        <Route exact path="/events/hack-storm" component={HackStormEvent} />
        <Route exact path="/events/technomania" component={TechnomaniaEvent} />
        <Route exact path="/events/omegatrix" component={OmegatrixEvent} />
        <Route exact path="/events/tech-hunt" component={TechHuntEvent} />
        <Route exact path="/events/ro-navigator" component={RoNavigatorEvent} />
        <Route exact path="/events/ro-combat" component={RoCombatEvent} />
        <Route exact path="/events/ro-soccer" component={RoSoccerEvent} />
        <Route exact path="/events/ro-terrance" component={RoTerranceEvent} />
        <Route exact path="/events/ro-sumo" component={RoSumoEvent} />
        <Route exact path="/events/creative-canvas" component={CreativeCanvasEvent} />
        <Route exact path="/events/passion-with-reels" component={PassionWithReelsEvent} />
        <Route exact path="/events/forza-horizon" component={ForzaHorizonEvent} />
        <Route exact path="/events/fifa-mobile" component={FifaMobileEvent} />
        <Route exact path="/events/khet" component={KhetEvent} />
        
        {/* Registration Routes */}
        <Route exact path="/register/code-bee" component={CodeBeeRegistration} />
        <Route exact path="/register/hack-storm" component={HackStormRegistration} />
        <Route exact path="/register/technomania" component={TechnomaniaRegistration} />
        <Route exact path="/register/omegatrix" component={OmegatrixRegistration} />
        <Route exact path="/register/tech-hunt" component={TechHuntRegistration} />
        <Route exact path="/register/ro-navigator" component={RoNavigatorRegistration} />
        <Route exact path="/register/ro-combat" component={RoCombatRegistration} />
        <Route exact path="/register/ro-soccer" component={RoSoccerRegistration} />
        <Route exact path="/register/ro-terrance" component={RoTerranceRegistration} />
        <Route exact path="/register/creative-canvas" component={CreativeCanvasRegistration} />
        <Route exact path="/register/passion-with-reels" component={PassionWithReelsRegistration} />
        <Route exact path="/register/forza-horizon" component={ForzaHorizonRegistration} />
        <Route exact path="/register/fifa-mobile" component={FifaMobileRegistration} />
        <Route exact path="/register/khet" component={KhetRegistration} />
        
        <Route exact path="/gallery" component={Gallery} />
        <Route exact path="/schedule" component={Schedule} />
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
      
      {/* Footer - Hide on admin routes */}
      {!isAdminRoute && <Footer />}
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
