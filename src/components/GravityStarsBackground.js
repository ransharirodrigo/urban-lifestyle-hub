"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

export const GravityStarsBackground = ({
    className,
    starCount = 100,
    starSize = 2,
    starColor = "rgba(0, 0, 0, 0.8)", // Default to dark stars for light background
    gravityStrength = 0.5, // Increased default gravity for better feel
    friction = 0.99, // Lower friction for gravity effect
    children,
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    // Store stars and mouse ref to avoid re-renders
    const state = useRef({
        stars: [],
        mouse: { x: -9999, y: -9999 },
        animationFrameId: null,
    });

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                setSize({ width: offsetWidth, height: offsetHeight });
                // Reset stars on resize
                initStars(offsetWidth, offsetHeight);
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, [starCount]);

    const initStars = (width, height) => {
        const stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1.5, // Increased initial velocity
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * starSize + 0.5,
                mass: Math.random() * 3 + 1,
            });
        }
        state.current.stars = stars;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle mouse movement on window to catch all movements
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            state.current.mouse.x = e.clientX - rect.left;
            state.current.mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            state.current.mouse.x = -9999;
            state.current.mouse.y = -9999;
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave); // document body for leave

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            state.current.stars.forEach((star) => {
                // Calculate distance to mouse
                const dx = state.current.mouse.x - star.x;
                const dy = state.current.mouse.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Gravity effect towards mouse
                if (distance < 400 && distance > 10) {
                    const force = (gravityStrength * star.mass) / distance; // Stronger when closer
                    star.vx += force * dx * 0.01; // Scale down force
                    star.vy += force * dy * 0.01;
                }

                // Normal movement
                star.x += star.vx;
                star.y += star.vy;

                // VERY subtle friction to stabilize excessive speed from gravity, but allow movement
                // Only apply friction if velocity is high
                if (Math.abs(star.vx) > 2 || Math.abs(star.vy) > 2) {
                    star.vx *= 0.95;
                    star.vy *= 0.95;
                }

                // Boundary wrap
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = starColor;
                ctx.fill();
            });

            state.current.animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (state.current.animationFrameId) {
                cancelAnimationFrame(state.current.animationFrameId);
            }
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [size, gravityStrength, friction, starColor]);

    return (
        <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                width={size.width}
                height={size.height}
                className="absolute inset-0 pointer-events-none"
            />
            <div className="relative z-10 w-full h-full pointer-events-none"> {/* Ensure children don't block mouse if passed directly */}
                {React.Children.map(children, child =>
                    // Clone element to ensure it has pointer-events-auto if needed, or rely on child classes
                    React.cloneElement(child, { className: cn(child.props.className, "pointer-events-auto") })
                )}
                {/* If children are not passed, this div is empty. 
                   In AboutSection, children are NOT passed to this component directly (it's self-closing). 
                   The issue was sibling blockage. Window listener solves that.
                */}
            </div>
        </div>
    );
};

export default GravityStarsBackground;
