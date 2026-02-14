"use client";

import React from "react";
import { ShinyText } from "./ShinyText";
import CyclingText from "./CyclingText";

const ContactSection = () => {
  return (
    <section id="contact" className="relative w-full bg-gray-50">
      {/* Let's Build Something Together Heading */}
      <div className="relative w-full h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <ShinyText
            className="text-6xl md:text-8xl font-bold"
            size="4xl"
            weight="bold"
            speed={3}
            direction="left-to-right"
            shineColor="#ff5800"
            baseColor="#1a1a1a"
            intensity={1}
            repeat="infinite"
          >
            Let's Build Something Together
          </ShinyText>
          <div className="mt-8">
            <CyclingText />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
