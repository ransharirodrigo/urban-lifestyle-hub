"use client";

import React from "react";
import ScrollCarousel from "./ScrollCarousel";
import { Cpu, Palette, Globe, Layers, Zap, Heart } from "lucide-react";

// Feature data for the carousel
const features = [
    {
        icon: Cpu,
        title: "Technology",
        description: "Seamless digital experiences that empower your lifestyle.",
        image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        icon: Palette,
        title: "Design",
        description: "Purposeful aesthetics that inspire and captivate.",
        image: "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        icon: Globe,
        title: "Culture",
        description: "Connecting global communities through shared passions.",
        image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        icon: Layers,
        title: "Innovation",
        description: "Breaking boundaries with forward-thinking solutions.",
        image: "https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        icon: Zap,
        title: "Energy",
        description: "Fueling creativity with dynamic and bold ideas.",
        image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        icon: Heart,
        title: "Connection",
        description: "Building meaningful relationships that last.",
        image: "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
];

const IntroSection = () => {
    return (
        <div className="relative w-full bg-white z-20">
            <div className="py-20 text-center">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                    Explore Our World
                </h2>
                <p className="max-w-2xl mx-auto text-xl text-gray-600">
                    Swipe through the pilars of our community.
                </p>
            </div>

            <ScrollCarousel
                features={features}
                className="w-full"
            />
        </div>
    );
};

export default IntroSection;
