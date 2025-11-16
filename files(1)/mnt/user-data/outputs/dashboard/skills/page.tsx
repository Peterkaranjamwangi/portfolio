'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { Code, Palette, Users } from 'lucide-react';

const categories = [
  { id: 'frontend', label: 'Frontend', icon: Code },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'soft', label: 'Soft Skills', icon: Users },
];

const skills = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
  ],
  design: [
    { name: 'Figma', level: 85 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Graphic Design', level: 75 },
    { name: 'Responsive Design', level: 90 },
  ],
  soft: [
    { name: 'Problem Solving', level: 90 },
    { name: 'Communication', level: 85 },
    { name: 'Time Management', level: 80 },
    { name: 'Collaboration', level: 88 },
  ],
};

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  return (
    <DashboardPage title="Skills" subtitle="Tech Arsenal">
      <div className="h-full flex flex-col">
        {/* Category selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${
                    isActive
                      ? 'bg-cyan-500/20 border-2 border-cyan-500/50 text-cyan-400'
                      : 'bg-black/40 border-2 border-gray-700 text-gray-400 hover:border-gray-600'
                  }
                `}
              >
                <Icon size={18} />
                <span className="font-medium">{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Skills display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar"
        >
          {skills[activeCategory as keyof typeof skills].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all"
            >
              {/* Skill name and percentage */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold">{skill.name}</h3>
                <span className="text-cyan-400 text-sm font-bold">
                  {skill.level}%
                </span>
              </div>

              {/* Animated progress bar */}
              <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 blur-sm" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardPage>
  );
}
