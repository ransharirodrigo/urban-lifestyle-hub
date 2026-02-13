"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

const IntroSection = () => {
    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-8 bg-white text-black overflow-hidden z-20">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Title */}
                <ScrollReveal
                    size="2xl"
                    align="center"
                    containerClassName="mb-12"
                    textClassName="font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                >
                    Your Gateway to Modern Living
                </ScrollReveal>

                {/* Content Paragraph 1 */}
                <ScrollReveal
                    size="xl"
                    align="center"
                    baseOpacity={0.2}
                    staggerDelay={0.03}
                    textClassName="text-gray-800 font-medium leading-relaxed"
                >
                    Urban Hub is a creative lifestyle platform that blends technology, design, and culture into one seamless digital experience.
                </ScrollReveal>

                {/* Content Paragraph 2 */}
                <ScrollReveal
                    size="lg"
                    align="center"
                    baseOpacity={0.2}
                    staggerDelay={0.03}
                    textClassName="text-gray-600 font-normal mt-8"
                >
                    We believe in crafting environments — both physical and digital — that inspire movement, creativity, and connection.
                </ScrollReveal>

                {/* Content Paragraph 3 */}
                <ScrollReveal
                    size="lg"
                    align="center"
                    baseOpacity={0.2}
                    staggerDelay={0.03}
                    textClassName="text-gray-600 font-normal mt-4"
                >
                    Whether you're exploring innovative ideas or looking for inspiration, Urban Hub is where modern energy meets bold imagination.
                </ScrollReveal>

            </div>
        </section>
    );
};

export default IntroSection;
