import React, { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

import PacManLoader from "./PacManLoader/PacManLoader";
import Header from "./Utilities/Header/Header";
import Footer from "./Utilities/Footer/Footer";

// Eager load only critical components (Home page)
import Home from "./Pages/Home/HomeMain/HomeMain";

// Lazy load all other pages to reduce initial bundle size
const AboutUs = lazy(() => import("./Pages/AboutUs/AboutUs"));
const Gallery = lazy(() => import("./Pages/Gallery/Gallery"));
const Teams = lazy(() => import("./Pages/Team/Team"));
const Faqs = lazy(() => import("./Pages/Faq/Faq"));
const Error404 = lazy(() => import("./Pages/404"));
const Events = lazy(() => import("./Pages/Events/Events"));
const Schedule = lazy(() => import("./Pages/Schedule/Schedule"));

// Lazy load Event Detail Pages
const CodeBeeEvent = lazy(() => import("./Pages/EventDetail/CodeBee/CodeBeeEvent"));
const HackStormEvent = lazy(() => import("./Pages/EventDetail/HackStorm/HackStormEvent"));
const TechnomaniaEvent = lazy(() => import("./Pages/EventDetail/Technomania/TechnomaniaEvent"));
const OmegatrixEvent = lazy(() => import("./Pages/EventDetail/Omegatrix/OmegatrixEvent"));
const TechHuntEvent = lazy(() => import("./Pages/EventDetail/TechHunt/TechHuntEvent"));
const RoNavigatorEvent = lazy(() => import("./Pages/EventDetail/RoNavigator/RoNavigatorEvent"));
const RoCombatEvent = lazy(() => import("./Pages/EventDetail/RoCombat/RoCombatEvent"));
const RoSoccerEvent = lazy(() => import("./Pages/EventDetail/RoSoccer/RoSoccerEvent"));
const RoTerranceEvent = lazy(() => import("./Pages/EventDetail/RoTerrance/RoTerranceEvent"));
const CreativeCanvasEvent = lazy(() => import("./Pages/EventDetail/CreativeCanvas/CreativeCanvasEvent"));
const PassionWithReelsEvent = lazy(() => import("./Pages/EventDetail/PassionWithReels/PassionWithReelsEvent"));
const ForzaHorizonEvent = lazy(() => import("./Pages/EventDetail/ForzaHorizon/ForzaHorizonEvent"));
const FifaMobileEvent = lazy(() => import("./Pages/EventDetail/FifaMobile/FifaMobileEvent"));
const KhetEvent = lazy(() => import("./Pages/EventDetail/Khet/KhetEvent"));
const RoSumoEvent = lazy(() => import("./Pages/EventDetail/RoSumo/RoSumoEvent"));

// Lazy load Registration Pages
const CodeBeeRegistration = lazy(() => import("./Pages/Registration/CodeBeeRegistration"));
const HackStormRegistration = lazy(() => import("./Pages/Registration/HackStormRegistration"));
const TechnomaniaRegistration = lazy(() => import("./Pages/Registration/TechnomaniaRegistration"));
const OmegatrixRegistration = lazy(() => import("./Pages/Registration/OmegatrixRegistration"));
const TechHuntRegistration = lazy(() => import("./Pages/Registration/TechHuntRegistration"));
const RoNavigatorRegistration = lazy(() => import("./Pages/Registration/RoNavigatorRegistration"));
const RoCombatRegistration = lazy(() => import("./Pages/Registration/RoCombatRegistration"));
const RoSoccerRegistration = lazy(() => import("./Pages/Registration/RoSoccerRegistration"));
const RoTerranceRegistration = lazy(() => import("./Pages/Registration/RoTerranceRegistration"));
const RoSumoRegistration = lazy(() => import("./Pages/Registration/RoSumoRegistration"));
const CreativeCanvasRegistration = lazy(() => import("./Pages/Registration/CreativeCanvasRegistration"));
const PassionWithReelsRegistration = lazy(() => import("./Pages/Registration/PassionWithReelsRegistration"));
const ForzaHorizonRegistration = lazy(() => import("./Pages/Registration/ForzaHorizonRegistration"));
const FifaMobileRegistration = lazy(() => import("./Pages/Registration/FifaMobileRegistration"));
const KhetRegistration = lazy(() => import("./Pages/Registration/KhetRegistration"));

// Lazy load Admin Pages
const AdminRoleSelection = lazy(() => import("./Pages/Admin/AdminRoleSelection"));
const AdminLogin = lazy(() => import("./Pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const RegistrationsPage = lazy(() => import("./Pages/Admin/RegistrationsPage"));
const EventsPage = lazy(() => import("./Pages/Admin/EventsPage"));
const StatisticsPage = lazy(() => import("./Pages/Admin/StatisticsPage"));

// Lazy load Verify Registration Page
const VerifyRegistration = lazy(() => import("./Pages/VerifyRegistration/VerifyRegistration"));

// Lazy load Merchandise Page
// To switch to the full catalogue, swap the import below to MerchandiseCatalog
//const Merchandise = lazy(() => import("./Pages/Merchandise/Merchandise"));
 const Merchandise = lazy(() => import("./Pages/Merchandise/MerchandiseCatalog"));

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Schedule", href: "/schedule" },
  { label: "Team", href: "/team" },
];

const AppContent = () => {
  const location = useLocation();

  // Check if current route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Google Analytics Page View Tracking
  React.useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-QNJE6CJ6DW', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Determine active href including hash
  const getActiveHref = () => {
    // For home page - always keep Home button active
    if (location.pathname === "/") {
      return "/#home";
    }
    // For other pages
    return location.pathname;
  };

  return (
    <div className="App">
      {/* Integrated Header with PillNav - Hide on admin routes */}
      {!isAdminRoute && (
        <Header navItems={navItems} activeHref={getActiveHref()} />
      )}

      {/* Page content wrapper — the ::after fade bleeds into the footer on every page */}
      <div style={{ position: "relative" }}>
        <Suspense
          fallback={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
              fontSize: '1.5rem',
              color: '#fff'
            }}>
              Loading...
            </div>
          }
        >
          <Switch>
            {/* Admin Routes */}
            <Route exact path="/admin" component={AdminRoleSelection} />
            <Route exact path="/admin/core" component={AdminLogin} />
            <Route exact path="/admin/coordinator" component={AdminLogin} />
            <Route exact path="/admin/volunteer" component={AdminLogin} />
            <Route
              exact
              path="/admin/core/dashboard"
              component={AdminDashboard}
            />
            <Route
              exact
              path="/admin/coordinator/dashboard"
              component={AdminDashboard}
            />
            <Route
              exact
              path="/admin/volunteer/dashboard"
              component={AdminDashboard}
            />
            <Route
              exact
              path="/admin/:role/registrations"
              component={RegistrationsPage}
            />
            <Route exact path="/admin/:role/events" component={EventsPage} />
            <Route
              exact
              path="/admin/:role/statistics"
              component={StatisticsPage}
            />

          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/events" component={Events} />

          {/* Event Detail Routes */}
          <Route exact path="/events/code-bee" component={CodeBeeEvent} />
          <Route exact path="/events/hack-storm" component={HackStormEvent} />
          <Route
            exact
            path="/events/technomania"
            component={TechnomaniaEvent}
          />
          <Route exact path="/events/omegatrix" component={OmegatrixEvent} />
          <Route exact path="/events/tech-hunt" component={TechHuntEvent} />
          <Route
            exact
            path="/events/ro-navigator"
            component={RoNavigatorEvent}
          />
          <Route exact path="/events/ro-combat" component={RoCombatEvent} />
          <Route exact path="/events/ro-soccer" component={RoSoccerEvent} />
          <Route exact path="/events/ro-terrance" component={RoTerranceEvent} />
          <Route exact path="/events/ro-sumo" component={RoSumoEvent} />
          <Route
            exact
            path="/events/creative-canvas"
            component={CreativeCanvasEvent}
          />
          <Route
            exact
            path="/events/passion-with-reels"
            component={PassionWithReelsEvent}
          />
          <Route
            exact
            path="/events/forza-horizon"
            component={ForzaHorizonEvent}
          />
          <Route exact path="/events/fifa-mobile" component={FifaMobileEvent} />
          <Route exact path="/events/khet" component={KhetEvent} />

          {/* Registration Routes */}
          <Route
            exact
            path="/register/code-bee"
            component={CodeBeeRegistration}
          />
          <Route
            exact
            path="/register/hack-storm"
            component={HackStormRegistration}
          />
          <Route
            exact
            path="/register/technomania"
            component={TechnomaniaRegistration}
          />
          <Route
            exact
            path="/register/omegatrix"
            component={OmegatrixRegistration}
          />
          <Route
            exact
            path="/register/tech-hunt"
            component={TechHuntRegistration}
          />
          <Route
            exact
            path="/register/ro-navigator"
            component={RoNavigatorRegistration}
          />
          <Route
            exact
            path="/register/ro-combat"
            component={RoCombatRegistration}
          />
          <Route
            exact
            path="/register/ro-soccer"
            component={RoSoccerRegistration}
          />
          <Route
            exact
            path="/register/ro-terrance"
            component={RoTerranceRegistration}
          />
          <Route
            exact
            path="/register/ro-sumo"
            component={RoSumoRegistration}
          />
          <Route
            exact
            path="/register/creative-canvas"
            component={CreativeCanvasRegistration}
          />
          <Route
            exact
            path="/register/passion-with-reels"
            component={PassionWithReelsRegistration}
          />
          <Route
            exact
            path="/register/forza-horizon"
            component={ForzaHorizonRegistration}
          />
          <Route
            exact
            path="/register/fifa-mobile"
            component={FifaMobileRegistration}
          />
          <Route exact path="/register/khet" component={KhetRegistration} />

          {/* Verify Registration Route */}
          <Route exact path="/verify-registration" component={VerifyRegistration} />

          <Route exact path="/merchandise" component={Merchandise} />

          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/schedule" component={Schedule} />
          <Route exact path="/team" component={Teams} />
          <Route exact path="/faq" component={Faqs} />
          <Route exact path="/404" component={Error404} />
        </Switch>
        </Suspense>
      </div>

      {/* Footer - Hide on admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  const [loaderDone, setLoaderDone] = useState(false);
  const isAdminPath = window.location.pathname.startsWith('/admin');

  return (
    <>
      {/* Pac-Man loader – rendered above everything, removed from DOM once complete; hidden on admin routes */}
      {!loaderDone && !isAdminPath && (
        <PacManLoader onComplete={() => setLoaderDone(true)} />
      )}

      <Router>
        <AppContent />
      </Router>
    </>
  );
};

export default App;
