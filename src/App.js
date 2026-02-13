import './App.css';
import { Skiper39 } from './components/CrowdCanvas';
import MorphingNavigation from './components/MorphingNavigation';
import IntroSection from './components/IntroSection';
import AboutSection from './components/AboutSection';

function App() {
  const navLinks = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "services", label: "Services", href: "#services" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <div className="App relative w-full min-h-screen bg-white overflow-x-hidden scroll-smooth">
      <MorphingNavigation
        links={navLinks}
        theme="glass"
      />

      {/* Hero Section */}
      <div id="home" className="relative w-full h-screen">
        <Skiper39 />
      </div>

      {/* Intro Section */}
      <div className="relative w-full bg-white z-20">
        <IntroSection />
      </div>

      {/* About Section */}
      <div id="about" className="relative w-full bg-gray-50 z-20">
        <AboutSection />
      </div>
    </div>
  );
}

export default App;
