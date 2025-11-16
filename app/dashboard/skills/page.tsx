'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { TechnicalskillsData, SoftskillsData, stackData } from '@/constants/constants';

const categories = [
  { id: 'technical', label: 'Technical Skills' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'soft', label: 'Soft Skills' },
];

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('technical');

  return (
    <DashboardPage title="Skills" subtitle="Tech Arsenal">
      <div className="h-full flex flex-col px-4">
        {/* Category selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((category) => {
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
                <span className="font-medium">{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Technical Skills */}
        {activeCategory === 'technical' && (
          <motion.div
            key="technical"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar"
          >
            {TechnicalskillsData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all h-fit"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <Icon className="text-cyan-400" size={24} />
                    </div>
                    <h3 className="text-white font-semibold">{skill.label}</h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Tech Stack */}
        {activeCategory === 'stack' && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar"
          >
            {stackData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all"
                >
                  {/* Skill name and percentage */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Icon className="text-cyan-400" size={20} />
                      </div>
                      <h3 className="text-white font-semibold">{skill.label}</h3>
                    </div>
                    <span className="text-cyan-400 text-sm font-bold">
                      {skill.value}%
                    </span>
                  </div>

                  {/* Animated progress bar */}
                  <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.value}%` }}
                      transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 blur-sm" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Soft Skills */}
        {activeCategory === 'soft' && (
          <motion.div
            key="soft"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar"
          >
            {SoftskillsData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all h-fit"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Icon className="text-purple-400" size={24} />
                    </div>
                    <h3 className="text-white font-semibold">{skill.label}</h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </DashboardPage>
  );
}
