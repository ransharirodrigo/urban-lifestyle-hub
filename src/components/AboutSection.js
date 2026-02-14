"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";
import { MaskText } from "./MaskText";
import GravityStarsBackground from "./GravityStarsBackground";

const AboutSection = () => {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-900 overflow-hidden z-20">
            <GravityStarsBackground className="absolute inset-0 z-0" starCount={120} starSize={1.5} />

            <div className="relative max-w-4xl mx-auto space-y-24 text-center z-10">

                {/* Title - Masked Reveal */}
                <div className="flex justify-center mt-16">
                    <MaskText
                        className="text-6xl md:text-8xl font-extrabold tracking-tighter text-gray-900 leading-none"
                        duration={0.9}
                    >
                        Who We Are
                    </MaskText>
                </div>

                <div className="space-y-12">
                    {/* Content Paragraph 1 - Sharp Slide Up */}
                    <ScrollReveal
                        size="2xl"
                        align="center"
                        baseOpacity={0}
                        enableBlur={false}
                        staggerDelay={0.015}
                        textClassName="font-medium leading-tight text-gray-800"
                        containerClassName="max-w-3xl mx-auto"
                    >
                        Urban Hub was founded with a vision to transform how people experience creativity in the modern world.
                    </ScrollReveal>

                    {/* Content Paragraph 2 */}
                    <ScrollReveal
                        size="xl"
                        align="center"
                        baseOpacity={0}
                        enableBlur={false}
                        staggerDelay={0.015}
                        textClassName="font-normal text-gray-600 leading-relaxed"
                        containerClassName="max-w-3xl mx-auto"
                    >
                        We are a collective of designers, developers, and innovators who believe in purposeful design and meaningful impact.
                    </ScrollReveal>

                    {/* Content Paragraph 3 */}
                    <ScrollReveal
                        size="xl"
                        align="center"
                        baseOpacity={0}
                        enableBlur={false}
                        staggerDelay={0.015}
                        textClassName="font-normal text-gray-600"
                        containerClassName="max-w-3xl mx-auto"
                    >
                        Our mission is simple — create experiences that feel alive, intuitive, and unforgettable.
                    </ScrollReveal>
                </div>

                {/* Button */}
                <div className="pt-8">
                    <button className="px-10 py-5 bg-gray-900 text-white font-bold text-lg rounded-full hover:bg-black transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-black/20">
                        Learn More About Us
                    </button>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
