"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

const useLoop = (delay = 1000) => {
  const [key, setKey] = useState(0);

  const incrementKey = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(incrementKey, delay);
    return () => clearInterval(interval);
  }, [delay, incrementKey]);

  return { key };
};

const CyclingText = () => {
  const { key } = useLoop();

  const array = useMemo(
    () => [
      "Have an idea, project, or collaboration in mind?",
      "We'd love to hear from you.",
      "Let's transform your vision into a modern digital experience",
      "That stands out and inspires.",
    ],
    [],
  );

  const currentItem = useMemo(() => {
    return array[key % array.length];
  }, [array, key]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.p
        key={key}
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 0.3 }}
        className="text-xl text-gray-600 max-w-3xl mx-auto whitespace-nowrap text-center"
      >
        {currentItem}
      </motion.p>
    </AnimatePresence>
  );
};

export default CyclingText;
