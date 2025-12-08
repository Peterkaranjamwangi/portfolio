'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Briefcase, Code, User, Mail, Terminal, BookOpen, Wrench } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
  { id: 'projects', label: 'Projects', icon: Briefcase, href: '/dashboard/projects' },
  { id: 'skills', label: 'Skills', icon: Code, href: '/dashboard/skills' },
  { id: 'services', label: 'Services', icon: Wrench, href: '/dashboard/services' },
  { id: 'blog', label: 'Blog', icon: BookOpen, href: '/dashboard/blog' },
  { id: 'about', label: 'About', icon: User, href: '/dashboard/about' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '/dashboard/contact' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black/40 backdrop-blur-md border-r border-cyan-500/30 z-50">
      {/* Logo/Header */}
      <div className="h-20 flex items-center justify-center border-b border-cyan-500/30 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <Terminal className="text-cyan-400 mb-2" size={32} />
          <div className="absolute inset-0 blur-xl bg-cyan-500/20" />
        </motion.div>
        <div className="ml-3 relative z-10">
          <h1 className="text-xl font-bold text-white tracking-wider">DEV</h1>
          <p className="text-xs text-cyan-400 tracking-widest">PORTFOLIO</p>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.href)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-lg
                transition-all duration-300 group relative overflow-hidden
                ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-white/5'
                }
              `}
            >
              {/* Glow effect on hover */}
              <div
                className={`
                  absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                  bg-gradient-to-r from-cyan-500/10 to-transparent
                  ${isActive ? 'opacity-100' : ''}
                `}
              />

              {/* Icon */}
              <div className="relative z-10">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : ''}
                />
              </div>

              {/* Label */}
              <span className="font-medium text-sm tracking-wide relative z-10">
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Keyboard shortcut hint */}
              <span className="ml-auto text-xs text-gray-600 relative z-10">
                {index + 1}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* Status indicator at bottom */}
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full blur-sm" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Status</p>
              <p className="text-sm font-semibold text-green-400">Available</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
