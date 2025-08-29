"use client";

import { motion, Variants } from "framer-motion";
import { Badge } from "./badge";

interface AnimatedTechStackProps {
  techs: string[];
  className?: string;
}

export function AnimatedTechStack({ techs, className = "" }: AnimatedTechStackProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-wrap gap-2 justify-center max-w-md ${className}`}
    >
      {techs.map((tech, index) => (
        <motion.div key={tech} variants={itemVariants}>
          <Badge variant="secondary" className="text-sm hover:scale-105 transition-transform duration-200">
            {tech}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
}
