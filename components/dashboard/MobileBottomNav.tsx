'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Briefcase, Code, User, Mail } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
  { id: 'projects', label: 'Projects', icon: Briefcase, href: '/dashboard/projects' },
  { id: 'skills', label: 'Skills', icon: Code, href: '/dashboard/skills' },
  { id: 'about', label: 'About', icon: User, href: '/dashboard/about' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '/dashboard/contact' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black/95 backdrop-blur-lg border-t border-cyan-500/30 z-50">
      <div className="flex justify-around items-center h-full px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <motion.button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              className="relative flex flex-col items-center gap-1 px-3 py-2"
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow effect for active tab */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute inset-0 bg-cyan-500/10 rounded-lg"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon */}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={`
                  relative z-10 transition-all
                  ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-gray-400'}
                `}
              />

              {/* Label */}
              <span
                className={`
                  text-[10px] font-medium relative z-10 transition-all
                  ${isActive ? 'text-cyan-400' : 'text-gray-400'}
                `}
              >
                {tab.label}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 w-1 h-1 bg-cyan-400 rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
