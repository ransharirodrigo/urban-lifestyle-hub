"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { ScrollTextAnimation } from "./ScrollTextAnimation";

const ServicesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        amount: 0.3, 
        once: true 
    });

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col items-center justify-center p-8 bg-white text-gray-900 overflow-hidden z-20">
            <div className="relative max-w-6xl mx-auto space-y-24 text-center z-10">
                {/* Scroll Animation - appears when section is in view */}
                {isInView && (
                    <ScrollTextAnimation 
                        text="What We Do" 
                        isVisible={isInView}
                    />
                )}

                {/* Services content can be added here */}
                <div className="space-y-12">
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our services are designed to elevate your urban lifestyle experience.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
