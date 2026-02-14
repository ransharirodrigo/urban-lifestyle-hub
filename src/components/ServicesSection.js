"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { ScrollTextAnimation } from "./ScrollTextAnimation";
import { AngledSlider } from "./AngledSlider";
import { Palette, Code, Target, ArrowRight } from "lucide-react";

const ServicesSection = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        amount: 0.2, 
        once: true 
    });
    
    const isSliderInView = useInView(sliderRef, {
        amount: 0.1,
        once: true
    });

    // Service data with icons
    const services = [
        {
            id: 1,
            title: "Creative Design",
            description: "We craft visually compelling designs that communicate powerful messages and leave lasting impressions.",
            icon: Palette
        },
        {
            id: 2,
            title: "Web & App Development",
            description: "Modern, responsive, and performance-driven digital solutions built with cutting-edge technologies.",
            icon: Code
        },
        {
            id: 3,
            title: "Brand Strategy",
            description: "We help brands discover their voice and express it through authentic and innovative storytelling.",
            icon: Target
        }
    ];

    return (
        <section ref={sectionRef} className="relative w-full bg-white overflow-hidden z-20">
            {/* First part: What We Do heading animation */}
            <div className="relative w-full h-[210vh]">
                {isInView && (
                    <ScrollTextAnimation 
                        text="What We Do" 
                        isVisible={isInView}
                    />
                )}
            </div>

            {/* Second part: Angled slider - always rendered for visibility */}
            <div 
                ref={sliderRef}
                className="relative w-full bg-gray-50 py-20"
                style={{
                    opacity: isSliderInView ? 1 : 0.3,
                    transform: isSliderInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                }}
            >
                <AngledSlider 
                    items={services}
                    speed={30}
                    direction="left"
                    containerHeight="400px"
                    cardWidth="350px"
                    gap="40px"
                    angle={25}
                    hoverScale={1.08}
                    className="w-full"
                />
                
                {/* View Our Work Button */}
                <div className="relative z-10 flex justify-center py-20">
                    <button className="group relative inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-black hover:scale-105 hover:shadow-xl">
                        View Our Work
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
