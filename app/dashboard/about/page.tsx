'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import Image from 'next/image';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { resumeData, interestsData } from '@/constants/constants';

export default function AboutPage() {
  return (
    <DashboardPage title="About" subtitle="Player Profile">
      <div className="h-full overflow-y-auto custom-scrollbar px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Profile section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Profile image */}
            <div className="md:col-span-1">
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-cyan-500/30">
                <Image
                  src="/peter.png"
                  alt={resumeData.summary.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>

            {/* Profile info */}
            <div className="md:col-span-2 space-y-4">
              <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  UI/UX Designer | Full-Stack Developer | Graphic Designer
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {resumeData.summary.description}
                </p>

                {/* Contact info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin size={18} className="text-cyan-400" />
                    <span>{resumeData.summary.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone size={18} className="text-cyan-400" />
                    <span>{resumeData.summary.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail size={18} className="text-cyan-400" />
                    <span>{resumeData.summary.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-cyan-400" />
                    <a
                      href="http://petermwangi.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interests section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">{'>'}</span> Interests & Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {interestsData.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <motion.div
                    key={interest.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="bg-black/40 border border-cyan-500/20 rounded-lg p-3 hover:border-cyan-500/50 transition-all"
                  >
                    <Icon className="text-cyan-400 mb-2" size={20} />
                    <p className="text-xs text-gray-300">{interest.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Experience section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">{'>'}</span> Experience
            </h3>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border-l-2 border-cyan-500/30 pl-4 pb-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-cyan-400">
                      {exp.title}
                    </h4>
                    <span className="text-sm text-gray-400">{exp.date}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{exp.company}</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    {exp.responsibilities.slice(0, 3).map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">{'>'}</span> Additional Strengths
            </h3>
            <ul className="space-y-2">
              {resumeData.additionalInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </DashboardPage>
  );
}
