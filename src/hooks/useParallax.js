"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export const useParallax = ({ offset = ["start end", "end start"] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return { ref, y, opacity };
};

export const ParallaxContainer = ({ children, className = "", speed = 0.5 }) => {
  const { ref, y, opacity } = useParallax();

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
};

export const ScrollReveal = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  className = "" 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Define transforms at component level
  const transformUp = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const transformDown = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const transformLeft = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const transformRight = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  const getTransform = () => {
    switch (direction) {
      case "up": return transformUp;
      case "down": return transformDown;
      case "left": return transformLeft;
      case "right": return transformRight;
      default: return transformUp;
    }
  };

  const transform = getTransform();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: direction === "up" ? 50 : direction === "down" ? -50 : 0 }}
        whileInView={{ opacity: 1, scale: 1, y: 0, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration, 
          delay, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
        style={{ transform, opacity, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StaggerReveal = ({ 
  children, 
  staggerDelay = 0.1, 
  direction = "up",
  className = "" 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  // Define transforms at component level
  const transformUp = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const transformDown = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const transformLeft = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const transformRight = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  const getTransform = () => {
    switch (direction) {
      case "up": return transformUp;
      case "down": return transformDown;
      case "left": return transformLeft;
      case "right": return transformRight;
      default: return transformUp;
    }
  };

  const transform = getTransform();

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: staggerDelay }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            variants={{
              hidden: { 
                opacity: 0, 
                y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
                x: direction === "left" ? 50 : direction === "right" ? -50 : 0
              },
              visible: { 
                opacity: 1, 
                y: 0, 
                x: 0,
                transition: { 
                  duration: 0.6, 
                  delay: index * staggerDelay,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
