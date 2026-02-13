"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { cn } from "../lib/utils";

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}) => {
  const isSpace = char === " ";

  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={cn("inline-block text-gray-900", isSpace && "w-4")}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};

const ScrollTextAnimation = ({ text, isVisible }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  if (!isVisible) return null;

  return (
    <div
      ref={targetRef}
      className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-white p-[2vw]"
    >
      <div
        className="w-full max-w-4xl text-center text-6xl md:text-8xl font-bold uppercase tracking-tighter text-gray-900"
        style={{
          perspective: "500px",
        }}
      >
        {characters.map((char, index) => (
          <CharacterV1
            key={index}
            char={char}
            index={index}
            centerIndex={centerIndex}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

export { ScrollTextAnimation };
