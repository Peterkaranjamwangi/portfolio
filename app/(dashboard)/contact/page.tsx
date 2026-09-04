'use client';
import React from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { Mail, Phone, MapPin } from 'lucide-react';
import { resumeData, CONNECT_DATA } from '@/constants/constants';
import { ContactForm } from '@/components/contact/contact-form';

export default function ContactPage() {
  return (
    <DashboardPage title="Contact" subtitle="Mission Briefing">
      <div className="h-full overflow-y-auto custom-scrollbar px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
              <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-3">
                <Mail className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <a
                href={`mailto:${resumeData.summary.email}`}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {resumeData.summary.email}
              </a>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
              <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-3">
                <Phone className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-1">Phone</h3>
              <a
                href={`tel:${resumeData.summary.phone}`}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {resumeData.summary.phone}
              </a>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
              <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-3">
                <MapPin className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-1">Location</h3>
              <p className="text-sm text-gray-400">{resumeData.summary.address}</p>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">{'>'}</span> Connect With Me
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CONNECT_DATA.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.info}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-black/40 border border-cyan-500/20 rounded-lg p-3 hover:border-cyan-500/50 transition-all"
                  >
                    <Icon className="text-cyan-400" size={20} />
                    <span className="text-white text-sm font-medium">
                      {social.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">{'>'}</span> Send Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </DashboardPage>
  );
}
