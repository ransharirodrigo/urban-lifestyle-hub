import './App.css';
import { Skiper39 } from './components/CrowdCanvas';
import MorphingNavigation from './components/MorphingNavigation';
import IntroSection from './components/IntroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function App() {
  const navLinks = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "services", label: "Services", href: "#services" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App relative w-full min-h-screen bg-white overflow-x-hidden">
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

      {/* Services Section */}
      <div id="services" className="relative w-full bg-white z-20">
        <ServicesSection />
      </div>
    </div>
  );
}

export default App;
