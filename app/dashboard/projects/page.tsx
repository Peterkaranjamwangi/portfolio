'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/constants/constants';

export default function ProjectsPage() {
  return (
    <DashboardPage title="Projects" subtitle="Mission Control">
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-y-auto custom-scrollbar px-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all h-fit"
          >
            {/* Project image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

              {/* Status badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  project.status === 'completed'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {project.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>
            </div>

            {/* Project info */}
            <div className="p-4 space-y-3">
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {project.shortDescription}
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-2 pt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 text-sm rounded transition-all"
                >
                  <ExternalLink size={16} />
                  View
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-white text-sm rounded transition-all"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5" />
            </div>
          </motion.div>
        ))}
      </div>
    </DashboardPage>
  );
}
