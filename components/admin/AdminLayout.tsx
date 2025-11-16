'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  Code,
  Wrench,
  BookOpen,
  Cpu,
  Menu,
  X,
  LogOut,
  Settings,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'projects', label: 'Projects', icon: Briefcase, href: '/admin/dashboard/projects' },
  { id: 'skills', label: 'Skills', icon: Code, href: '/admin/dashboard/skills' },
  { id: 'services', label: 'Services', icon: Wrench, href: '/admin/dashboard/services' },
  { id: 'technologies', label: 'Technologies', icon: Cpu, href: '/admin/dashboard/technologies' },
  { id: 'blog', label: 'Blog Posts', icon: BookOpen, href: '/admin/dashboard/blog' },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 lg:translate-x-0"
          >
            {/* Logo */}
            <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Panel
              </h1>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${
                        isActive
                          ? 'bg-cyan-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all mb-2"
              >
                <Settings size={20} />
                <span className="font-medium">View Site</span>
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
