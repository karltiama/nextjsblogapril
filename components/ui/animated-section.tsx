"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const directionVariants = {
  up: { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  down: { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 } },
  left: { initial: { x: 20, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  right: { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 } },
};

export function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up" 
}: AnimatedSectionProps) {
  const variants = directionVariants[direction];
  
  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
