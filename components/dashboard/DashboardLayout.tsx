'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from './DashboardSidebar';
import MobileBottomNav from './MobileBottomNav';
import GridBackground from './GridBackground';
import ScanLine from './ScanLine';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0a0e27] relative">
      {/* Animated grid background */}
      <GridBackground />
      
      {/* Scan line effect */}
      <ScanLine />
      
      {/* Desktop sidebar */}
      {!isMobile && <DashboardSidebar />}
      
      {/* Main content area */}
      <main
        className={`
          h-full overflow-hidden relative z-10
          ${!isMobile ? 'ml-64' : 'mb-16'}
        `}
      >
        <div className="h-full overflow-hidden">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile bottom navigation */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
}
