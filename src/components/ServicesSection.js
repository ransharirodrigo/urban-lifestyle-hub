"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { ScrollTextAnimation } from "./ScrollTextAnimation";
import { AngledSlider } from "./AngledSlider";
import { Palette, Code, Target } from "lucide-react";

const ServicesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        amount: 0.3, 
        once: true 
    });
    
    const [showSlider, setShowSlider] = useState(false);
    const headingAnimationDuration = 3000; // 3 seconds for heading animation

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setShowSlider(true);
            }, headingAnimationDuration);

            return () => clearTimeout(timer);
        }
    }, [isInView]);

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

            {/* Second part: Angled slider that appears after heading animation */}
            {showSlider && (
                <div className="relative w-full bg-gray-50 py-20">
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
                </div>
            )}
        </section>
    );
};

export default ServicesSection;
