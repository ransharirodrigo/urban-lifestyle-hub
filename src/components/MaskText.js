"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../lib/utils";

export function MaskText({
    children,
    className,
    delay = 0,
    duration = 0.75,
    once = false,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5, once });

    const body = (
        <div ref={ref} className={cn("overflow-hidden inline-flex", className)}>
            <motion.div
                variants={{
                    hidden: { y: "100%" },
                    visible: { y: "0%" },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{
                    duration,
                    ease: [0.33, 1, 0.68, 1], // Cubic bezier for smooth "chic" feel
                    delay,
                }}
                className="inline-block"
            >
                {children}
            </motion.div>
        </div>
    );

    return body;
}

export function MaskTextLines({
    children,
    className,
    delay = 0,
    duration = 0.75,
    once = false,
}) {
    // This component would ideally split text into lines, but for simplicity
    // we can assume children is an array of strings or using <br/>. 
    // For now, let's keep it simple: it wraps the whole block in a mask.
    // A better approach for paragraphs is word-by-word or line-by-line.
    // Let's implement a simple phrase splitter.

    const phrases = typeof children === 'string' ? [children] : React.Children.toArray(children);

    return (
        <div className={className}>
            {phrases.map((phrase, index) => (
                <MaskText key={index} delay={delay + (index * 0.1)} duration={duration} once={once}>
                    {phrase}
                </MaskText>
            ))}
        </div>
    )
}
