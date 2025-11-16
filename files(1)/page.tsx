'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { Code, Zap, Award } from 'lucide-react';

export default function DashboardHome() {
  return (
    <DashboardPage>
      <div className="h-full flex flex-col justify-center items-center space-y-8">
        {/* Main hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Peter Mwangi
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Full-Stack Developer
          </p>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-cyan-500 to-purple-600 rounded" />
        </motion.div>

        {/* Terminal-style animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-black/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 w-full max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="font-mono text-sm space-y-2">
            <p className="text-green-400">&gt; const developer = &#123;</p>
            <p className="text-gray-300 ml-4">name: "Peter Mwangi",</p>
            <p className="text-gray-300 ml-4">role: "Full-Stack Developer",</p>
            <p className="text-gray-300 ml-4">stack: ["React", "Next.js", "TypeScript"],</p>
            <p className="text-gray-300 ml-4">passion: "Building digital experiences"</p>
            <p className="text-green-400">&#125;;</p>
            <p className="text-cyan-400 mt-2">&gt; <span className="animate-pulse">_</span></p>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-4 w-full max-w-2xl"
        >
          {[
            { icon: Code, label: '5+ Years', sublabel: 'Experience' },
            { icon: Zap, label: '20+ Projects', sublabel: 'Completed' },
            { icon: Award, label: 'Tech Stack', sublabel: 'Modern' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 text-center hover:border-cyan-500/50 transition-all"
            >
              <stat.icon className="mx-auto mb-2 text-cyan-400" size={24} />
              <p className="text-lg font-bold text-white">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.sublabel}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </DashboardPage>
  );
}
