"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const HoverEffect = ({ children }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group block p-2 h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-lg"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};
