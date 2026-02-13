import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef();

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out"
    });
  }, []);

  return (
    <section ref={heroRef} className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to Urban Hub</h1>
      <button className="px-6 py-3 bg-white text-purple-500 rounded-lg hover:scale-105 transition-transform">
        Explore More
      </button>
    </section>
  );
}
