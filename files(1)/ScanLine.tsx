'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 pointer-events-none z-50"
      animate={{
        top: ['0%', '100%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
      }}
    />
  );
}
