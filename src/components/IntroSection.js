"use client";

import React from "react";
import { Skiper30 } from "./Skiper30";

const IntroSection = () => {
    return (
        <div className="relative w-full bg-white z-20">
            <div className="py-20 text-center">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                    Explore Our World
                </h2>
                <p className="max-w-2xl mx-auto text-xl text-gray-600">
                    Swipe through the pillars of our community.
                </p>
            </div>

            <Skiper30 />
        </div>
    );
};

export default IntroSection;
