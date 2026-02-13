import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section({ title, description, image, reverse }) {
  const sectionRef = useRef();

  useEffect(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      x: reverse ? 100 : -100,
      duration: 1,
      ease: "power3.out"
    });
  }, [reverse]);

  return (
    <section ref={sectionRef} className={`flex flex-col md:flex-row items-center gap-6 p-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className="flex-1">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-4">{description}</p>
      </div>
      {image && <img src={image} alt={title} className="flex-1 rounded-lg shadow-md" />}
    </section>
  );
}
