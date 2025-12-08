'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface DashboardPageProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const pageVariants = {
  initial: { opacity: 0, x: 100, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 0.95 },
};

export default function DashboardPage({ children, title, subtitle }: DashboardPageProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full flex flex-col"
    >
      {/* Header section - fixed height */}
      {(title || subtitle) && (
        <header className="shrink-0 px-4 md:px-8 pt-6 md:pt-8 pb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title && (
              <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-400 text-sm md:text-base">{subtitle}</p>
            )}
          </motion.div>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-px bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-transparent mt-4"
          />
        </header>
      )}

      {/* Content section - takes remaining space */}
      <div className="flex-1 overflow-hidden px-4 md:px-8 pb-4 md:pb-8">
        <div className="h-full overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
