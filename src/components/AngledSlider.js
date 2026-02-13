"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "../lib/utils";

const SPRING = {
  mass: 0.1, // avoid Controls inertia (how sluggish or responsive the object feels). Lower mass = snappier motion; higher mass = lethargic motion
  damping: 10, // its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
  stiffness: 131, // like rubber Band the more you strech the more speed it goes back to the original position
};

const cardVariants = {
    offHover: (angle) => ({
        rotateY: angle,
        z: 60, // Ensure card is in front of container plane (which blocks -Z events)
        opacity: 0.9,
        scale: 1,
        zIndex: 30, // Higher than potential overlays
        transition: {
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50
        }
    }),
    onHover: (hoverScale) => ({
        rotateY: 0,
        z: 120, // Pop out further
        opacity: 1,
        scale: hoverScale,
        zIndex: 50,
        transition: {
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50
        }
    })
};

const AngledCard = ({
    item,
    angle,
    hoverScale,
    cardWidth
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative flex-shrink-0 group overflow-visible cursor-pointer"
            style={{
                width: cardWidth,
                height: "100%",
                transformStyle: "preserve-3d",
            }}
            custom={isHovered ? hoverScale : angle}
            variants={cardVariants}
            initial="offHover"
            animate={isHovered ? "onHover" : "offHover"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The Service Card */}
            <div className="relative h-full w-full overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-2xl min-h-[300px]">
                <div className="relative h-full w-full p-8 flex flex-col justify-center space-y-4">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <item.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white">
                        {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                        {item.description}
                    </p>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl pointer-events-none" />
            </div>
        </motion.div>
    );
};

export const AngledSlider = ({
    items,
    speed = 40,
    direction = "left",
    containerHeight = "400px",
    cardWidth = "300px",
    gap = "40px",
    angle = 20,
    hoverScale = 1.05,
    className,
}) => {
    const [width, setWidth] = useState(0);
    const containerRef = useRef(null);

    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse follow spring values
    const mouseX = useSpring(0, SPRING);
    const mouseY = useSpring(0, SPRING);
    const mouseOpacity = useSpring(0, SPRING);
    const mouseScale = useSpring(0, SPRING);

    // Mouse follow handlers
    const handlePointerMove = (e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - bounds.left);
        mouseY.set(e.clientY - bounds.top);
    };

    const handlePointerEnter = () => {
        mouseOpacity.set(1);
        mouseScale.set(1);
    };

    const handlePointerLeave = () => {
        mouseOpacity.set(0);
        mouseScale.set(0);
    };

    // Duplicate items for infinite loop effect
    // We need enough duplicates to fill the screen + buffer
    const duplicatedItems = [...items, ...items, ...items];

    useEffect(() => {
        const calculateWidth = () => {
            // Fallback to prop-based calculation if ref is not quite ready or layout is shifting
            // This is generally safer for known fixed-width items
            const numWidth = parseInt(cardWidth?.toString().replace("px", "") || "300");
            const numGap = parseInt(gap?.toString().replace("px", "") || "40");

            if (!isNaN(numWidth) && !isNaN(numGap)) {
                const calculatedWidth = (numWidth + numGap) * items.length;
                setWidth(calculatedWidth);
            } else if (containerRef.current) {
                const scrollWidth = containerRef.current.scrollWidth;
                setWidth(scrollWidth / 3);
            }
        };

        calculateWidth();
        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, [items, cardWidth, gap]);

    useEffect(() => {
        if (width <= 0) return;

        const startX = direction === "left" ? 0 : -width;
        const endX = direction === "left" ? -width : 0;

        if (isHovered) return;

        const runAnimation = () => {
            const currentX = x.get();
            const totalDist = width;
            const dist = Math.abs(endX - currentX);
            const duration = speed * (dist / totalDist);

            const controls = animate(x, endX, {
                duration: duration,
                ease: "linear",
                onComplete: () => {
                    x.set(startX);
                    runAnimation();
                }
            });
            return controls;
        };

        const animation = runAnimation();

        return () => {
            animation.stop();
        };
    }, [width, speed, direction, isHovered, x]);

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden bg-background py-10",
                className
            )}
            style={{
                height: containerHeight,
                perspective: "1000px", // Essential for 3D effect
            }}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Mouse follow element */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    opacity: mouseOpacity,
                    scale: mouseScale,
                }}
                className="pointer-events-none fixed z-50 rounded-full w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
            />

            <motion.div
                ref={containerRef}
                className="flex items-center"
                style={{ x, gap, transformStyle: "preserve-3d" }}
            >
                {duplicatedItems.map((item, index) => (
                    <AngledCard
                        key={`${item.id}-${index}`}
                        item={item}
                        angle={angle}
                        hoverScale={hoverScale}
                        cardWidth={cardWidth}
                    />
                ))}
            </motion.div>
        </div>
    );
};
